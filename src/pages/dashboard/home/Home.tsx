
import backgroundimage from "../../../assets/images/dashboard/home/dashhomebackphoto.png";
import driveicon from "../../../assets/images/dashboard/home/driveicon.png";
import uploadicon from "../../../assets/images/dashboard/home/uploadicon.png";
import homelinkicon from "../../../assets/images/dashboard/home/homelinkicon.png";
import homecircle from "../../../assets/images/dashboard/home/homecircle.png";
import cardimage from "../../../assets/images/dashboard/home/cardimage.png";
import MaxWidthWrapper from "../../../components/wrappers/MaxWidthWrapper";
import { Link } from "react-router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { setVideoLink } from "../../../features/video/videoSlice";
import { useUploadVideoFileMutation } from "../../../features/makeclip/makeclipApi";

const Home = () => {
  const dispatch = useDispatch();
  const videoLink = useSelector((state: RootState) => state.video.videoURL)
  const [activeOption, setActiveOption] = useState<"youtube" | "upload" | "drive">("youtube");
  const [loading, setLoading] = useState(false);
  const [uploadVideoFile] = useUploadVideoFileMutation();

  // File upload handler
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("videoFile", file);

    try {
      setLoading(true);
      const data = await uploadVideoFile({formData}).unwrap();

      console.log("datga", data)
      if (data?.videoUrl) {
        dispatch(setVideoLink(data.videoUrl)); // redux e save
        setActiveOption("upload");
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Placeholder text based on option
  const getPlaceholder = () => {
    if (activeOption === "youtube") return "Drop a YouTube link";
    if (activeOption === "drive") return "Drop a Google Drive video link";
    if (activeOption === "upload") return "Uploaded file link";
  };
  return (
    <MaxWidthWrapper>
      <div className="min-h-screen relative w-full py-10 px-4 md:px-0 flex flex-col items-center justify-center">
        {/* Background image (only for md and up) */}
        <img
          src={backgroundimage}
          alt="Background Design"
          className="absolute hidden md:block w-5/12 top-2 left-1/2 -translate-x-1/2 z-0"
        />

        <div className="relative z-10 w-full md:w-6/12 rounded-3xl bg-black p-8 md:p-10 flex flex-col items-start gap-6">
          {/* Center Circle */}
          <img
            src={homecircle}
            alt="Upload Circle"
            className="absolute top-[-1.75rem] left-1/2 -translate-x-1/2"
          />

          {/* Upload Options */}
          <div className="flex items-center gap-5">
            {/* Upload */}
            <label
              htmlFor="fileUpload"
              className={`flex items-center gap-2 cursor-pointer ${activeOption === "upload" ? "text-white" : "text-white/50"
                }`}
            >
              <img src={uploadicon} alt="Upload" />
              <span>Upload</span>
              <input
                id="fileUpload"
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>

            {/* Google Drive */}
            <div
              className={`flex items-center gap-2 cursor-pointer ${activeOption === "drive" ? "text-white" : "text-white/50"
                }`}
              onClick={() => setActiveOption("drive")}
            >
              <img src={driveicon} alt="Google Drive" />
              <span>Google Drive</span>
            </div>

            {/* YouTube (default) */}
            <div
              className={`flex items-center gap-2 cursor-pointer ${activeOption === "youtube" ? "text-white" : "text-white/50"
                }`}
              onClick={() => setActiveOption("youtube")}
            >
              <img src={homelinkicon} alt="YouTube" />
              <span>YouTube</span>
            </div>
          </div>

          {/* Input Field */}
          <div className="rounded-full bg-[#27272A] w-full p-2 px-4 text-white/50 flex items-center gap-4">
            <img src={homelinkicon} alt="Link Icon" />
            <input
              type="text"
              placeholder={getPlaceholder()}
              value={videoLink}
              onChange={(e) => dispatch(setVideoLink(e.target.value))}
              className="bg-transparent w-full outline-none text-white placeholder:text-white/50"
            />
          </div>

          {/* CTA Button */}
          <Link
            to={`/dashboard/get-clips?link=${encodeURIComponent(videoLink)}`}
            className="rounded-full cursor-pointer bg-white w-full p-2 text-black font-semibold text-center hover:bg-gray-100 transition"
          >
            <button disabled={!videoLink || loading} className="w-full">
              {loading ? "Uploading..." : "Get Clips"}
            </button>
          </Link>
        </div>

        {/* Tabs and Cards */}
        <div className="w-full mt-10 z-10 flex flex-col gap-5">
          {/* Tabs */}
          <div className="flex items-center justify-between text-white">
            <div className="flex gap-4">
              <button className="py-2 px-4 rounded-xl bg-black text-white border border-gray-700">
                Recent Projects (2)
              </button>
              <button className="py-2 px-4 rounded-xl bg-black text-white border border-gray-700">
                Saved Projects (0)
              </button>
            </div>
            <div className="text-white/60 text-sm">
              <span>0 GB</span> / <span>100 GB</span>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* card */}
            <div className="relative bg-black rounded-lg overflow-hidden">
              {/* Image */}
              <div className="relative">
                <img src={cardimage} alt="Project Preview" className="w-full object-cover" />
                <div className="absolute bottom-0 w-full py-1 text-center text-white/50 bg-black/50 backdrop-blur-sm text-sm">
                  4 days before expiring
                </div>
              </div>

              {/* "New" Badge */}
              <div className="absolute top-2 right-2 bg-black text-white px-2 py-1 rounded text-xs">
                New
              </div>

              {/* Card Content */}
              <div className="p-3 flex flex-col gap-2">
                <h3 className="text-white text-sm">I my name is shafi miazi...</h3>
                <p className="text-white/40 text-xs">ClipBasic</p>
              </div>
            </div>
            {/* card */}
            <div className="relative bg-black rounded-lg overflow-hidden">
              {/* Image */}
              <div className="relative">
                <img src={cardimage} alt="Project Preview" className="w-full object-cover" />
                <div className="absolute bottom-0 w-full py-1 text-center text-white/50 bg-black/50 backdrop-blur-sm text-sm">
                  4 days before expiring
                </div>
              </div>

              {/* "New" Badge */}
              <div className="absolute top-2 right-2 bg-black text-white px-2 py-1 rounded text-xs">
                New
              </div>

              {/* Card Content */}
              <div className="p-3 flex flex-col gap-2">
                <h3 className="text-white text-sm">I my name is shafi miazi...</h3>
                <p className="text-white/40 text-xs">ClipBasic</p>
              </div>
            </div>
            {/* card */}
            <div className="relative bg-black rounded-lg overflow-hidden">
              {/* Image */}
              <div className="relative">
                <img src={cardimage} alt="Project Preview" className="w-full object-cover" />
                <div className="absolute bottom-0 w-full py-1 text-center text-white/50 bg-black/50 backdrop-blur-sm text-sm">
                  4 days before expiring
                </div>
              </div>

              {/* "New" Badge */}
              <div className="absolute top-2 right-2 bg-black text-white px-2 py-1 rounded text-xs">
                New
              </div>

              {/* Card Content */}
              <div className="p-3 flex flex-col gap-2">
                <h3 className="text-white text-sm">I my name is shafi miazi...</h3>
                <p className="text-white/40 text-xs">ClipBasic</p>
              </div>
            </div>
            {/* card */}
            <div className="relative bg-black rounded-lg overflow-hidden">
              {/* Image */}
              <div className="relative">
                <img src={cardimage} alt="Project Preview" className="w-full object-cover" />
                <div className="absolute bottom-0 w-full py-1 text-center text-white/50 bg-black/50 backdrop-blur-sm text-sm">
                  4 days before expiring
                </div>
              </div>

              {/* "New" Badge */}
              <div className="absolute top-2 right-2 bg-black text-white px-2 py-1 rounded text-xs">
                New
              </div>

              {/* Card Content */}
              <div className="p-3 flex flex-col gap-2">
                <h3 className="text-white text-sm">I my name is shafi miazi...</h3>
                <p className="text-white/40 text-xs">ClipBasic</p>
              </div>
            </div>
            {/* card */}
            <div className="relative bg-black rounded-lg overflow-hidden">
              {/* Image */}
              <div className="relative">
                <img src={cardimage} alt="Project Preview" className="w-full object-cover" />
                <div className="absolute bottom-0 w-full py-1 text-center text-white/50 bg-black/50 backdrop-blur-sm text-sm">
                  4 days before expiring
                </div>
              </div>

              {/* "New" Badge */}
              <div className="absolute top-2 right-2 bg-black text-white px-2 py-1 rounded text-xs">
                New
              </div>

              {/* Card Content */}
              <div className="p-3 flex flex-col gap-2">
                <h3 className="text-white text-sm">I my name is shafi miazi...</h3>
                <p className="text-white/40 text-xs">ClipBasic</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Home;
