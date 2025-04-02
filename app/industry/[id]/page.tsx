"use client";
import React from "react";
import Link from "next/link";
import JobIndustryTree from "./JobIndustryTree";
import EmployeeSkillManagement from "@/EmployeeSkillManagement";

export default function App() {
  return (
    <div>
      {/* Main page for industries, sectors, and sub-sectors */}
      <JobIndustryTree />

      {/* Links for navigation */}
      <nav>
        <Link href="/job-roles">Job Roles</Link>
      </nav>

      {/* Job roles page */}
      <EmployeeSkillManagement />
    </div>
  );
}