import { RouterProvider } from "react-router-dom";

import { router } from "./router/Index";

const App = () => {
  return (
    <div className="font-extralight">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
