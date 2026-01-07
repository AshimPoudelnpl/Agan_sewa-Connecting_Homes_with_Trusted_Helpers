import { useState } from "react";
import {
  useGetProvinceQuery,
  useDeleteProvinceMutation,
  useAddProvinceMutation,
  useGetDistrictQuery,
} from "../../redux/features/branchSlice";
import Loading from "../shared/Loading";
import Select from "../shared/Select";
import DetailsModal from "../shared/DetailsModal";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const initialData = {
  name: "",
};

const Provinces = () => {
  const { role } = useSelector((state) => state.user);

  const { data, isLoading, error } = useGetProvinceQuery();
  const { data: districtsData, isLoading: districtsLoading } =
    useGetDistrictQuery();
  const [deleteProvince] = useDeleteProvinceMutation();
  const [addProvince] = useAddProvinceMutation();

  const provinces = data?.data || [];
  const districts = districtsData?.data || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [showModal, setShowModal] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState(null);

  const handleAction = async (action, province) => {
    if (action.target.value === "Delete") {
      try {
        await deleteProvince(province.province_id).unwrap();
        toast.success(`${province.province_name} deleted successfully`);
      } catch (err) {
        toast.error("Failed to delete province", err);
      }
    } else if (action.target.value === "View") {
      setSelectedProvince(province);
      setShowModal(true);
    }
    action.target.value = "";
  };

  const actionOptions = [
    { value: "View", label: "View" },
    { value: "Delete", label: "Delete" },
  ];

  const handleAdd = () => {
    setIsAdding(true);
    setFormData(initialData);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isAdding) {
        const res = await addProvince(formData).unwrap();
        toast.success(res.message);
      }
      setFormData(initialData);
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };

  if (isLoading) return <Loading isLoading={isLoading} />;
  if (error)
    return <p className="p-4 text-red-600">Failed to load provinces</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Provinces</h1>
        {role === "admin" && (
          <button
            onClick={handleAdd}
            className="bg-amber-700 text-white px-4 py-2 rounded-full"
          >
            Add Province
          </button>
        )}
      </div>

      <div className="w-full bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                S.N
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Province ID
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Province Name
              </th>
              {role === "admin" && (
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {provinces.length === 0 ? (
              <tr>
                <td
                  colSpan={role === "admin" ? 4 : 3}
                  className="px-4 py-3 text-center text-gray-500"
                >
                  No provinces found
                </td>
              </tr>
            ) : (
              provinces.map((province, index) => (
                <tr
                  key={province.province_id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {province.province_id}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {province.province_name}
                  </td>
                  {role === "admin" && (
                    <td className="px-4 py-3 text-sm">
                      <Select
                        options={actionOptions}
                        placeholder="Action"
                        onChange={(e) => handleAction(e, province)}
                      />
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ADD/EDIT MODAL */}
      <DetailsModal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isAdding ? "Add Province" : "Edit Province"}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Province Name"
            value={formData.name}
            onChange={(e) => setFormData({ name: e.target.value })}
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
              {isAdding ? "Add" : "Update"}
            </button>
          </div>
        </form>
      </DetailsModal>

      {/* VIEW MODAL */}
      <DetailsModal
        show={showModal}
        onClose={() => setShowModal(false)}
        title={`Districts in ${selectedProvince?.province_name}`}
        size="lg"
      >
        {districtsLoading ? (
          <div>Loading districts...</div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2">Province ID</h3>
                <p className="text-gray-900">{selectedProvince?.province_id}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2">Province Name</h3>
                <p className="text-gray-900">{selectedProvince?.province_name}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Districts in this Province:</h3>
              <div className="space-y-2">
                {districts
                  ?.filter(
                    (district) =>
                      district.province_id === selectedProvince?.province_id
                  )
                  ?.length > 0 ? (
                  districts
                    .filter(
                      (district) =>
                        district.province_id === selectedProvince?.province_id
                    )
                    .map((district) => (
                      <div
                        key={district.district_id}
                        className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-blue-900">{district.district_name}</span>
                          <span className="text-sm text-blue-600">ID: {district.district_id}</span>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="p-4 text-center text-gray-500 bg-gray-50 rounded-lg">
                    No districts found in this province
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </DetailsModal>
    </div>
  );
};

export default Provinces;
