import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetManagerQuery } from "../../redux/features/authSlice";
import { useGetBranchQuery } from "../../redux/features/branchSlice";

const Dashboard = () => {
  const { isAuth } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const { data: managerData } = useGetManagerQuery();
  const { data: branchData } = useGetBranchQuery();

  const managers = managerData?.data?.length || 0;
  const branches = branchData?.result?.length || 0;

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-500 text-white p-6 rounded-lg">
          <h3 className="text-lg font-semibold">Total Managers</h3>
          <p className="text-3xl font-bold">{managers}</p>
        </div>

        <div className="bg-green-500 text-white p-6 rounded-lg">
          <h3 className="text-lg font-semibold">Total Branches</h3>
          <p className="text-3xl font-bold">{branches}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button
            onClick={() => navigate("/admin/managers")}
            className="bg-blue-100 p-4 rounded hover:bg-blue-200"
          >
            Add Manager
          </button>
          <button
            onClick={() => navigate("/admin/branches")}
            className="bg-green-100 p-4 rounded hover:bg-green-200"
          >
            Manage Branches
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
