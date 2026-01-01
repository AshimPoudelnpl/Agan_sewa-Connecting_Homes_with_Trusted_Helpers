import { useState } from "react";
import {
  useGetManagerQuery,
  useDeleteManagerMutation,
  useAddManagerMutation,
  useEditManagerMutation,
} from "../../redux/features/authSlice";
import { useGetBranchQuery, useGetProvinceQuery, useGetDistrictQuery } from "../../redux/features/branchSlice";
import Loading from "../shared/Loading";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const initialData = {
  manager_name: "",
  manager_email: "",
  manager_phone: "",
  password: "",
  province_id: "",
  district_id: "",
  branch_id: "",
  role: "manager",
  image: "",
};

const Managers = () => {
  const { role } = useSelector((state) => state.user);

  const [managerId, setManagerId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [originalData, setOriginalData] = useState({});
  const [formData, setFormData] = useState(initialData);

  const { data, isLoading, error } = useGetManagerQuery();
  const { data: branchData } = useGetBranchQuery();
  const { data: provinceData } = useGetProvinceQuery();
  const { data: districtData } = useGetDistrictQuery();

  const [deleteManager] = useDeleteManagerMutation();
  const [addManager] = useAddManagerMutation();
  const [editManager] = useEditManagerMutation();

  const managers = data?.data || [];
  const branches = branchData?.data || branchData?.result || [];
  const provinces = provinceData?.data || [];
  const districts = districtData?.data || [];

  const filteredDistricts = formData.province_id 
    ? districts.filter(district => district.province_id == formData.province_id)
    : [];
    
  const filteredBranches = formData.district_id 
    ? branches.filter(branch => branch.district_id == formData.district_id)
    : [];

  console.log('Branch Data:', branchData);
  console.log('Branches:', branches);
  console.log('Districts:', districts);
  console.log('Provinces:', provinces);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: files ? files[0] : value,
      ...(id === 'province_id' && { district_id: '', branch_id: '' }),
      ...(id === 'district_id' && { branch_id: '' })
    }));
  };

  if (isLoading) return <Loading isLoading={isLoading} />;
  if (error)
    return <p className="p-4 text-red-600">Failed to load managers!</p>;

  const handleDelete = async (manager) => {
    try {
      await deleteManager(manager.id).unwrap();
      toast.success(`${manager.manager_name} deleted successfully`);
    } catch (err) {
      toast.error("Failed to delete manager", err);
    }
  };

  const handleEdit = (manager) => {
    setIsAdding(false);
    setManagerId(manager.id);
    setOriginalData(manager);
    
    const selectedBranch = branches.find(b => b.branch_id == manager.branch_id);
    const selectedDistrict = districts.find(d => d.district_id == selectedBranch?.district_id);
    
    setFormData({
      manager_name: manager.manager_name,
      manager_email: manager.manager_email,
      manager_phone: manager.manager_phone,
      password: "",
      province_id: selectedDistrict?.province_id || "",
      district_id: selectedBranch?.district_id || "",
      branch_id: manager.branch_id,
      role: "manager",
      image: manager.img,
    });
    setIsModalOpen(true);
  };

  const handleAddManager = () => {
    setIsAdding(true);
    setManagerId(null);
    setFormData(initialData);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isAdding) {
      try {
        const fd = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          if (value) fd.append(key, value);
        });

        const res = await addManager(fd).unwrap();
        toast.success(res.message || "Manager added successfully");
        setIsModalOpen(false);
        setFormData(initialData);
      } catch (err) {
        toast.error(err?.data?.message || "Failed to add manager");
      }
      return;
    }

    const updatedData = new FormData();

    if (formData.manager_name !== originalData.manager_name)
      updatedData.append("manager_name", formData.manager_name);

    if (formData.manager_email !== originalData.manager_email)
      updatedData.append("manager_email", formData.manager_email);

    if (formData.manager_phone !== originalData.manager_phone)
      updatedData.append("manager_phone", formData.manager_phone);

    if (formData.branch_id !== originalData.branch_id)
      updatedData.append("branch_id", formData.branch_id);

    if (formData.password) updatedData.append("password", formData.password);

    if (formData.image instanceof File)
      updatedData.append("image", formData.image);

    if ([...updatedData.keys()].length === 0) {
      toast.info("No changes made");
      return;
    }

    try {
      const res = await editManager({
        id: managerId,
        formData: updatedData,
      }).unwrap();
      toast.success(res.message || "Manager updated successfully");
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Managers List</h1>
        {role === "admin" && (
          <button
            onClick={handleAddManager}
            className="bg-amber-700 text-white px-4 rounded-full"
          >
            Add Manager
          </button>
        )}
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Province</th>
              <th className="px-6 py-3">District</th>
              <th className="px-6 py-3">Branch</th>
              {role === "admin" && <th className="px-6 py-3">Actions</th>}
            </tr>
          </thead>

          <tbody className="divide-y">
            {managers.map((manager) => (
              <tr key={manager.id}>
                <td className="px-6 py-4">
                  {manager.img ? (
                    <img
                      src={`${import.meta.env.VITE_IMAGE_URL}/${manager.img}`}
                      alt={manager.manager_name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-xs">
                      No Image
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">{manager.manager_name}</td>
                <td className="px-6 py-4 text-blue-600">
                  {manager.manager_email}
                </td>
                <td className="px-6 py-4">{manager.manager_phone}</td>
                <td className="px-6 py-4">{manager.province_name || 'N/A'}</td>
                <td className="px-6 py-4">{manager.district_name || 'N/A'}</td>
                <td className="px-6 py-4">{manager.branch_name}</td>

                {role === "admin" && (
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => handleEdit(manager)}
                      className="bg-blue-600 text-white px-3 py-1 rounded-2xl"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(manager)}
                      className="bg-red-600 text-white px-3 py-1 rounded-2xl"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {managers.length === 0 && (
          <p className="p-4 text-center text-gray-500">No manager data found</p>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-96 p-6">
            <h2 className="text-xl font-semibold mb-4">
              {isAdding ? "Add Manager" : "Edit Manager"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                id="manager_name"
                type="text"
                placeholder="Name"
                value={formData.manager_name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />

              <input
                id="manager_email"
                type="email"
                placeholder="Email"
                value={formData.manager_email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />

              <input
                id="manager_phone"
                type="tel"
                placeholder="Phone"
                value={formData.manager_phone}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />

              <input
                id="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required={isAdding}
              />

              {isAdding && (
                <>
                  <select
                    id="province_id"
                    value={formData.province_id}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="">Select Province</option>
                    {provinces?.map((province) => (
                      <option key={province.province_id} value={province.province_id}>
                        {province.province_name}
                      </option>
                    ))}
                  </select>

                  <select
                    id="district_id"
                    value={formData.district_id}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                    disabled={!formData.province_id}
                  >
                    <option value="">Select District</option>
                    {filteredDistricts?.map((district) => (
                      <option key={district.district_id} value={district.district_id}>
                        {district.district_name}
                      </option>
                    ))}
                  </select>

                  <select
                    id="branch_id"
                    value={formData.branch_id}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                    disabled={!formData.district_id}
                  >
                    <option value="">Select Branch</option>
                    {filteredBranches?.map((branch) => (
                      <option key={branch.branch_id} value={branch.branch_id}>
                        {branch.branch_name}
                      </option>
                    ))}
                  </select>

                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </>
              )}

              {!isAdding && (
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              )}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded"
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

export default Managers;
