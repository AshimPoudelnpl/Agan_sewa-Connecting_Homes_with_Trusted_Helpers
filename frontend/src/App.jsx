import React from 'react'
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { router } from './router/index';

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer/>
    </div>
  )
}

export default App