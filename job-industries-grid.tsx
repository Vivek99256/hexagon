"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "./job-industries-grid.css";

type Industry = {
  id: number; // Ensure `id` is unique
  industries: string;
  title: string;
  sector: string;
};

export default function JobIndustriesGrid() {
  const [size, setSize] = useState("AllIndustries"); // Default to show all industries
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const response = await fetch("https://erp.triz.co.in/lms_data?table=s_industries");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
  
        const data: Industry[] = await response.json();
        console.log("Fetched Industries:", data); // Log the fetched data
  
        // Deduplicate industries based on the `industries` field
        const uniqueIndustries = Array.from(
          new Map(
            data
              .filter((industry) => industry.industries) // Ensure `industries` is not undefined or null
              .map((industry) => [industry.industries.toLowerCase(), industry]) // Use `toLowerCase` safely
          ).values()
        );
  
        setIndustries(uniqueIndustries);
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

  // Filter industries based on the selected size
  const displayedIndustries =
    size === "12Industries"
      ? industries.slice(0, 12)
      : size === "32Industries"
      ? industries.slice(0, 32)
      : industries; // Show all industries by default

  console.log("Industries to Display:", displayedIndustries); // Log the industries to display

  return (
    <div className="w-full max-w-6xl mx-auto p-4 bg-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-medium text-gray-700">Industries</h1>
        <Select value={size} onValueChange={setSize}>
          <SelectTrigger className="w-[180px] border-gray-300 rounded-full">
            <SelectValue placeholder="Select Size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AllIndustries">All Industries</SelectItem>
            <SelectItem value="12Industries">12 Industries</SelectItem>
            <SelectItem value="32Industries">32 Industries</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading industries...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="hexagon-grid">
          {displayedIndustries.length > 0 ? (
            displayedIndustries.map((industry, index) => (
              <div
                key={industry.id || `${industry.industries}-${index}`} // Ensure a unique key
                className="hexagon-wrapper cursor-pointer"
                onClick={() => {
                  
                  if (industry.sector) {
                    router.push(`/industry/${industry.department}`);
                  } else {
                    console.error("Invalid sector:", industries);
                  }
                }}
                >
                <div className="hexagon">
                  <div className="hexagon-content">
                    <p>{industry.industries}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No industries found.</p>
          )}
        </div>
      )}
    </div>
  );
}