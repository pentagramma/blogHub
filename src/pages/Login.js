import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../contexts/AuthContext';
import api from '../utils/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (!email || !password) {
      toast.error('Please fill in all required fields', {
        className: 'toast-error',
        autoClose: 3000,
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.token, res.data.user);
      toast.success('Logged in successfully!', {
        className: 'toast-success',
        autoClose: 3000,
      });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed', {
        className: 'toast-error',
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      window.location.href = '/blogs';
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">
          Log In
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-lg space-y-6"
          aria-label="Login form"
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                submitted && !email ? 'border-red-500' : 'border-gray-300'
              }`}
              required
              aria-required="true"
              aria-label="Email address"
              disabled={isLoading}
            />
            {submitted && !email && (
              <p className="text-red-500 text-sm mt-1">Email is required</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                submitted && !password ? 'border-red-500' : 'border-gray-300'
              }`}
              required
              aria-required="true"
              aria-label="Password"
              disabled={isLoading}
            />
            {submitted && !password && (
              <p className="text-red-500 text-sm mt-1">Password is required</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center"
            aria-label="Log in"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </>
            ) : (
              'Log In'
            )}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Navigate to sign up page"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;