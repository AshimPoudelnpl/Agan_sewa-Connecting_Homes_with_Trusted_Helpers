import Input from "../shared/Input";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/features/authState";
import { useLoginMutation } from "../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();

  const isAuth = useSelector((state) => state.user.isAuth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("All fields are required");
      return;
    }

    try {
      const result = await login(formData).unwrap();
      toast.success(result.message)
      dispatch(setUser(result.user));
      navigate("/admin/dashboard");
    } catch (err) {
      console.log("Login error:", err.data?.message);
    }
  };
  useEffect(() => {
    if(isAuth) {
      navigate("/admin/dashboard");
    }
  }, [isAuth, navigate]);
  

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="flex flex-col items-center bg-white p-10 rounded-xl shadow-md w-96">
        <h1 className="text-3xl font-bold mb-6">LOGIN</h1>
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-5">
          <Input
            type="email"
            placeholder="Enter the email"
            id="email"
            label="Email"
            onChange={handleChange}
            value={formData.email}
            required
          />
          <Input
            type="password"
            placeholder="Enter the password"
            id="password"
            label="Password"
            onChange={handleChange}
            value={formData.password}
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white p-2 rounded-lg mt-3 disabled:opacity-50"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          {error && (
            <p className="text-red-500">
              {error.data?.message || "Login failed"}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
