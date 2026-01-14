import React, { useState, useEffect } from "react";
import {
  useLazyGetDistrictQuery,
  useDeleteDistrictMutation,
  useGetProvinceQuery,
  useAddDistrictMutation,
  useGetBranchQuery,
} from "../../redux/features/branchSlice";
import Loading from "../shared/Loading";
import Select from "../shared/Select";
import DetailsModal from "../shared/DetailsModal";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const initialData = {
  district_name: "",
  province_id: "",
};

const Districts = () => {
  const { role } = useSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [getDistricts, { data, isLoading, error }] = useLazyGetDistrictQuery();
  const { data: provincesData } = useGetProvinceQuery();
  const { data: branchesData } = useGetBranchQuery();
  const [deleteDistrict] = useDeleteDistrictMutation();
  const [addDistrict] = useAddDistrictMutation();

  const districts = data?.data || [];
  const pagination = data?.pagination || {};
  const provinces = provincesData?.data || [];
  const branches = branchesData?.result || branchesData?.data || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [showModal, setShowModal] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  useEffect(() => {
    getDistricts({ page: currentPage, limit: itemsPerPage });
  }, [currentPage, itemsPerPage, getDistricts]);

  const handleAction = async (action, district) => {
    if (action.target.value === "Delete") {
      try {
        await deleteDistrict(district.district_id).unwrap();
        toast.success(`${district.district_name} deleted successfully`);
      } catch (err) {
        toast.error("Failed to delete district", err);
      }
    } else if (action.target.value === "View") {
      setSelectedDistrict(district);
      setShowModal(true);
    }
    action.target.value = "";
  };

  const actionOptions = [
    { value: "Delete", label: "Delete" },
    { value: "View", label: "View" },
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
      // Refresh current page after adding
      getDistricts({ page: currentPage, limit: itemsPerPage });
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
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                S.N
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                District ID
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                District Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Province ID
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Province
              </th>
              {role === "admin" && (
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {districts.length === 0 ? (
              <tr>
                <td
                  colSpan={role === "admin" ? 6 : 5}
                  className="px-4 py-3 text-center text-gray-500"
                >
                  No districts found
                </td>
              </tr>
            ) : (
              districts.map((district, index) => (
                <tr
                  key={district.district_id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {district.district_id}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {district.district_name}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {district.province_id}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {district.province_name ||
                      provinces.find(
                        (p) => p.province_id == district.province_id
                      )?.province_name ||
                      "N/A"}
                  </td>
                  {role === "admin" && (
                    <td className="px-4 py-3 text-sm">
                      <Select
                        options={actionOptions}
                        placeholder="Action"
                        onChange={(e) => handleAction(e, district)}
                      />
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-between items-center mt-4 px-4">
          <div className="text-sm text-gray-600">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, pagination.totalItems)} of{" "}
            {pagination.totalItems} districts
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={!pagination.hasPrevPage}
              className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded">
              {currentPage} of {pagination.totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, pagination.totalPages)
                )
              }
              disabled={!pagination.hasNextPage}
              className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* ADD/EDIT MODAL */}
      <DetailsModal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isAdding ? "Add District" : "Edit District"}
        size="lg"
      >
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
      </DetailsModal>

      {/* DETAILS MODAL */}
      <DetailsModal
        show={showModal}
        onClose={() => setShowModal(false)}
        title={`Branches in ${selectedDistrict?.district_name}`}
        size="lg"
      >
        {selectedDistrict && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2">
                  District ID
                </h3>
                <p className="text-gray-900">{selectedDistrict.district_id}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2">
                  District Name
                </h3>
                <p className="text-gray-900">
                  {selectedDistrict.district_name}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-3">
                Branches in this District:
              </h3>
              <div className="space-y-2">
                {branches?.filter(
                  (branch) =>
                    branch.district_id === selectedDistrict.district_id
                )?.length > 0 ? (
                  branches
                    .filter(
                      (branch) =>
                        branch.district_id === selectedDistrict.district_id
                    )
                    .map((branch) => (
                      <div
                        key={branch.branch_id}
                        className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-blue-900">
                            {branch.branch_name}
                          </span>
                          <span className="text-sm text-blue-600">
                            ID: {branch.branch_id}
                          </span>
                        </div>
                        {branch.remarks && (
                          <p className="text-sm text-gray-600 mt-1">
                            {branch.remarks}
                          </p>
                        )}
                      </div>
                    ))
                ) : (
                  <div className="p-4 text-center text-gray-500 bg-gray-50 rounded-lg">
                    No branches found in this district
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

export default Districts;
