import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;

// Send cookies automatically with every request
axios.defaults.withCredentials = true;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [globalPackages, setGlobalPackages]=useState(null)
    const [loadingPackages, setLoadingPackages] = useState(true);

  const navigate = useNavigate();

  // Load user on first mount
  useEffect(() => {
    loadUser();
  }, []);

  // -------------------------
  // Load current logged-in user
  // -------------------------
  const loadUser = async () => {
    try {
      const res = await axios.get(`${API_URL}/auth/me`);
      //console.log(res.data)
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (err) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

// Fetch packages function
  const fetchPackages = async () => {
    try {
      setLoadingPackages(true);
      const response = await axios.get(`${API_URL}/packages/getPackages`);
      setGlobalPackages(response.data?.packages || []);
    } catch (error) {
      console.error('Error fetching packages:', error);
      toast.error('Failed to load packages. Please try again later.');
    } finally {
      setLoadingPackages(false);
    }
  };

  // Fetch packages on component mount
  useEffect(() => {
    fetchPackages();
  }, []);

  // -------------------------
  // Register user
  // -------------------------
  const register = async (formData) => {
    try {
      await axios.post(`${API_URL}/auth/register`, formData);
      setIsAuthenticated(true)
      
      // token auto stored in cookie by backend
      await loadUser();
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      return { success: false };
    }
  };

  // -------------------------
  // Login user
  // -------------------------
  const login = async (formData) => {
    try {
      await axios.post(`${API_URL}/auth/login`, formData,{withCredentials:true});

      // token auto stored in cookie
      await loadUser();
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      return { success: false };
    }
  };

  // -------------------------
  // Logout user → clears cookie
  // -------------------------
  const logout = async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`); // backend must clear cookie

      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      console.log('Logout error:', err);
    }
  };

  const clearErrors = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        register,
        login,
        logout,
        clearErrors,
        globalPackages,
        loadingPackages
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// -------------------------
// Custom hook
// -------------------------
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};

export default AuthContext;
