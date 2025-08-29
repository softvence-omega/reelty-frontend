import { useState } from "react";
import MaxWidthWrapper from "../../../components/wrappers/MaxWidthWrapper";
import RecentProject from "./RecentProject";
import SavedProject from "./SavedProject";

const ProjectHistory = () => {
  const [totalDuration, setTotalDuration] = useState(0);
  const [activeTab, setActiveTab] = useState<"recent" | "saved">("recent");



  return (
    <div>
      <MaxWidthWrapper>
        {/* Tabs and Cards */}
        <div className="w-full mt-10 z-10 flex flex-col gap-5">
          {/* Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-white space-y-4 sm:space-y-0">
            <div className="flex gap-4 overflow-x-auto sm:overflow-visible">
              <button
                onClick={() => setActiveTab("recent")}
                className={`text-center cursor-pointer flex-shrink-0 py-2 px-4 font-medium w-40
        ${activeTab === "recent"
                    ? "border-b-2 border-white/70 bg-black text-white"
                    : "text-white/50"
                  }`}
              >
                Recent Projects
              </button>
              <button
                onClick={() => setActiveTab("saved")}
                className={`text-center cursor-pointer flex-shrink-0 py-2 px-4 font-medium w-40
        ${activeTab === "saved"
                    ? "border-b-2 border-white/70 bg-black text-white"
                    : "text-white/50"
                  }`}
              >
                Saved Projects
              </button>
            </div>
            <div className="text-white/60 text-sm text-center sm:text-right">
              Total Duration: <span>{totalDuration}</span>
            </div>
          </div>


          <div>
            {activeTab === "recent" ? <RecentProject setTotalDuration={setTotalDuration} /> : <SavedProject setTotalDuration={setTotalDuration} />}
          </div>


        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default ProjectHistory;