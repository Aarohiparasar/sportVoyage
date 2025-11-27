import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import axios from 'axios';


const API = import.meta.env.VITE_API_URL;

export default function Login() {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login, isAuthenticated, setIsAuthenticated, error, clearErrors } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [isAuthenticated, error, from, navigate, clearErrors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const res = await login(formData);  // login() never throws

  if (res.success) {
    toast.success("Logged in successfully!");
    navigate(from, { replace: true });
  } else {
    toast.error(error || "Login failed");
  }

  setLoading(false);
};
;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-tr from-blue-50 via-white to-indigo-50">
      <div className="w-full max-w-md">

        {/* Heading – More top margin */}
        <div className=" text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-6 text-lg text-gray-600">
            Login to continue
            <Link to="/register" className="ml-2 text-blue-600 font-semibold hover:underline">
              Or create an account
            </Link>
          </p>
        </div>

        {/* Card – More padding & spacing */}
        <div className="bg-white/90 backdrop-blur-xl p-10 sm:p-12 rounded-3xl shadow-2xl border border-gray-100">

          <form className="space-y-10" onSubmit={onSubmit}>   {/* Increased from space-y-8 → space-y-10 */}

            {/* Email */}
            <div className="space-y-4">   {/* Increased spacing */}
              <label className="block text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-5 py-4 text-lg rounded-xl border border-gray-300 
                         bg-white text-gray-900 placeholder-gray-400 
                         focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 
                         outline-none transition-all"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
  <label className="block text-sm font-semibold text-gray-700">
    Password
  </label>

  <div className="relative">
    <input
      id="password"
      name="password"
      type={showPassword ? "text" : "password"}
      required
      value={formData.password}
      onChange={handleChange}
      className="w-full px-5 py-4 pr-14 text-lg rounded-xl border border-gray-300 
                 bg-white text-gray-900 placeholder-gray-400 
                 focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 
                 outline-none transition-all"
      placeholder="••••••••"
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute inset-y-0 right-4 flex items-center text-gray-500 
                 hover:text-gray-700 text-sm font-medium"
    >
      {showPassword ? "Hide" : "Show"}
    </button>
  </div>
</div>

            {/* Remember + Forgot – More margin */}
            <div className="flex items-center justify-between pt-4">
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                <span className="text-base text-gray-700">Remember me</span>
              </label>
              <button type="button" className="text-base text-blue-600 font-medium hover:underline">
                Forgot password?
              </button>
            </div>

            {/* Submit Button – More margin & taller */}
            <div className="pt-8">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-5 rounded-xl text-white text-xl font-bold 
                         bg-gradient-to-r from-blue-600 to-indigo-600 
                         hover:from-blue-700 hover:to-indigo-700 
                         shadow-xl hover:shadow-2xl transform hover:scale-[1.02]
                         transition-all duration-200 active:scale-95
                         ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}