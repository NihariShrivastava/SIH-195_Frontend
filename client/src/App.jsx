import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // ✅ Toast import

import Home from "./pages/Home.jsx";
import LoginPage from "./pages/Login.jsx";
import SignupPage from "./pages/Signup.jsx";
import AdminDashboardPage from "./pages/Dashboard/AdminDashBoard.jsx";
import EmployeeDashboard from "./pages/Dashboard/EmployeeDashBoard.jsx";
import EmployeeTicketPage from "./pages/Tickets/Employeetickets.jsx";
import SettingsPage from "./pages/Settings/EmployeeSetting.jsx";
import ChatPage from "./pages/AIAssistant/AIAssistant.jsx";
import KnowledgeBasePage from "./pages/Knowledge/EmployeeKnowledge.jsx";

function App() {
  return (
    <Router>
      {/* ✅ Global Toast Container */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/adminDashboard" element={<AdminDashboardPage />} />
        <Route path="/employeeDashboard" element={<EmployeeDashboard />} />
        <Route path="/employeeDashboardTicket" element={<EmployeeTicketPage />} />
        <Route path="/employeeDashboardSettings" element={<SettingsPage />} />
        <Route path="/employeeDashboardAIAssistant" element={<ChatPage />} />
        <Route path="/employeeDashboardKnowledge" element={<KnowledgeBasePage />} />
      </Routes>
    </Router>
  );
}

export default App;
