import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import "./styles/global.css";

// 🔥 Lazy Loaded Pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Packages = lazy(() => import("./pages/Packages"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const MyPlan = lazy(() => import("./pages/MyPlan"));
// 🔥 Loader Component
const Loader = () => (
  <div className="w-full h-[60vh] flex justify-center items-center">
    <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
  </div>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">

          {/* Navbar always visible */}
          <Navbar />

          <main className="grow">
            <AnimatePresence mode="wait">
              {/* Suspense to wrap all lazy-loaded components */}
              <Suspense fallback={<Loader />}>

                <Routes>
                  <Route index element={<Home />} />
                  <Route path="home" element={<Navigate to="/" replace />} />
                  <Route path="about" element={<About />} />

                  <Route
                    path="packages"
                    element={
                      <ProtectedRoute>
                        <Packages />
                      </ProtectedRoute>
                    }
                  />

                  <Route path="contact" element={<Contact />} />
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                  <Route path="my-plan" element={<MyPlan />} />

                  {/* Unknown route → redirect */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>

              </Suspense>
            </AnimatePresence>
          </main>

          {/* Footer always visible */}
          <Footer />

          <Toaster position="top-right" />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
