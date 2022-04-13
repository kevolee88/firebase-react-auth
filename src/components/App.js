import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';

import ProtectedRoute from './ProtectedRoute';
import Dashboard from './Dashboard';
import Login from './Login';
import Signup from './Signup';
import ForgotPassword from './ForgotPassword';

const App = () => {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
