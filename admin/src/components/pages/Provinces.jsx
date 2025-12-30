import { useState } from "react";
import {
  useGetProvinceQuery,
  useDeleteProvinceMutation,
  useAddProvinceMutation,
} from "../../redux/features/branchSlice";
import Loading from "../shared/Loading";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const initialData = {
  name: "",
};

const Provinces = () => {
  const { role } = useSelector((state) => state.user);

  const { data, isLoading, error } = useGetProvinceQuery();
  const [deleteProvince] = useDeleteProvinceMutation();
  const [addProvince] = useAddProvinceMutation();

  const provinces = data?.data || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(initialData);

  const handleDelete = async (province) => {
    
    try {
      await deleteProvince(province.province_id).unwrap();
      toast.success(`${province.province_name} deleted successfully`);
    } catch (err) {
      toast.error("Failed to delete province",err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.warning("Province name is required");
      return;
    }

    try {
      const res = await addProvince(formData).unwrap();
      toast.success(res.message || "Province added successfully");
      setFormData(initialData);
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to add province");
    }
  };

  if (isLoading) return <Loading isLoading={isLoading} />;
  if (error)
    return <p className="p-4 text-red-600">Failed to load provinces</p>;

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Provinces</h1>
        {role === "admin" && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-amber-700 text-white px-4 py-2 rounded-full"
          >
            Add Province
          </button>
        )}
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase">
                Name
              </th>
              {role === "admin" && (
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {provinces.length === 0 ? (
              <tr>
                <td
                  colSpan={role === "admin" ? 3 : 2}
                  className="px-6 py-4 text-center text-gray-500"
                >
                  No provinces found
                </td>
              </tr>
            ) : (
              provinces.map((province) => (
                <tr key={province.province_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{province.province_id}</td>
                  <td className="px-6 py-4 font-medium">
                    {province.province_name}
                  </td>

                  {role === "admin" && (
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(province)}
                        className="bg-red-600 text-white px-3 py-1 rounded-2xl"
                      >
                        Delete
                      </button>
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
              Add Province
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Province Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ name: e.target.value })
                }
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />

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
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Provinces;
