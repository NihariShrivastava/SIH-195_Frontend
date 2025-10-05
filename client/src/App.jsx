import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import LoginPage from "./pages/Login.jsx";
import SignupPage from "./pages/Signup.jsx";
import AdminDashboardPage from "./pages/Dashboard/AdminDashBoard.jsx";
import EmployeeDashboardPage from "./pages/Dashboard/EmployeeDashBoard.jsx";
import EmployeeTicketPage from "./pages/Tickets/Employeetickets.jsx";
import EmployeeSettings from "./pages/Settings/EmployeeSetting.jsx";
import EmployeeAIAssistant from "./pages/AIAssistant/AIAssistant.jsx";
import EmployeeKnowledge from "./pages/Knowledge/EmployeeKnowledge.jsx";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/adminDashboard" element={<AdminDashboardPage />} />
        <Route path="/employeeDashboard" element={<EmployeeDashboardPage />} />
        <Route path="/employeeDashboardTicket" element={<EmployeeTicketPage />} />
        <Route path="/employeeDashboardSettings" element={<EmployeeSettings />} />
        <Route path="/employeeDashboardAIAssistant" element={<EmployeeAIAssistant />} />
        <Route path="/employeeDashboardKnowledge" element={<EmployeeKnowledge />} />

      </Routes>
    </Router>
  );
}

export default App;
