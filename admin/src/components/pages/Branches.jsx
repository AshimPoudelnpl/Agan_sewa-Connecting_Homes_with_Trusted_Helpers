import React, { useState } from "react";
import {
  useGetBranchQuery,
  useDeleteBranchMutation,
  useAddBranchMutation,
  useEditBranchMutation,
  useGetDistrictQuery,
} from "../../redux/features/branchSlice";
import Select from "../shared/Select";
import { toast } from "react-toastify";

const Branches = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ branch_name: "", district_id: "" });
  const [editId, setEditId] = useState(null);

  const { data, isLoading } = useGetBranchQuery();
  const { data: districtData } = useGetDistrictQuery();
  const branches = data?.data || data?.result || [];
  const districts = districtData?.data || [];
  
  const [deleteBranch] = useDeleteBranchMutation();
  const [addBranch] = useAddBranchMutation();
  const [editBranch] = useEditBranchMutation();

  const handleAction = async (action, branch) => {
    if (action === "Edit") {
      handleEdit(branch);
    } else if (action === "Delete") {
      if (!window.confirm("Are you sure you want to delete this branch?")) return;
      try {
        const result = await deleteBranch(branch.branch_id).unwrap();
        toast.success(result.message || "Branch deleted successfully");
      } catch (err) {
        console.error("Delete error:", err);
        if (err?.data?.message?.includes("foreign key constraint") || err?.message?.includes("foreign key constraint")) {
          toast.error("Cannot delete branch: It has related data (gallery, managers, etc.). Please remove related data first.");
        } else {
          toast.error(err?.data?.message || "Failed to delete branch");
        }
      }
    }
  };

  const actionOptions = [
    { value: "Edit", label: "Edit" },
    { value: "Delete", label: "Delete" },
  ];

  const handleAdd = () => {
    setIsAdding(true);
    setFormData({ branch_name: "", district_id: "" });
    setIsModalOpen(true);
  };

  const handleEdit = (branch) => {
    setIsAdding(false);
    setEditId(branch.branch_id);
    setFormData({ branch_name: branch.branch_name, district_id: branch.district_id });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isAdding) {
        await addBranch(formData).unwrap();
        toast.success("Branch added successfully");
      } else {
        await editBranch({ id: editId, ...formData }).unwrap();
        toast.success("Branch updated successfully");
      }
      setIsModalOpen(false);
    } catch (err) {
      toast.error(isAdding ? "Failed to add branch" : "Failed to update branch",err);
    }
  };

  if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Branches</h1>
        <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Branch
        </button>
      </div>

      <div className="w-full bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">S.N</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Branch ID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Branch Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">District</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {branches.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-3 text-center text-gray-500">
                  No branches found
                </td>
              </tr>
            ) : (
              branches.map((branch, index) => (
                <tr key={branch.branch_id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-slate-600">{index + 1}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{branch.branch_id}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{branch.branch_name}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{branch.district_name}</td>
                  <td className="px-4 py-3 text-sm">
                    <Select
                      options={actionOptions}
                      placeholder="Action"
                      onChange={(e) => handleAction(e.target.value, branch)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded p-6 w-96">
            <h2 className="text-xl mb-4">
              {isAdding ? "Add Branch" : "Edit Branch"}
            </h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Branch Name"
                value={formData.branch_name}
                onChange={(e) => setFormData({...formData, branch_name: e.target.value})}
                className="w-full p-2 border rounded mb-3"
                required
              />

              <select
                value={formData.district_id}
                onChange={(e) => setFormData({...formData, district_id: e.target.value})}
                className="w-full p-2 border rounded mb-4"
                required
              >
                <option value="">Select District</option>
                {districts.map((district) => (
                  <option key={district.district_id} value={district.district_id}>
                    {district.district_name}
                  </option>
                ))}
              </select>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  {isAdding ? "Add" : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Branches;
