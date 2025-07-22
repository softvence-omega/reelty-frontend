import circle from "../../assets/images/homepage/circle.png";
import draganddroppodcast from "../../assets/images/homepage/draganddroppodcast.png";
import podcast from "../../assets/images/homepage/podcast.png";

const HowItWorks = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4  ">
      <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
        How <span className="text-red-500">Reelty</span> Works
      </h2>
      <div className="space-y-15">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 text-white text-center max-w-4xl mx-auto">
          <div className="p-2 flex flex-col justify-center items-center gap-2">
            <button className="border border-[#ED1C24] rounded-full p-3">
              Step 1
            </button>
            <p>Upload your raw market update or listing video</p>
          </div>
          <div className="p-2 flex flex-col justify-center items-center gap-2">
            <button className="border border-[#ED1C24] rounded-full p-3">
              Step 2
            </button>
            <p>Our AI scans for hooks, highlights, and emotion</p>
          </div>
          <div className="p-2 flex flex-col justify-center items-center gap-2">
            <button className="border border-[#ED1C24] rounded-full p-3">
              Step 3
            </button>
            <p>Get short, viral-ready reels with captions and auto-cuts</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
          {/* Left Image */}
          <img
            src={draganddroppodcast}
            alt="Drag and Drop Podcast"
            className="w-full sm:w-1/3 h-auto object-contain"
          />

          {/* Middle Image - Smaller */}
          <img
            src={circle}
            alt="Circle"
            className="w-16 sm:w-20 h-auto object-contain"
          />

          {/* Right Image */}
          <img
            src={podcast}
            alt="Podcast"
            className="w-full sm:w-1/3 h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
