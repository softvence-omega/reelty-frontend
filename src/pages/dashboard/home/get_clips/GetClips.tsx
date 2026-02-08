import { useEffect, useState } from "react";
import MaxWidthWrapper from "../../../../components/wrappers/MaxWidthWrapper";
import CreateTab from "../../../../components/dashboard/getClips/CreateTab";
import ClipsTab from "../../../../components/dashboard/getClips/ClipsTab";

import { useSelector } from "react-redux";
import type { RootState } from "../../../../store";

const GetClips = () => {
  const [activeTab, setActiveTab] = useState("create");
  const isVideoCreated = useSelector((state: RootState) => state.video.loading);
  
  useEffect(() => {
    if (isVideoCreated == true) {
      setActiveTab("clips")
    }
  }, [isVideoCreated])

  const tab = [
    { id: "create", name: "Create" },
    { id: "clips", name: "Clips" },
  ];

  return (
    <div className="min-h-screen py-6 ">
      <MaxWidthWrapper>
        {/* Tabs */}
        <div className="flex items-center gap-4 mb-10 mt-5">
          {tab.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`text-white/50 text-sm cursor-pointer font-semibold py-2 px-4 rounded-full transition-all duration-200 ${activeTab === item.id ? "bg-black text-white/100" : ""
                }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Create Tab */}
        {activeTab === "create" && <CreateTab />}
        {/* clips tab */}
        {activeTab === "clips" && <ClipsTab />}
      </MaxWidthWrapper>
    </div>
  );
};

export default GetClips;
