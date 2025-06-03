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
  department: string;
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
         <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
 <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 space-y-6">
  {/* Glowing Ring Spinner */}
  <div className="relative w-20 h-20">
    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-l-purple-500 animate-spin shadow-[0_0_20px_rgba(59,130,246,0.5)]"></div>
    <div className="absolute inset-2 rounded-full bg-white dark:bg-gray-900"></div>
  </div>

  {/* Animated Text */}
  <p className="text-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text animate-pulse tracking-wide">
    Loading Please Wait...
  </p>

  {/* Optional subtitle or loader bar */}
  <div className="w-40 h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 rounded-full animate-pulse"></div>
</div>

</div>

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
                  if (industry.department) {
                  router.push(`/industry/${encodeURIComponent(industry.industries)}`);
                  } else {
                  console.error("Invalid department:", industry);
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