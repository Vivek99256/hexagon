"use client";

import React, { useState, useEffect } from "react";
import { useRouter,usePathname  } from "next/navigation";

export interface Industry {
  industries: string | null; // Industry name
  sector: string | null; // Sector name
  track?: string | null; // Sub-sector name
  industry: string | null; // Industry type
  jobrole?: string | null; // Job role
}

export default function JobIndustryTree() {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [selectedSubSector, setSelectedSubSector] = useState<string | null>(null);
  const [selectedJobRole, setSelectedJobRole] = useState<string | null>(null);
  const [view, setView] = useState<"task" | "skill" | "jobdescription" | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [jobroletasks, setJobroleTasks] = useState<string[]>([]);
  const [jobroleskills, setJobroleSkills] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("Industry"); // Always set to "Industry"
  const [jobDescription, setJobDescription] = useState<string | null>(null);


  const navigate = useRouter();
  const searchParams = usePathname();

  // Fetch data from the API
  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const response = await fetch("https://erp.triz.co.in/lms_data?table=s_jobrole");
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
  }, [selectedIndustry]);

  // Handle job role click and fetch tasks by default
  const handleJobRoleClick = async (jobrole: string | null | undefined) => {
    if (jobrole) {
      setSelectedJobRole(jobrole); // Set the selected job role
      setView("task"); // Set the default view to "task"

      try {
        const baseUrl = "https://erp.triz.co.in/lms_data";
        
        const params = new URLSearchParams({
            table: "s_jobrole_task"
        });
    
        // Adding filters manually (nested filters need a different approach)
        params.append("filters[jobrole]", jobrole);
    
        const url = `${baseUrl}?${params.toString()}`;
    
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error("Failed to fetch tasks");
        }
    
        const data = await response.json();
        const taskList = data.map((task: { task: string }) => task.task); // Extract task names
        setTasks(taskList); // Store tasks in state
    } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("An unknown error occurred");
        }
    }
    
    }
  };

  // Handle back to Task/Skill selection
  const handleBackToTaskSkill = () => {
    setView(null); // Reset the view
  };

  // Handle back to sub-sectors
  const handleBackToSubSectors = () => {
    setSelectedJobRole(null); // Reset the selected job role
    setSelectedSubSector(null); // Reset the selected sub-sector
    setView(null); // Reset the view
    setTasks([]); // Clear tasks
    setSkills([]); // Clear skills
  };

  // Handle back to sectors
  const handleBackToSectors = () => {
    setSelectedSubSector(null); // Reset the selected sub-sector
    setSelectedSector(null); // Reset the selected sector
    setView(null); // Reset the view
    setTasks([]); // Clear tasks
    setSkills([]); // Clear skills
  };

  // Handle back to job roles
  const handleBackToJobRoles = () => {
    setSelectedJobRole(null); // Reset the selected job role
    setView(null); // Reset the view
    setTasks([]); // Clear tasks
    setSkills([]); // Clear skills
  };

  // Fetch skills when the "Skill" button is clicked
  const handleSkillClick = async (jobrole: string | null | undefined) => {
    // console.log(jobrole);
    if (jobrole) {
      setSelectedJobRole(jobrole); // Set the selected job role
      setView("skill"); // Set the default view to "task"

      try {
        const baseUrl = "https://erp.triz.co.in/lms_data";
        
        const params = new URLSearchParams({
            table: "s_jobrole_skills"
        });
    
        // Adding filters manually (nested filters need a different approach)
        params.append("filters[jobrole]", jobrole);
    
        const url = `${baseUrl}?${params.toString()}`;
    
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error("Failed to fetch tasks");
        }
    
        const data = await response.json();
        // console.log(data);
        const skillList = data.map((skill: { skill: string }) => skill.skill); // Extract task names
        setSkills(skillList); // Store tasks in state
    } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("An unknown error occurred");
        }
    }
    
    }
  };

  const handleJobDescriptionClick = async (jobrole: string | null | undefined) => {
    if (jobrole) {
      setSelectedJobRole(jobrole);
      setView("jobdescription");
  
      try {
        const baseUrl = "https://erp.triz.co.in/lms_data";
        
        // Fetch Tasks
        const taskParams = new URLSearchParams({
          table: "s_jobrole_task",
          "filters[jobrole]": jobrole,
        });
        const taskResponse = await fetch(`${baseUrl}?${taskParams.toString()}`);
        const taskData = await taskResponse.json();
  
        // Fetch Skills
        const skillParams = new URLSearchParams({
          table: "s_jobrole_skills",
          "filters[jobrole]": jobrole,
        });
        const skillResponse = await fetch(`${baseUrl}?${skillParams.toString()}`);
        const skillData = await skillResponse.json();

        // Fetch Job Description
        const jobDescriptionParams = new URLSearchParams({
          table: "s_jobrole",
          "filters[jobrole]": jobrole,
        });
        const jobDescriptionResponse = await fetch(`${baseUrl}?${jobDescriptionParams.toString()}`);
        const jobDescriptionData = await jobDescriptionResponse.json();

        // Store tasks, skills, and job description
        setJobroleTasks(taskData);
        setJobroleSkills(skillData);
        setJobDescription(jobDescriptionData[0]?.description || "No description available.");
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      }
    }
  };
  
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (industries.length === 0) {
    return <div>No industries available</div>;
  }

  // Filter unique industries
  const uniqueIndustries = Array.from(
    new Set(industries.map((industry) => industry.industries))
  );

  // Filter sectors for the selected industry
  // const filteredSectors = industries
  //   .filter((industry) => industry.industries === selectedIndustry)
  //   .map((industry) => industry.sector ?? null)
  //   .filter((sector, index, self) => sector && self.indexOf(sector) === index);

  // Assuming industries is your array of Industry objects
// and selectedIndustry is a state or prop you may have
// and searchParams is a string like "/industry/Services"

// added on 04-04-2025 by uma for onload search department
const explodeRoute = searchParams ? searchParams.split("/") : [];
const industrval = explodeRoute[2] || null; // safely extract route segment
const decodedIndustry = industrval ? decodeURIComponent(industrval) : null; // decode route
// Determine which value to use for filtering
const industryToFilter = selectedIndustry || decodedIndustry;
if(selectedIndustry===null){
  setSelectedIndustry(decodedIndustry);
}
// added on 04-04-2025 by uma for onload search department end

// Now filter the sectors accordingly
const filteredSectors = industries
  .filter((industry) => industry.industries === industryToFilter)
  .map((industry) => industry.sector ?? null)
  .filter((sector, index, self) => sector && self.indexOf(sector) === index);

  // Filter sub-sectors for the selected sector
  const filteredSubSectors = industries
    .filter((industry) => industry.sector === selectedSector)
    .map((industry) => industry.track ?? null)
    .filter((track, index, self) => track && self.indexOf(track) === index);

  // Filter job roles for the selected sub-sector
  const filteredJobRoles = industries
    .filter((industry) => industry.track === selectedSubSector)
    .map((industry) => industry.jobrole ?? null)
    .filter((jobrole, index, self) => jobrole && self.indexOf(jobrole) === index);

  return (
    <div className="relative p-10 bg-white rounded-2xl shadow-sm max-md:p-5">
      <div className="mb-10 text-2xl text-neutral-700 max-sm:text-lg">
        Employee Skill Management
      </div>
      <div
  className="flex items-center mb-5 p-2 rounded-lg shadow-md gap-1"
  style={{
    width: "510px", // Total width of 4 buttons (100px each)
// Center the container
    backgroundColor: "#ffffff", // Optional: Set a background color for the container
  }}
>
  {["Industry", "Department", "Sub-Department", "Job-Role"].map((tab) => (
    <div
      key={tab}
      className={`text-center px-2 py-2 text-sm rounded-md cursor-pointer ${
        activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"
      }`}
      style={{ flex: "0 0 120px" }} // Fixed width for each tab
    >
      {tab}
    </div>
  ))}
</div>
      <div className="flex gap-10 max-md:flex-col">
        {/* Left Section */}
        <div className="p-4 bg-white rounded-2xl shadow w-[350px] max-md:w-full">
          <div className="px-4 py-3 text-2xl text-neutral-700 max-sm:px-3 max-sm:py-2 max-sm:text-xl">
            Industries
          </div>
          <div className="mx-4 mt-0 mb-1 h-px bg-neutral-400"></div>
          <div
            className="px-4 py-0 max-sm:px-3 max-sm:py-0 overflow-y-auto"
            style={{ height: "400px" }} // Fixed height for scrollable content
          >
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-2.5 top-0 h-full w-1 bg-blue-300"></div>
              {uniqueIndustries.map((industry, index) => (
                  industry ? (
                <div key={index} className="flex items-center mb-3 relative">
                  {/* Larger Dot */}
                  <div className="w-6 h-6 bg-gray-300 rounded-full flex-shrink-0"></div>
                  {/* Industry Name */}
                    <div
                    className={`ml-3 text-sm leading-tight text-zinc-800 max-sm:text-base cursor-pointer hover:underline ${
                      selectedIndustry === industry ? "font-bold text-blue-600" : ""
                    }`}
                    onClick={() => {
                      setSelectedIndustry(industry);
                      setSelectedSector(null); // Reset sector when industry changes
                      setSelectedSubSector(null); // Reset sub-sector when industry changes
                      setSelectedJobRole(null); // Reset job role when industry changes
                      setView(null); // Reset view when industry changes
                      setTasks([]); // Clear tasks
                      setSkills([]); // Clear skills
                    }}
                    >
                    {industry}
                    </div>
                </div>
                  ) : null
              ))}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="relative flex-1 max-md:overflow-x-auto">
          {/* Show sectors */}
          {!selectedSector && (
            <div>
              <h2 className="grid-label" style={{ fontSize: "20px", fontWeight: "bold" }}>
                Departments
              </h2>
              <div className="hexagon-grid">
                {filteredSectors.map((sector, index) => (
                  <div
                    key={index}
                    className="hexagon-wrapper cursor-pointer"
                    onClick={() => setSelectedSector(sector)}
                  >
                    <div className="hexagon">
                      <div className="hexagon-content">{sector}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Show sub-sectors */}
          {selectedSector && !selectedSubSector && (
            <div>
              <h2 className="grid-label" style={{ fontSize: "20px", fontWeight: "bold" }}>
                Sub-Departments
              </h2>
              <div className="mb-5 text-right">
                <button
                  onClick={handleBackToSectors}
                  className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Back to Departments
                </button>
              </div>
              <div className="hexagon-grid">
                {filteredSubSectors.map((subSector, index) => (
                  <div
                    key={index}
                    className="hexagon-wrapper cursor-pointer"
                    onClick={() => setSelectedSubSector(subSector)}
                  >
                    <div className="hexagon">
                      <div className="hexagon-content">{subSector}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Show job roles */}
          {selectedSubSector && !selectedJobRole && (
            <div>
              <h2 className="grid-label" style={{ fontSize: "20px", fontWeight: "bold" }}>
                Job Role
              </h2>
              <div className="mb-5 text-right">
                <button
                  onClick={handleBackToSubSectors}
                  className="mb-5 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Back to Sub-Departments
                </button>
              </div>
              <div className="hexagon-grid">
                {filteredJobRoles.map((jobrole, index) => (
                  <div
                    key={index}
                    className="hexagon-wrapper cursor-pointer"
                    onClick={() => handleJobRoleClick(jobrole)}
                  >
                    <div className="hexagon">
                      <div className="hexagon-content">{jobrole}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Show Task and Skill buttons */}
          {selectedJobRole && (
            <div className="mb-5 flex justify-between items-center">
              <div className="flex gap-4">
                <button
                  onClick={() => setView("task")}
                  className={`px-4 py-2 rounded hover:bg-blue-600 ${
                    view === "task" ? "bg-blue-700 text-white" : "bg-blue-500 text-white"
                  }`}
                >
                  Task
                </button>
                <button
                onClick={() => handleSkillClick(selectedJobRole)}
                  className={`px-4 py-2 rounded hover:bg-blue-600 ${
                    view === "skill" ? "bg-blue-700 text-white" : "bg-blue-500 text-white"
                  }`}
                >
                  Skill
                </button>
                <button
      onClick={() => handleJobDescriptionClick(selectedJobRole)}
      className={`px-4 py-2 rounded hover:bg-blue-600 ${
        view === "jobdescription" ? "bg-blue-700 text-white" : "bg-blue-500 text-white"
      }`}
    >
      Job Description
    </button>
              </div>
              <button
                onClick={handleBackToJobRoles}
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Back to Job Roles
              </button>
            </div>
          )}

          {/* Show Task details */}
          {view === "task" && (
            <div>
              <div className="text-xl text-neutral-700 mb-5">
                Task details for {selectedJobRole}
              </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {tasks.length > 0 ? (
                  tasks.map((task, index) => (
                  <div
                  key={index}
                  className="p-4 bg-blue-100 text-blue-900 rounded-lg shadow-md text-center break-words"
                  >
                  {task}
                  </div>
                  ))
                ) : (
                  <div className="text-center col-span-full text-gray-500">
                  No tasks available.
                  </div>
                )}
                </div>
            </div>
          )}

          {/* Show Skill details */}
          {view === "skill" && (
            <div>
              <div className="text-xl text-neutral-700 mb-5">
                Skill details for {selectedJobRole}
              </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {skills.length > 0 ? (
                skills.map((skill, index) => (
                  <div
                  key={index}
                  className="p-4 bg-blue-100 text-blue-900 rounded-lg shadow-md text-center break-words"
                  >
                  {skill}
                  </div>
                ))
                ) : (
                <div className="text-center col-span-full text-gray-500">
                  No skills available.
                </div>
                )}
                </div>
            </div>
          )}

{view === "jobdescription" && (
  <div>
    <div className="text-xl text-neutral-700 mb-5">
      Job Description for {selectedJobRole}
    </div>
    <div className="p-4 bg-blue-100 text-blue-900 rounded-lg shadow-md text-center break-words">
      {jobDescription}
    </div>
  
  <div>
  <div className="mt-5 text-xl text-neutral-700 mb-5">
    Tasks & Skills for {selectedJobRole}
  </div>

  {/* Tasks Section */}
<div className="p-4 bg-red-100 text-red-900 rounded-lg shadow-md mb-4">
  <h2 className="text-lg font-bold mb-2">📝 Tasks</h2>
  {tasks.length > 0 ? (
    <ul className="list-disc pl-4">
      {jobroletasks.map((task, index) => (
        <li key={index} className="mb-2">{task.task}</li>  
      ))}
      
    </ul>
  ) : (
    <p>No tasks available.</p>
  )}
</div>

{/* Skills Section */}
<div className="p-4 bg-blue-100 text-blue-900 rounded-lg shadow-md">
  <h2 className="text-lg font-bold mb-2">🛠️ Required Skills</h2>
  {skills.length > 0 ? (
    <ul className="list-disc pl-4">
      {jobroleskills.map((skill, index) => (
        <li key={index} className="mb-2">{skill.skill}</li>  
      ))}
    </ul>
  ) : (
    <p>No skills available.</p>
  )}
</div>
</div>
</div>
)}

        </div>
      </div>
    </div>
  );
}