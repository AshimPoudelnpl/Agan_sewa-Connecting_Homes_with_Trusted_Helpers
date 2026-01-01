import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../../redux/features/authState";
import { useSignoutMutation } from "../../redux/features/authSlice";
import { toast } from "react-toastify";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signout] = useSignoutMutation();

  const handleLogout = async () => {
    try {
      const res = await signout().unwrap();
      toast.success(res.message);
      console.log(res)
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.log("Logout error:", err);
    }
  };

  return (
    <div className=" w-64  min-h-screen  bg-gray-800 text-white flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold">Agan Sewa</h2>
        <p className="text-sm text-gray-400">Service Management</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/admin/dashboard"
              className="block py-2 px-4 rounded hover:bg-gray-700"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/managers"
              className="block py-2 px-4 rounded hover:bg-gray-700"
            >
              Managers
            </Link>
          </li>
          <li>
            <details className="group">
              <summary className="block py-2 px-4 rounded hover:bg-gray-700 cursor-pointer">
                Branch Management
              </summary>
              <ul className="ml-4 mt-2 space-y-1">
                <li>
                  <Link
                    to="/admin/provinces"
                    className="block py-1 px-4 text-sm rounded hover:bg-gray-700"
                  >
                    Provinces
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/districts"
                    className="block py-1 px-4 text-sm rounded hover:bg-gray-700"
                  >
                    Districts
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/branches"
                    className="block py-1 px-4 text-sm rounded hover:bg-gray-700"
                  >
                    Branches
                  </Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
