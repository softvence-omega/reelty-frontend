import { Link } from "react-router";
import MaxWidthWrapper from "../../../components/wrappers/MaxWidthWrapper";
import uploadicon from "../../../assets/images/dashboard/assetlibrary/assetuploadicon.png";
import { useState } from "react";

const AssetLibrary = () => {
  const [activeTab, setActiveTab] = useState("all");
  const tab = [
    { id: "all", name: "All" },
    {
      id: "images",
      name: "Images",
    },
    {
      id: "videos",
      name: "Videos",
    },
    {
      id: "audio",
      name: "Audio",
    },
  ];
  return (
    <MaxWidthWrapper>
      <div className="text-white flex flex-col gap-10">
        {/* title and info */}
        <div>
          <h1 className="text-2xl font-semibold mb-2">Asset library</h1>
          <p className="text-white/50 text-sm">
            Only Pro accounts may use the Brand Kit. Upgrade now to build your
            Brand Kit with custom fonts, intro & outro cards, B-Roll, and more.
            <Link to={"/"} className="underline">
              Upgrade to Pro now
            </Link>
          </p>
        </div>
        {/* Fonts */}
        <div>
          <h2 className="text-xl font-semibold mb-4"> Fonts(0/0)</h2>
          <div className="flex items-center justify-center h-32 w-60 rounded border border-gray-600">
            <div className="flex flex-col items-center gap-2">
              <img src={uploadicon} alt="" />
              <p className="text-sm text-white/50">Add or drag file here</p>
            </div>
          </div>
        </div>
        {/* Media */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold mb-4"> Media</h2>
          <div className="flex items-center max-w-xl gap-4 mb-4 ">
            {tab.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`text-center flex-1 py-2 px-4 font-medium ${
                  activeTab === item.id
                    ? "border-b-2 border-white/70 bg-black text-white/100"
                    : "text-white/50 "
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-3">
          {
            activeTab === "all" && (
                  <div className="flex items-center justify-center h-32 w-60 rounded border border-gray-600">
              <div className="flex flex-col items-center gap-2">
                <img src={uploadicon} alt="" />
                <p className="text-sm text-white/50">Add or drag file here</p>
              </div>
            </div>
            )
          }
          {
            activeTab === "images" && (
                  <div className="flex items-center justify-center h-32 w-60 rounded border border-gray-600">
              <div className="flex flex-col items-center gap-2">
                <img src={uploadicon} alt="" />
                <p className="text-sm text-white/50">Add or drag file here</p>
              </div>
            </div>
            )
          }
          {
            activeTab === "videos" && (
                  <div className="flex items-center justify-center h-32 w-60 rounded border border-gray-600">
              <div className="flex flex-col items-center gap-2">
                <img src={uploadicon} alt="" />
                <p className="text-sm text-white/50">Add or drag file here</p>
              </div>
            </div>
            )
          }
          {
            activeTab === "audio" && (
                  <div className="flex items-center justify-center h-32 w-60 rounded border border-gray-600">
              <div className="flex flex-col items-center gap-2">
                <img src={uploadicon} alt="" />
                <p className="text-sm text-white/50">Add or drag file here</p>
              </div>
            </div>
            )
          }
            <p className="text-white">Upload video/image/audio</p>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default AssetLibrary;
