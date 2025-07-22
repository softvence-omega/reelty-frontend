import dropleftimage from "../../assets/images/hero/dropleftimg.png";
import fileupload from "../../assets/images/hero/fileupload.png";
import linkimage from "../../assets/images/hero/linkicon.png";

const Draganddropsection = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-max max-w-5xl bg-black text-white px-2 py-2 rounded-full flex flex-row flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm">
        {/* Left Image */}
        <div className="flex items-center justify-center p-1.5 border border-white/15 rounded-full">
          <img src={dropleftimage} className="w-6 h-6" alt="left-icon" />
        </div>

        {/* File Upload */}
        <div className="flex items-center gap-1.5 py-1.5 px-3 border border-white/15 rounded-full whitespace-nowrap">
          <img src={fileupload} className="w-4 h-4" alt="upload-icon" />
          <p>
            Drag & drop file or <span className="underline">Browse</span>
          </p>
        </div>

        {/* OR */}
        <p className="text-white whitespace-nowrap">Or</p>

        {/* Link Input */}
        <div className="flex items-center gap-1.5 py-1.5 px-3 border border-white/15 rounded-full whitespace-nowrap">
          <img src={linkimage} className="w-4 h-4" alt="link-icon" />
          <p>Drop a video link</p>
        </div>

        {/* Try It Button */}
        <div className="flex justify-center">
          <button className="bg-white text-black text-xs sm:text-sm font-semibold px-5 py-1.5 rounded-full shadow-md hover:bg-gray-100 transition duration-300 whitespace-nowrap">
            Try It
          </button>
        </div>
      </div>
    </div>
  );
};

export default Draganddropsection;
