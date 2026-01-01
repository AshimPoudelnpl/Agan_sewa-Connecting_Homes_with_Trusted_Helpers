import { RouterProvider } from "react-router-dom";

import { router } from "./router/Index";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div className="font-extralight">
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={300} // ⏱ 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default App;
