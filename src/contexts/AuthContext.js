import React, { createContext, useState, useEffect, useCallback } from 'react';
import api from '../utils/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
  });

  const login = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setAuth({ token, user });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth({ token: null, user: null });
  };

  const verifyToken = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      if (auth.token || auth.user) {
        setAuth({ token: null, user: null });
      }
      return false;
    }
    try {
      const res = await api.get('/auth/me');
      const newUser = res.data.data;
      if (
        auth.token !== token ||
        JSON.stringify(auth.user) !== JSON.stringify(newUser)
      ) {
        setAuth({ token, user: newUser });
      }
      return true;
    } catch (err) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (auth.token || auth.user) {
        setAuth({ token: null, user: null });
      }
      return false;
    }
  }, [auth]);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  return (
    <AuthContext.Provider value={{ user: auth.user, token: auth.token, login, logout, verifyToken }}>
      {children}
    </AuthContext.Provider>
  );
}