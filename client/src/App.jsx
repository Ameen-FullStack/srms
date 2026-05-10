import axios from "axios";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";

import { Navbar, ProtectedRoute } from "./components";

import {
  Home,
  Login,
  Register,
  Upload,
  MaterialDetail,
  Admin,
  MyUploads,
  Bookmarks,
  Leaderboard,
  Notifications,
  Profile,
} from "./pages";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    axios
      .get("http://localhost:5000/")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route path="/leaderboard" element={<Leaderboard />} />

            <Route path="/material/:id" element={<MaterialDetail />} />

            <Route
              path="/upload"
              element={
                <ProtectedRoute>
                  <Upload />
                </ProtectedRoute>
              }
            />

            <Route
              path="/my-uploads"
              element={
                <ProtectedRoute>
                  <MyUploads />
                </ProtectedRoute>
              }
            />

            <Route
              path="/bookmarks"
              element={
                <ProtectedRoute>
                  <Bookmarks />
                </ProtectedRoute>
              }
            />

            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <Admin />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
