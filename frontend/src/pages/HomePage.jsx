import { useState, useEffect } from "react";
import Select from "../shared/Select";
import { useNavigate } from "react-router-dom";
import {
  useGetAllDistrictsQuery,
  useGetBranchesByDistrictQuery,
} from "../redux/features/districtSlice";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");

  const { data: districtData, error, isLoading } = useGetAllDistrictsQuery();
  const { data: branchData } = useGetBranchesByDistrictQuery(selectedDistrict, {
    skip: !selectedDistrict,
  });

  const images = [
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&h=1080&fit=crop", // House cleaning
    "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=1920&h=1080&fit=crop", // Plumbing
    "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1920&h=1080&fit=crop", // Electrical work
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&h=1080&fit=crop", // Gardening
  ];

  const branches = branchData?.data || [];
  const availableBranches = branches.map((branch) => ({
    id: branch.branch_id,
    value: branch.branch_id,
    label: branch.branch_name,
    slug: branch.branch_slug,
  }));

  const Districts = districtData?.data || [];
  const DistrictOptions = Districts.map((district) => ({
    value: district.district_id,
    label: district.district_name,
  }));

  const navigate = useNavigate();

  const handleBranchChange = (e) => {
    const branchId = Number(e.target.value);
    const branch = branches.find((b) => b.branch_id === Number(branchId));

    setSelectedBranch(branchId);
    if (branch) {
      navigate(`/services/${branch.branch_slug}`, {
        state: { branchId: branch.branch_id },
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="relative w-full h-160 overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      {/* Center Content */}
      <div className="absolute inset-0 flex items-center justify-center ">
        <div className="text-center  px-8">
          <h1 className=" text-white text-5xl font-bold mb-4">Aangan Sewa</h1>
          <p className="  text-white text-xl mb-2">
            Quality home services, on demand
          </p>
          <p className=" text-white text-lg mb-8">
            Experienced, hand-picked Professionals to serve you at your doorstep
          </p>
          <div className="max-w-2xl mx-auto bg-white/50 rounded-lg p-18 shadow-amber-600">
            <p className="text-lg mb-4 text-gray-800">
              Where do you need a service?
            </p>
            <div className="flex gap-4">
              <Select
                options={DistrictOptions}
                value={selectedDistrict}
                onChange={(e) => {
                  setSelectedDistrict(Number(e.target.value));
                  setSelectedBranch("");
                }}
                placeholder="Select your district"
              />
              <Select
                options={availableBranches}
                value={selectedBranch}
                onChange={handleBranchChange}
                placeholder="Select your Branch"
                disabled={!selectedDistrict}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-orange-500 scale-125"
                : "bg-orange-300 hover:bg-orange-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
