import Branches from "../components/pages/Branches";
import Dashboard from "../components/pages/Dashboard";
import Districts from "../components/pages/Districts";
import Managers from "../components/pages/Managers";
import Staff from "../components/pages/Staff";
import Provinces from "./../components/pages/Provinces";
import Services from "./../components/pages/Services";
import Inquiries from "./../components/pages/Inquiries";
import Reviews from "./../components/pages/Reviews";
import Gallery from "../components/pages/Gallery";
import TrustedCustomers from "./../components/pages/TrustedCustomers";
import NotFound from "../components/shared/NotFound";
import Login from "../components/pages/Login";

export const adminRoutes = [
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "managers",
    element: <Managers />,
  },
  {
    path: "provinces",
    element: <Provinces />,
  },
  {
    path: "districts",
    element: <Districts />,
  },
  {
    path: "branches",
    element: <Branches />,
  },
  {
    path: "services",
    element: <Services />,
  },
  {
    path: "staff",
    element: <Staff />,
  },
  {
    path: "inquiries",
    element: <Inquiries />,
  },
  {
    path: "reviews",
    element: <Reviews />,
  },
  {
    path: "gallery",
    element: <Gallery />,
  },
  {
    path: "trusted-customers",
    element: <TrustedCustomers />,
  },
  
];
