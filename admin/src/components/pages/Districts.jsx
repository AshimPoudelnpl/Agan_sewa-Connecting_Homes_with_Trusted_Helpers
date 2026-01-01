import { useState } from "react";
import {
  useGetDistrictQuery,
  useDeleteDistrictMutation,
  useGetProvinceQuery,
  useAddDistrictMutation,
} from "../../redux/features/branchSlice";
import Loading from "../shared/Loading";
import Select from "../shared/Select";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const initialData = {
  district_name: "",
  province_id: "",
};

const Districts = () => {
  const { role } = useSelector((state) => state.user);

  const { data, isLoading, error } = useGetDistrictQuery();
  const { data: provincesData } = useGetProvinceQuery();
  const [deleteDistrict] = useDeleteDistrictMutation();
  const [addDistrict] = useAddDistrictMutation();

  const districts = data?.data || [];
  const provinces = provincesData?.data || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState(initialData);

  const handleAction = async (action, district) => {
    if (action === "Delete") {
      try {
        await deleteDistrict(district.district_id).unwrap();
        toast.success(`${district.district_name} deleted successfully`);
      } catch (err) {
        toast.error("Failed to delete district",err);
      }
    }
  };

  const actionOptions = [
    { value: "Delete", label: "Delete" },
  ];

  const handleAdd = () => {
    setIsAdding(true);
    setFormData(initialData);
    setIsModalOpen(true);
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.district_name || !formData.province_id) {
      toast.warning("All fields are required");
      return;
    }

    try {
      if (isAdding) {
        const res = await addDistrict(formData).unwrap();
        toast.success(res.message || "District added successfully");
      } else {
        // For edit, we'll use the same add endpoint since there's no edit mutation
        toast.info("Edit functionality not available in backend");
      }
      setFormData(initialData);
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to save district");
    }
  };

  if (isLoading) return <Loading isLoading={isLoading} />;
  if (error)
    return <p className="p-4 text-red-600">Failed to load districts</p>;

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Districts</h1>
        {role === "admin" && (
          <button
            onClick={handleAdd}
            className="bg-amber-700 text-white px-4 py-2 rounded-full"
          >
            Add District
          </button>
        )}
      </div>

      {/* TABLE */}
      <div className="w-full bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">S.N</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">District ID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">District Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Province ID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Province</th>
              {role === "admin" && <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Action</th>}
            </tr>
          </thead>
          <tbody>
            {districts.length === 0 ? (
              <tr>
                <td colSpan={role === "admin" ? 6 : 5} className="px-4 py-3 text-center text-gray-500">
                  No districts found
                </td>
              </tr>
            ) : (
              districts.map((district, index) => (
                <tr key={district.district_id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-slate-600">{index + 1}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{district.district_id}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{district.district_name}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{district.province_id}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {district.province_name || provinces.find(p => p.province_id == district.province_id)?.province_name || 'N/A'}
                  </td>
                  {role === "admin" && (
                    <td className="px-4 py-3 text-sm">
                      <Select
                        options={actionOptions}
                        placeholder="Action"
                        onChange={(e) => handleAction(e.target.value, district)}
                      />
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-96 p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              {isAdding ? "Add District" : "Edit District"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="District Name"
                value={formData.district_name}
                onChange={(e) =>
                  setFormData({ ...formData, district_name: e.target.value })
                }
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />

              <select
                value={formData.province_id}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    province_id: e.target.value,
                  })
                }
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Province</option>
                {provinces.map((province) => (
                  <option key={province.province_id} value={province.province_id}>
                    {province.province_name}
                  </option>
                ))}
              </select>

              <div className="flex justify-end gap-2 pt-2">
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Districts;
