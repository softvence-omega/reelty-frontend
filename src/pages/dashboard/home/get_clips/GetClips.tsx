import { useState } from "react";
import MaxWidthWrapper from "../../../../components/wrappers/MaxWidthWrapper";
import videoicon from "../../../../assets/images/dashboard/getclips/videoicon.png";
import CreateTab from "../../../../components/dashboard/getClips/CreateTab";
import ClipsTab from "../../../../components/dashboard/getClips/ClipsTab";
import select from "../../../../assets/images/dashboard/getclips/tickmark.png";
import filter from "../../../../assets/images/dashboard/getclips/filter.png";
import list from "../../../../assets/images/dashboard/getclips/list.png";
import upload from "../../../../assets/images/dashboard/getclips/upload.png";
import threedot from "../../../../assets/images/dashboard/getclips/threedot.png";
import { Search, Ticket } from "lucide-react";

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
        <div className="text-white flex items-center gap-20 mb-6 p-4 rounded-xl shadow-md">
          <div className="flex items-center gap-3">
            <img src={videoicon} alt="Video Icon" className="w-6 h-6" />
            <div className="text-xl font-semibold">
              World's Fastest Car Vs Cheeta
            </div>
          </div>
          {activeTab === "clips" && (
            <div className="text-white/50 flex px-2 rounded-xl bg-[#27272A] items-center text-sm flex-grow">
              <Search size={18} />
              <input
                type="text"
                placeholder="Find keywords or moments..."
                className="w-full p-3 rounded-lg placeholder:text-white/60 focus:outline-none focus:ring-0 focus:border-none"
              />
            </div>
          )}
          {activeTab === "clips" && (
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 bg-black  text-white px-4 py-2 rounded-lg transition duration-200">
                <img src={select} alt="" className="w-5 h-5" />
                Select
              </button>
              <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg transition duration-200">
                <img src={filter} alt="" className="w-5 h-5" />
                Filter
              </button>
              <button className="bg-black text-white p-2 rounded-lg transition duration-200">
                <img src={list} alt="" className="w-5 h-5" />
              </button>
              <button className="bg-black text-white p-2 rounded-lg transition duration-200">
                <img src={upload} alt="" className="w-5 h-5" />
              </button>
              <button className="bg-black text-white p-2 rounded-lg transition duration-200">
                <img src={threedot} alt="" className="w-5 h-5" />
              </button>
            </div>
          )}
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
