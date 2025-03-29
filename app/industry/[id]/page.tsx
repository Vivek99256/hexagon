"use client";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobIndustryTree from "./JobIndustryTree";
import EmployeeSkillManagement from "@/EmployeeSkillManagement";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Main page for industries, sectors, and sub-sectors */}
        <Route path="/" element={<JobIndustryTree />} />

        {/* Job roles page */}
        <Route path="/job-roles" element={<EmployeeSkillManagement />} />
      </Routes>
    </Router>
  );
}