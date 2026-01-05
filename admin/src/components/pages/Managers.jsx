import { useState } from "react";
import DetailsModal from "../shared/DetailsModal";
import Select from "../shared/Select";
import Input from "../shared/Input";
import { toast } from "react-toastify";
import {
  useGetDistrictQuery,
  useGetPDBQuery,
  useGetProvinceQuery,
} from "../../redux/features/branchSlice";
import {
  useDeleteManagerMutation,
  useEditManagerMutation,
  useGetManagerQuery,
} from "../../redux/features/authSlice";

const ManagerManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const [selectedBranch, setSelectedBranch] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isAdding, setIsAdding] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);
  const branches = [];

  const { data: provinces } = useGetProvinceQuery();
  const { data: districts } = useGetDistrictQuery();
  const [deleteManager] = useDeleteManagerMutation();
  const [editManager] = useEditManagerMutation();

  const {
    data: pdfData,
    error,
    isLoading,
  } = useGetPDBQuery(
    {
      province_id: selectedProvince || undefined,
      district_id: selectedDistrict || undefined,
    },
    { skip: !selectedProvince }
  );
  const {
    data: managers,
    error: managerError,
    isLoading: managerLoading,
  } = useGetManagerQuery();
  console.log("PDB Query:", {
    selectedProvince,
    selectedDistrict,
    pdfData,
    error,
    isLoading,
  });

  const districtData = districts?.data || [];
  const provinceData = provinces?.data || [];
  const managerData = managers?.data || [];

  console.log(provinceData);

  const provinceOptions = provinceData.map((p) => ({
    value: p.province_id,
    label: p.province_name,
  }));
  const districtOptions = districtData.map((d) => ({
    value: d.district_id,
    label: d.district_name,
  }));

  const branchOptions = branches.map((b) => ({
    value: b.branch_id,
    label: b.branch_name,
  }));

  const handleAction = async (action, manager) => {
    if (action.target.value === "Delete") {
      try {
        await deleteManager(manager.id).unwrap();
        toast.success(`${manager.manager_name} deleted successfully`);
      } catch (err) {
        toast.error("Failed to delete manager", err);
      }
    } else if (action.target.value === "View") {
      setSelectedManager(manager);
      setShowModal(true);
    }
    action.target.value = "";
  };

  const actionOptions = [
    { value: "Delete", label: "Delete" },
    { value: "Edit", label: "Edit" },
    { value: "View", label: "View" },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      selectedProvince,
      selectedDistrict,
      selectedBranch,
      ...formData,
    });
    setShowModal(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Branch Manager Management
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Manager
        </button>
      </div>

      <DetailsModal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Add Manager"
        size="3xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Select
              label="Province"
              options={provinceOptions}
              value={selectedProvince}
              onChange={(e) => {
                setSelectedProvince(e.target.value);
                setSelectedBranch("");
              }}
              placeholder="Select Province"
            />
            <Select
              label="District"
              options={districtOptions}
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                setSelectedBranch("");
              }}
              placeholder="Select district"
            />

            <Select
              label="Branch"
              options={branchOptions}
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              placeholder="Select Branch"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Input
              label="Email"
              type="email"
              id="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />

            <Input
              label="Password"
              type="password"
              id="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-gray-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Add Manager
            </button>
          </div>
        </form>
      </DetailsModal>
      <div className="w-full bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                S.N
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Image
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                manager Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Manager-email
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Phone
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {managerData.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-3 text-center text-gray-500">
                  No Manager found
                </td>
              </tr>
            ) : (
              managerData.map((manager, index) => (
                <tr key={manager.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    <img
                      src={`${import.meta.env.VITE_IMAGE_URL}/${manager.img}`}
                      alt={manager.manager_name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {manager.manager_name}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {manager.manager_email}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {manager.manager_phone}
                  </td>

                  <td className="px-4 py-3 text-sm">
                    <Select
                      options={actionOptions}
                      placeholder="Action"
                      onChange={(e) => handleAction(e, manager)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagerManagement;
