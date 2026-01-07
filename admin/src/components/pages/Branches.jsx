import React, { useState } from "react";
import {
  useGetBranchQuery,
  useDeleteBranchMutation,
  useAddBranchMutation,
  useEditBranchMutation,
  useGetDistrictQuery,
} from "../../redux/features/branchSlice";
import Select from "../shared/Select";
import Modal from "../shared/DetailsModal";
import { toast } from "react-toastify";

const Branches = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [formData, setFormData] = useState({
    branch_name: "",
    district_id: "",
  });
  const [editId, setEditId] = useState(null);
  const [viewBranch, setViewBranch] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading } = useGetBranchQuery();
  const { data: districtData } = useGetDistrictQuery();
  const branches = data?.data || data?.result || [];
  const districts = districtData?.data || [];

  // Filter branches based on search term
  const filteredBranches = branches.filter(
    (branch) =>
      branch.branch_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.district_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [deleteBranch] = useDeleteBranchMutation();
  const [addBranch] = useAddBranchMutation();
  const [editBranch] = useEditBranchMutation();

  const handleAction = async (action, branch) => {
    if (action.target.value === "Edit") {
      handleEdit(branch);
    } else if (action.target.value === "View") {
      handleView(branch);
    } else if (action.target.value === "Delete") {
      try {
        const result = await deleteBranch(branch.branch_id).unwrap();
        toast.success(result.message || "Branch deleted successfully");
      } catch (err) {
        toast.error(err?.data?.message || "Failed to delete branch");
      }
    }
    action.target.value = "";
  };

  const actionOptions = [
    { value: "Edit", label: "Edit" },
    { value: "Delete", label: "Delete" },
    { value: "View", label: "View" },
  ];

  const handleAdd = () => {
    setIsAdding(true);
    setIsViewing(false);
    setFormData({ branch_name: "", district_id: "" });
    setIsModalOpen(true);
  };

  const handleEdit = (branch) => {
    setIsAdding(false);
    setIsViewing(false);
    setEditId(branch.branch_id);
    setFormData({
      branch_name: branch.branch_name,
      district_id: branch.district_id,
    });
    setIsModalOpen(true);
  };

  const handleView = (branch) => {
    setIsViewing(true);
    setViewBranch(branch);
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
      toast.error(
        isAdding ? "Failed to add branch" : "Failed to update branch",
        err
      );
    }
  };

  if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Branches</h1>
        <div className="flex gap-4 items-center">
          <input
            type="text"
            placeholder="Search branches or districts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border rounded-lg w-64"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Branch
          </button>
        </div>
      </div>

      <div className="w-full bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                S.N
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Branch ID
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Branch Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                District
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredBranches.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-3 text-center text-gray-500">
                  {searchTerm
                    ? "No branches found matching your search"
                    : "No branches found"}
                </td>
              </tr>
            ) : (
              filteredBranches.map((branch, index) => (
                <tr
                  key={branch.branch_id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {branch.branch_id}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {branch.branch_name}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {branch.district_name}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <Select
                      options={actionOptions}
                      placeholder="Action"
                      onChange={(e) => handleAction(e, branch)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          isViewing ? "Branch Details" : isAdding ? "Add Branch" : "Edit Branch"
        }
        size="lg"
      >
        {isViewing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Branch ID
                </label>
                <p className="text-gray-900">{viewBranch?.branch_id}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Branch Name
                </label>
                <p className="text-gray-900">{viewBranch?.branch_name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  District
                </label>
                <p className="text-gray-900">{viewBranch?.district_name}</p>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Branch Name"
              value={formData.branch_name}
              onChange={(e) =>
                setFormData({ ...formData, branch_name: e.target.value })
              }
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />

            <select
              value={formData.district_id}
              onChange={(e) =>
                setFormData({ ...formData, district_id: e.target.value })
              }
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district.district_id} value={district.district_id}>
                  {district.district_name}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                {isAdding ? "Add" : "Update"}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default Branches;
