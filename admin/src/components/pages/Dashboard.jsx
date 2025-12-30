import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetManagerQuery } from "../../redux/features/authSlice";
import { useGetBranchQuery } from "../../redux/features/branchSlice";
import { useGetServicesQuery } from "../../redux/features/serviceSlice";
import { useGetStaffQuery } from "../../redux/features/staffSlice";
import { useGetInquiryQuery, useGetReviewQuery } from "../../redux/features/siteSlice";

const Dashboard = () => {
  const { isAuth } = useSelector((state) => state.user);
  const navigate = useNavigate();
  
  const { data: managerData } = useGetManagerQuery();
  const { data: branchData } = useGetBranchQuery();
  const { data: serviceData } = useGetServicesQuery();
  const { data: staffData } = useGetStaffQuery();
  const { data: inquiryData } = useGetInquiryQuery();
  const { data: reviewData } = useGetReviewQuery();

  const managers = managerData?.data?.length || 0;
  const branches = branchData?.data?.length || 0;
  const services = serviceData?.data?.length || 0;
  const staff = staffData?.data?.length || 0;
  const inquiries = inquiryData?.data?.length || 0;
  const reviews = reviewData?.data?.length || 0;

  useEffect(() => {
    if (!isAuth) {
      navigate("/not-found");
    }
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Managers</h3>
          <p className="text-3xl font-bold">{managers}</p>
        </div>
        
        <div className="bg-green-500 text-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Branches</h3>
          <p className="text-3xl font-bold">{branches}</p>
        </div>
        
        <div className="bg-purple-500 text-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Services</h3>
          <p className="text-3xl font-bold">{services}</p>
        </div>
        
        <div className="bg-orange-500 text-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Staff</h3>
          <p className="text-3xl font-bold">{staff}</p>
        </div>
        
        <div className="bg-red-500 text-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Inquiries</h3>
          <p className="text-3xl font-bold">{inquiries}</p>
        </div>
        
        <div className="bg-yellow-500 text-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Reviews</h3>
          <p className="text-3xl font-bold">{reviews}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
