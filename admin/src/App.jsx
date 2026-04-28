import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route, Navigate } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "₹";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer position="top-right" />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <div className="flex flex-col min-h-screen">
          <Navbar setToken={setToken} />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 p-6 overflow-auto">
              <Routes>
                <Route path="/" element={<Navigate to="/orders" />} />
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
              </Routes>
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
