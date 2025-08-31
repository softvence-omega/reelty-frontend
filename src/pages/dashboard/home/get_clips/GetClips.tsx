import { useState } from "react";
import MaxWidthWrapper from "../../../../components/wrappers/MaxWidthWrapper";
import CreateTab from "../../../../components/dashboard/getClips/CreateTab";
import ClipsTab from "../../../../components/dashboard/getClips/ClipsTab";

import { Search } from "lucide-react";


const GetClips = () => {
  const [activeTab, setActiveTab] = useState("create");
  const tab = [
    { id: "create", name: "Create" },
    { id: "clips", name: "Clips" },
  ];

  return (
    <div className="min-h-screen py-6 ">
      <MaxWidthWrapper>
        {/* Header */}
        <div className="text-white flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-10 mb-6 p-4 rounded-xl shadow-md bg-[#18181b]">
          {/* Title + Icon */}
          {/* <div className="flex items-center gap-3">
            <img src={videoicon} alt="Video Icon" className="w-6 h-6" />
              <div className="text-lg md:text-xl font-semibold">
                World's Fastest Car Vs Cheeta
            </div>
          </div> */}

          {/* Search Bar (only if clips tab is active) */}
          {activeTab === "clips" && (
            <div className="flex items-center w-full md:w-auto lg:min-w-[400px] bg-[#27272A] px-2 py-1 rounded text-white/50 text-sm">
              <Search size={18} />
              <input
                type="text"
                placeholder="Find keywords or moments..."
                className="w-full p-2 bg-transparent placeholder:text-white/60 focus:outline-none focus:ring-0 focus:border-none"
              />
            </div>
          )}

          {/* Action Buttons */}
          {/* {activeTab === "clips" && (
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg transition duration-200 w-full md:w-auto justify-center">
                <img src={select} alt="" className="w-5 h-5" />
                Select
              </button>
              <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg transition duration-200 w-full md:w-auto justify-center">
                <img src={filter} alt="" className="w-5 h-5" />
                Filter
              </button>
              <button className="bg-black text-white p-2 rounded-lg transition duration-200 w-full md:w-auto">
                <img src={list} alt="" className="w-5 h-5 mx-auto" />
              </button>
              <button className="bg-black text-white p-2 rounded-lg transition duration-200 w-full md:w-auto">
                <img src={upload} alt="" className="w-5 h-5 mx-auto" />
              </button>
              <button className="bg-black text-white p-2 rounded-lg transition duration-200 w-full md:w-auto">
                <img src={threedot} alt="" className="w-5 h-5 mx-auto" />
              </button>
            </div>
          )} */}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-4 mb-10 mt-5">
          {tab.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`text-white/50 text-sm cursor-pointer font-semibold py-2 px-4 rounded-full transition-all duration-200 ${
                activeTab === item.id ? "bg-black text-white/100" : ""
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
