import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetServicesQuery } from "../redux/features/serviceSlice";

const BranchServices = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const branchId = state?.branchId;
  const branchName = state?.branchName;

  const { data: service, isLoading } = useGetServicesQuery(branchId, {
    skip: !branchId,
  });

  const services = service?.data || [];

  if (!branchId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Branch Selected</h2>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:text-blue-800 mb-4 flex items-center gap-2"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            Services at {branchName || "Branch"}
          </h1>
          <p className="text-gray-600 mt-2">
            {services.length} {services.length === 1 ? "service" : "services"} available
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No services available at this branch yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.service_id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {service.service_image && (
                  <img
                    src={`http://localhost:3000/${service.service_image}`}
                    alt={service.service_name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.service_name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.service_description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BranchServices;
