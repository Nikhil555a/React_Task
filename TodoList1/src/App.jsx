
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="flex items-center gap-4 bg-blue-600 text-white px-6 py-3 shadow">
        <Link to="/" className="font-bold hover:underline">
          Home
        </Link>
        <div className="flex-1" />
        <Link to="/login" className="hover:underline">
          Login
        </Link>
        <Link to="/signup" className="hover:underline">
          Signup
        </Link>
      </nav>

      <div className="p-6">
        <Routes>
          <Route
            path="/"
            element={
              <div className="p-6 text-center">
                <p className="text-lg">
                  Open <Link to="/dashboard" className="text-blue-600 underline">Dashboard</Link>
                </p>
              </div>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
