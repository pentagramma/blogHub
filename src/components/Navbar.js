import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm fixed w-full z-20 font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-1">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button onClick={() => navigate('/blogs')} className="flex items-center space-x-2 text-2xl font-semibold text-gray-900 tracking-tight">
              <img src="/assets/HeroIcon.png" alt="Hero Icon" className="h-8 w-8" />
              <span>
                Blog<span className="text-blue-600">Hub</span>
              </span>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                <button onClick={() => navigate('/blogs')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Blogs
                </button>
                <button onClick={() => navigate('/my-blogs')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  My Blogs
                </button>
                <button onClick={() => navigate('/create-blog')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Create
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium shadow-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button onClick={() => navigate('/login')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Login
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium shadow-sm"
                >
                  Signup
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-sm">
          <div className="px-6 py-4 flex flex-col space-y-4">
            {user ? (
              <>
                <button
                  onClick={() => {
                    navigate('/blogs');
                    toggleMobileMenu();
                  }}
                  className="text-gray-700 hover:text-blue-600 font-medium text-left"
                >
                  Blogs
                </button>
                <button
                  onClick={() => {
                    navigate('/my-blogs');
                    toggleMobileMenu();
                  }}
                  className="text-gray-700 hover:text-blue-600 font-medium text-left"
                >
                  My Blogs
                </button>
                <button
                  onClick={() => {
                    navigate('/create-blog');
                    toggleMobileMenu();
                  }}
                  className="text-gray-700 hover:text-blue-600 font-medium text-left"
                >
                  Create
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMobileMenu();
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate('/login');
                    toggleMobileMenu();
                  }}
                  className="text-gray-700 hover:text-blue-600 font-medium text-left"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate('/signup');
                    toggleMobileMenu();
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium"
                >
                  Signup
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;