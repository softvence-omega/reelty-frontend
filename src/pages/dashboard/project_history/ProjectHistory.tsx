import { useState } from "react";
import MaxWidthWrapper from "../../../components/wrappers/MaxWidthWrapper";
import RecentProject from "./RecentProject";
import SavedProject from "./SavedProject";
import ClipsTab from "../../../components/dashboard/getClips/ClipsTab";

const ProjectHistory = () => {
  const [totalDuration, setTotalDuration] = useState(0);
  const [activeTab, setActiveTab] = useState<"recent" | "saved" | "clips">("recent");

  return (
    <div>
      <MaxWidthWrapper>
        {/* Tabs and Cards */}
        <div className="w-full mt-8 md:mt-10 z-10 flex flex-col gap-5">
          {/* Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-white space-y-4 sm:space-y-0">
            <div className="flex gap-3 md:gap-4 overflow-x-auto pb-2 sm:pb-0 sm:overflow-visible">
              <button
                onClick={() => setActiveTab("recent")}
                className={`text-center cursor-pointer flex-shrink-0 py-2 px-3 md:px-4 font-medium w-32 md:w-40 text-sm md:text-base
                  ${activeTab === "recent"
                    ? "border-b-2 border-white/70 bg-black text-white"
                    : "text-white/50"
                  }`}
              >
                Recent Projects
              </button>
              <button
                onClick={() => setActiveTab("saved")}
                className={`text-center cursor-pointer flex-shrink-0 py-2 px-3 md:px-4 font-medium w-32 md:w-40 text-sm md:text-base
                  ${activeTab === "saved"
                    ? "border-b-2 border-white/70 bg-black text-white"
                    : "text-white/50"
                  }`}
              >
                Saved Projects
              </button>
              <button
                onClick={() => setActiveTab("clips")}
                className={`text-center cursor-pointer flex-shrink-0 py-2 px-3 md:px-4 font-medium w-32 md:w-40 text-sm md:text-base
                  ${activeTab === "clips"
                    ? "border-b-2 border-white/70 bg-black text-white"
                    : "text-white/50"
                  }`}
              >
                Clips
              </button>
            </div>
            {
              activeTab !== "clips" && (
                <div className="text-white/60 text-sm text-center sm:text-right pt-2 sm:pt-0">
                  Total Duration: <span className="font-medium">{totalDuration}</span>
                </div>
              )
            }
          </div>

          <div className="mt-4 md:mt-6">
            {activeTab === "recent" && <RecentProject setTotalDuration={setTotalDuration} />}
            {activeTab === "saved" && <SavedProject setTotalDuration={setTotalDuration} />}
            {activeTab === "clips" && <ClipsTab />}
          </div>

        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default ProjectHistory;