import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const { name, email, password, password2 } = formData;
  const { register, isAuthenticated, error, clearErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/');
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [isAuthenticated, error, navigate, clearErrors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== password2) {
      toast.error('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const result = await axios.post(`${API}/auth/register`, {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password
      });
   console.log(result)
      if (result.status === 201) {
        toast.success('Registration successful! Please log in.');
        navigate('/login');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-tr from-blue-50 via-white to-indigo-50">
      <div className="w-full max-w-md">

        {/* Heading – More spacious */}
        <div className="mb-3 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
            Create an Account
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        {/* Card – Premium glassmorphism */}
        <div className="bg-white/90 backdrop-blur-xl p-10 sm:p-12 rounded-3xl shadow-2xl border border-gray-100">

          <form className="space-y-10" onSubmit={onSubmit}>

            {/* Full Name */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-700">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={handleChange}
                required
                className="w-full px-5 py-2 text-lg rounded-xl border border-gray-300 
                         bg-white text-gray-900 placeholder-gray-400 
                         focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 
                         outline-none transition-all"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-700">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
                required
                className="w-full px-5 py-2 text-lg rounded-xl border border-gray-300 
                         bg-white text-gray-900 placeholder-gray-400 
                         focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 
                         outline-none transition-all"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-700">Password</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  minLength="6"
                  required
                  value={password}
                  onChange={handleChange}
                  className="w-full px-5 py-2 pr-14 text-lg rounded-xl border border-gray-300 
                           bg-white text-gray-900 placeholder-gray-400 
                           focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 
                           outline-none transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-700">Confirm Password</label>
              <div className="relative">
                <input
                  id="password2"
                  name="password2"
                  type={showPassword2 ? 'text' : 'password'}
                  minLength="6"
                  required
                  value={password2}
                  onChange={handleChange}
                  className="w-full px-5 py-2 pr-14 text-lg rounded-xl border border-gray-300 
                           bg-white text-gray-900 placeholder-gray-400 
                           focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 
                           outline-none transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword2(!showPassword2)}
                  className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword2 ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Submit Button – Full prominence */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl text-white text-xl font-bold 
                         bg-gradient-to-r from-blue-600 to-indigo-600 
                         hover:from-blue-700 hover:to-indigo-700 
                         shadow-xl hover:shadow-2xl transform hover:scale-[1.02]
                         transition-all duration-200 active:scale-95
                         ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}