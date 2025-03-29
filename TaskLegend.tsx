import React from "react";

function TaskLegend() {
  return (
    <aside className="absolute top-[60px] right-[30px] flex flex-col gap-4 bg-white p-4 shadow-md rounded-lg max-md:static max-md:mb-4">
      {/* Task Didn't Start */}
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 bg-red-500 rounded-full" />
        <p className="text-black text-sm">Task Didn't Started</p>
      </div>

      {/* Continue Task */}
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 bg-blue-400 rounded-full" />
        <p className="text-black text-sm">Continue Task</p>
      </div>

      {/* Completed Task */}
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 bg-green-500 rounded-full" />
        <p className="text-black text-sm">Completed Task</p>
      </div>

      {/* Proficiency Level */}
      <div className="flex items-center gap-2">
        <p className="text-black text-lg font-semibold">5/5</p>
        <p className="text-black text-sm">
          Number reflects the<br/> proficiency level to<br/> complete that particular Task
        </p>
      </div>
    </aside>
  );
}

export default TaskLegend;
