"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export interface Industry {
  industries: string | null; // Industry name
  sector: string | null; // Sector name
  track?: string | null; // Sub-sector name
  industry: string | null; // Industry type
}

export default function IndustryCard() {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const response = await fetch("http://localhost:5000/industry");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data: Industry[] = await response.json();
        setIndustries(data);
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
        setLoading(false);
      }
    };

    fetchIndustries();
  }, []);

  if (loading) {
    return <div>Loading industries...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Remove duplicate industries based on the `industries` property
  const uniqueIndustries = Array.from(
    new Set(industries.map((industry) => industry.industries))
  );

  return (
    <div className="p-8 bg-white rounded-2xl shadow max-sm:p-5">
      <div className="mb-5 text-2xl text-neutral-700 max-sm:text-xl">
        Industries
      </div>
      <div className="mb-8 h-px bg-stone-300"></div>
      <div className="flex flex-col gap-5">
        {uniqueIndustries.map((industry, index) => (
          <div
            key={index}
            className="text-lg leading-snug text-zinc-800 max-sm:text-base cursor-pointer"
            onClick={() => navigate("/")} // Redirect to the home page
          >
            {industry || "Hospital Mangement"} {/* Handle null values */}
          </div>
        ))}
      </div>
    </div>
  );
}