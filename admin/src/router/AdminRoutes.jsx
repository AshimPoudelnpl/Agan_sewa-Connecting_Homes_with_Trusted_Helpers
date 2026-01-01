import Branches from "../components/pages/Branches";
import Dashboard from "../components/pages/Dashboard";
import Districts from "../components/pages/Districts";
import Managers from "../components/pages/Managers";
import Provinces from "./../components/pages/Provinces";

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
];
