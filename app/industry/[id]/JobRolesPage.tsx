"use client";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function JobRolesPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get the sub-sector data from the state
  const { subSector } = location.state || {};

  // Static job roles data
  const jobRoles = [
    { name: "Farm Labor Contractors", proficiency: "4/5", status: "completed" },
    { name: "Buyers and Purchasing Agents", proficiency: "3/5", status: "in-progress" },
    { name: "Agricultural Inspectors", proficiency: "5/5", status: "completed" },
    { name: "Agricultural Equipment Operators", proficiency: "2/5", status: "not-started" },
  ];

  if (!subSector) {
    return (
      <div className="p-10 bg-white rounded-2xl shadow-sm">
        <button
          onClick={() => navigate(-1)}
          className="mb-5 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Back
        </button>
        <h2 className="text-2xl font-semibold text-gray-700 mb-5">
          No sub-sector selected.
        </h2>
      </div>
    );
  }

  return (
    <div className="p-10 mx-auto max-w-none max-md:max-w-[991px] max-sm:p-5 max-sm:max-w-screen-sm">
      <div className="mb-10 text-2xl text-neutral-700 max-sm:mb-8 max-sm:text-xl">
        Employee Skill Management
      </div>
      <div className="flex gap-10 max-md:flex-col">
        {/* Left Section */}
        <div className="flex flex-col gap-10 w-[350px] max-md:w-full">
          <div className="p-8 bg-white rounded-2xl shadow max-sm:p-5">
            <div className="mb-5 text-2xl text-neutral-700 max-sm:text-xl">
              Job Roles
            </div>
            <div className="mb-8 h-px bg-stone-300"></div>
            <div className="flex flex-col gap-5">
              {jobRoles.map((role, index) => (
                <div
                  key={index}
                  className="text-lg leading-snug text-zinc-800 max-sm:text-base"
                >
                  {role.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1">
          <div
            className="flex absolute right-10 flex-col gap-4 top-[67px] max-md:static max-md:mb-10"
          >
            <div className="flex gap-8 items-center max-sm:gap-5">
              <div className="w-10 h-10 rounded-full bg-gray-300"></div>
              <div className="text-lg text-black max-sm:text-base">
                Task Didn't Start
              </div>
            </div>
            <div className="flex gap-8 items-center max-sm:gap-5">
              <div className="w-10 h-10 rounded-full bg-gray-300"></div>
              <div className="text-lg text-black max-sm:text-base">Continue Task</div>
            </div>
            <div className="flex gap-8 items-center max-sm:gap-5">
              <div className="w-10 h-10 rounded-full bg-gray-300"></div>
              <div className="text-lg text-black max-sm:text-base">Completed Task</div>
            </div>
            <div className="flex gap-8 items-center mt-5 max-sm:gap-5">
              <div className="mb-2.5 text-2xl max-sm:text-xl">5/5</div>
              <div className="text-lg leading-snug max-w-[250px] max-sm:text-base">
                Number reflects the proficiency level to complete that particular
                task
              </div>
            </div>
          </div>
          <div className="relative mt-16 max-sm:overflow-x-auto max-sm:mt-10">
            <div>
              <div>
                <svg
                  id="1796:228"
                  width="885"
                  height="823"
                  viewBox="0 0 885 823"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flow-diagram"
                  style={{ width: "884px", height: "822px" }}
                >
                  {/* Add your SVG paths and elements here */}
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}