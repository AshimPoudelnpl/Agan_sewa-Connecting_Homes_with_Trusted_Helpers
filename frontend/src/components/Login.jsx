import logo from "../assets/logo-removebg-preview.png"
const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side: Visual/Branding */}
        <div className="md:w-1/2 bg-orange-500 p-12 text-white flex flex-col justify-center">
        <img src={logo} alt=""  className=""/>
          <h1 className="text-4xl font-bold mb-6">Aangan Sewa</h1>
          <p className="text-orange-100 text-lg">
            Welcome back! Please login to access your dashboard and manage your
            services.
          </p>
          <div className="mt-8 hidden md:block">
            <div className="h-1 w-20 bg-orange-300 rounded"></div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-1/2 p-8 md:p-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Login</h2>
          <p className="text-gray-500 mb-8">
            Enter your credentials to continue
          </p>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                placeholder="name@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              
              
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-orange-200 transition-all duration-300"
            >
              Sign In
            </button>
          </form>

          
        </div>
      </div>
    </div>
  );
};

export default Login;