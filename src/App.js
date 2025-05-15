import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Blogs from './pages/Blogs';
import CreateBlog from './pages/CreateBlog';
import EditBlog from './pages/EditBlog';
import MyBlogs from './pages/MyBlogs';
import api from './utils/api';

function AuthRedirect({ children }) {
  const { user } = useContext(AuthContext);
  return user ? <Navigate to="/blogs" replace /> : children;
}

function App() {
  const location = useLocation();
  const { user, verifyToken } = useContext(AuthContext);
  const [isVerified, setIsVerified] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const verified = await verifyToken();
        setIsVerified(verified);
      } catch (err) {
        console.error('Token verification failed:', err);
        setIsVerified(false);
      }
    };
    checkToken();
  }, [verifyToken]);

  const showNavbar = !['/login', '/signup'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-100">
      {showNavbar && <Navbar />}
      <div className={showNavbar ? 'pt-16' : ''}>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route
            path="/login"
            element={
              <AuthRedirect>
                <Login />
              </AuthRedirect>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthRedirect>
                <Signup />
              </AuthRedirect>
            }
          />
          <Route
            path="/blogs"
            element={
              <ProtectedRoute>
                <Blogs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-blog"
            element={
              <ProtectedRoute>
                <CreateBlog />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-blog/:id"
            element={
              <ProtectedRoute>
                <EditBlog />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-blogs"
            element={
              <ProtectedRoute>
                <MyBlogs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              isVerified === null ? null : isVerified ? (
                <Navigate to="/blogs" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;