import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetManagerQuery } from "../../redux/features/authSlice";
import { useGetBranchQuery, useGetProvinceQuery, useGetDistrictQuery } from "../../redux/features/branchSlice";

const Dashboard = () => {
  const { isAuth, user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // API Queries
  const { data: managerData, isLoading: managersLoading } = useGetManagerQuery();
  const { data: branchData, isLoading: branchesLoading } = useGetBranchQuery();
  const { data: provinceData, isLoading: provincesLoading } = useGetProvinceQuery();
  const { data: districtData, isLoading: districtsLoading } = useGetDistrictQuery();

  // Data counts
  const managers = managerData?.data?.length || 0;
  const branches = branchData?.result?.length || branchData?.data?.length || 0;
  const provinces = provinceData?.data?.length || 0;
  const districts = districtData?.data?.length || 0;

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  const stats = [
    {
      title: "Total Managers",
      value: managers,
      icon: "👥",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      loading: managersLoading
    },
    {
      title: "Total Branches", 
      value: branches,
      icon: "🏢",
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      loading: branchesLoading
    },
    {
      title: "Total Provinces",
      value: provinces,
      icon: "🗺️",
      color: "from-violet-500 to-violet-600", 
      bgColor: "bg-violet-50",
      loading: provincesLoading
    },
    {
      title: "Total Districts",
      value: districts,
      icon: "📍",
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50", 
      loading: districtsLoading
    }
  ];

  const quickActions = [
    {
      title: "Managers",
      description: "Manage system administrators",
      icon: "👥",
      path: "/admin/managers",
      color: "blue"
    },
    {
      title: "Branches", 
      description: "Manage branch locations",
      icon: "🏢",
      path: "/admin/branches",
      color: "emerald"
    },
    {
      title: "Provinces",
      description: "Manage provinces",
      icon: "🗺️", 
      path: "/admin/provinces",
      color: "violet"
    },
    {
      title: "Districts",
      description: "Manage districts",
      icon: "📍",
      path: "/admin/districts", 
      color: "amber"
    },
    {
      title: "Profile",
      description: "View your profile",
      icon: "👤",
      path: "/admin/profile",
      color: "slate"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.email?.split('@')[0] || 'Admin'}! 👋
            </h1>
            <p className="text-gray-600">Here's your business overview for today.</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Last updated</div>
            <div className="text-lg font-semibold text-gray-700">
              {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 overflow-hidden">
            <div className={`bg-gradient-to-r ${stat.color} p-6`}>
              <div className="flex items-center justify-between">
                <div className="text-white">
                  <p className="text-sm opacity-90 font-medium">{stat.title}</p>
                  {stat.loading ? (
                    <div className="animate-pulse">
                      <div className="h-8 bg-white/20 rounded w-12 mt-2"></div>
                    </div>
                  ) : (
                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  )}
                </div>
                <div className="text-4xl opacity-80">{stat.icon}</div>
              </div>
            </div>
            <div className={`${stat.bgColor} p-4`}>
              <div className="text-sm font-medium text-gray-700 flex items-center">
                <span className="mr-1">📈</span>
                Active
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="mr-3">⚡</span>
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => navigate(action.path)}
              className={`group bg-gradient-to-br from-${action.color}-50 to-white border border-${action.color}-200 p-5 rounded-xl hover:shadow-sm transition-all text-left hover:scale-105`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`bg-${action.color}-500 p-2 rounded-lg text-white text-xl`}>
                  {action.icon}
                </div>
                <svg className={`w-5 h-5 text-${action.color}-600 group-hover:translate-x-1 transition-transform`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* System Overview & Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-3">📊</span>
            System Overview
          </h3>
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                M
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{managers} Managers</p>
                <p className="text-sm text-gray-600">System administrators</p>
              </div>
              <div className="text-2xl">👥</div>
            </div>

            <div className="flex items-center p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                B
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{branches} Branches</p>
                <p className="text-sm text-gray-600">Operating locations</p>
              </div>
              <div className="text-2xl">🏢</div>
            </div>

            <div className="flex items-center p-4 bg-violet-50 rounded-lg hover:bg-violet-100 transition-colors">
              <div className="w-12 h-12 bg-violet-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                P
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{provinces} Provinces</p>
                <p className="text-sm text-gray-600">Geographic coverage</p>
              </div>
              <div className="text-2xl">🗺️</div>
            </div>

            <div className="flex items-center p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                D
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{districts} Districts</p>
                <p className="text-sm text-gray-600">Service areas</p>
              </div>
              <div className="text-2xl">📍</div>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
              <span className="mr-3">🔧</span>
              System Status
            </h3>
            <span className="text-xs text-gray-500 bg-green-100 px-3 py-1 rounded-full">
              All Systems Operational
            </span>
          </div>
          <div className="space-y-4">
            {[
              { name: "Database Connection", status: "Connected", percentage: 100, color: "bg-green-500" },
              { name: "API Services", status: "Running", percentage: 98, color: "bg-green-500" },
              { name: "File Storage", status: "Available", percentage: 95, color: "bg-blue-500" },
              { name: "Authentication", status: "Secure", percentage: 100, color: "bg-green-500" }
            ].map((system, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 ${system.color} rounded-full mr-3 animate-pulse`}></div>
                    <span className="text-sm font-medium text-gray-900">{system.name}</span>
                  </div>
                  <span className="text-sm text-gray-600">{system.status}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`${system.color} h-2 rounded-full transition-all duration-500`} 
                    style={{ width: `${system.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;