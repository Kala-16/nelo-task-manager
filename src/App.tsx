import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginScreen from "./components/Auth/LoginScreen";
import TaskManager from "./components/TaskManager/TaskManager";
import authService from "./services/authService";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={authService.isAuthenticated() ? "/tasks" : "/login"} />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/tasks" element={<Protected><TaskManager /></Protected>} />
    </Routes>
  );
}

function Protected({ children }: { children: React.ReactNode }) {
  if (!authService.isAuthenticated()) return <Navigate to="/login" replace />;
  return <>{children}</>;
}