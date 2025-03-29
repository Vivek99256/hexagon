'use client';
import React, { useState, useEffect } from "react";

export interface JobRole {
  id: number;
  title: string; // Industry title
  sector: string; // Sector name
  track: string; // Track name
  jobrole: string; // Job role name
}

export default function HospitalManagementJobRoles() {
  const [jobRoles, setJobRoles] = useState<JobRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobRoles = async () => {
      try {
        const response = await fetch("http://localhost:5001/hospital-management-job-roles");
        console.log("Response:", response);
        if (!response.ok) {
          throw new Error(`Failed to fetch job roles data: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Data:", data);
        setJobRoles(data);
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          console.error("Error fetching job roles:", err.message);
          setError(err.message);
        } else {
          console.error("Unexpected error:", err);
          setError("An unexpected error occurred");
        }
        setLoading(false);
      }
    };

    fetchJobRoles();
  }, []);

  if (loading) {
    return <div>Loading job roles...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Group job roles by sector and track
  const groupedData = jobRoles.reduce((acc: any, jobRole) => {
    if (!acc[jobRole.sector]) {
      acc[jobRole.sector] = {};
    }
    if (!acc[jobRole.sector][jobRole.track]) {
      acc[jobRole.sector][jobRole.track] = [];
    }
    acc[jobRole.sector][jobRole.track].push(jobRole.jobrole);
    return acc;
  }, {});

  return (
    <div>
      <h1>Hospital Management Job Roles</h1>
      {Object.keys(groupedData).map((sector) => (
        <div key={sector}>
          <h2>Sector: {sector}</h2>
          {Object.keys(groupedData[sector]).map((track) => (
            <div key={track}>
              <h3>Track: {track}</h3>
              <ul>
                {groupedData[sector][track].map((jobRole: string, index: number) => (
                  <li key={index}>{jobRole}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}