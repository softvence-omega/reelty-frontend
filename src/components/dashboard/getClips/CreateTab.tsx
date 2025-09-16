

import cardimage from "../../../assets/images/dashboard/home/cardimage.png";
import link from "../../../assets/images/dashboard/home/homelinkicon.png";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { clearVideoLink, setVideoGenerate } from "../../../features/video/videoSlice";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useGetTemplatesListQuery } from "../../../features/template/templateApi";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { toast } from "react-toastify";



const languages = [
  { value: "en", label: "English" },
  { value: "ar", label: "Arabic (عربي)" },
  { value: "bg", label: "Bulgarian (български)" },
  { value: "hr", label: "Croatian (Hrvatski)" },
  { value: "cs", label: "Czech (čeština)" },
  { value: "da", label: "Danish (Dansk)" },
  { value: "nl", label: "Dutch (Nederlands)" },
  { value: "fi", label: "Finnish (Suomi)" },
  { value: "fr", label: "French (Français)" },
  { value: "de", label: "German (Deutsch)" },
  { value: "el", label: "Greek (Ελληνικά)" },
  { value: "iw", label: "Hebrew (עִברִית)" },
  { value: "hi", label: "Hindi (हिंदी)" },
  { value: "hu", label: "Hungarian (Magyar nyelv)" },
  { value: "id", label: "Indonesian (Bahasa Indonesia)" },
  { value: "it", label: "Italian (Italiano)" },
  { value: "ja", label: "Japanese (日本語)" },
  { value: "ko", label: "Korean (한국어)" },
  { value: "lt", label: "Lithuanian (Lietuvių kalba)" },
  { value: "mal", label: "Malay (Melayu)" },
  { value: "zh", label: "Mandarin - Simplified (简体)" },
  { value: "zh-TW", label: "Mandarin - Traditional (繁體)" },
  { value: "no", label: "Norwegian (Norsk)" },
  { value: "pl", label: "Polish (Polski)" },
  { value: "pt", label: "Portuguese (Português)" },
  { value: "ro", label: "Romanian (Limba română)" },
  { value: "ru", label: "Russian (Pусский)" },
  { value: "sr", label: "Serbian (Српски)" },
  { value: "sk", label: "Slovak (Slovenský)" },
  { value: "es", label: "Spanish (Español)" },
  { value: "sv", label: "Swedish (Svenska)" },
  { value: "tr", label: "Turkish (Türkçe)" },
  { value: "uk", label: "Ukrainian (Україна)" },
  { value: "vi", label: "Vietnamese (Tiếng Việt)" },
];

const clipLengthOptions = [
  { value: 0, label: "Auto" },
  { value: 1, label: "<30 sec" },
  { value: 2, label: "30-60 sec" },
  { value: 3, label: "60-90 sec" },
  { value: 4, label: "90s-3 min" },
];

const renderPreview = (videoLink: string) => {

  if (videoLink.includes("youtube.com") || videoLink.includes("youtu.be")) {
    const videoId =
      videoLink.split("v=")[1]?.split("&")[0] || videoLink.split("/").pop();
    return (
      <iframe
        width="100%"
        height="250"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="rounded-xl"
      />
    );
  } else if (videoLink.includes("drive.google.com")) {
    const match = videoLink.match(/\/d\/(.*?)\//);
    const fileId = match ? match[1] : null;
    if (fileId) {
      return (
        <iframe
          src={`https://drive.google.com/file/d/${fileId}/preview`}
          width="100%"
          height="250"
          allow="autoplay"
          className="rounded-xl"
        />
      );
    }
  } else {
    return <video src={videoLink} controls className="w-full rounded-xl" />;
  }
};
type VideoSource = "youtube" | "googleDrive" | "cloudinary" | "unknown";

const getVideoSource = (url: string): VideoSource => {
  if (!url) return "unknown";

  // Check YouTube
  if (
    url.includes("youtube.com") ||
    url.includes("youtu.be")
  ) {
    return "youtube";
  }

  // Check Google Drive
  if (url.includes("drive.google.com")) {
    return "googleDrive";
  }

  // Check Cloudinary
  if (url.includes("res.cloudinary.com")) {
    return "cloudinary";
  }

  // Unknown source
  return "unknown";
};

interface ClipRequestBody {
  url: string;
  videoType: number;
  langCode?: string;
  auth_token: string;
  clipLength?: number;
  maxClipNumber?: number;
  templateId?: string | null;
  prompt?: string;
}

const CreateTab = () => {
  const [loading, setLoading] = useState(false);
  const [clipLength, setClipLength] = useState<number>(0); // default
  const [clipsCount, setClipsCount] = useState<number>(2);  // default value  
  const [selectedLang, setSelectedLang] = useState("en");
  const [prompt, setPrompt] = useState("");
  const [activeTab, setActiveTab] = useState<"quick" | "my">("quick");
  const { data } = useGetTemplatesListQuery({ page: 1, limit: 20 });
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const videoLink = useSelector((state: RootState) => state.video.videoURL);

  const templates =
    data?.data?.items.map((item: any) => ({
      id: item.id,
      aspect: item.aspectRatio,
      platform: item.platform,
      title: item.templateName,
      selected: item.isDefault,
      overlayLogo: item.overlayLogo,
      introVideo: item.introVideo,
      outroVideo: item.outroVideo,
    })) || [];









  const handleGetClips = async () => {

    if (!videoLink) {
      toast.error("Please upload or provide a video link.");
      return;
    }

    if (!selectedTemplateId) {
      toast.error("Please select a template.");
      return;
    }
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("You must be logged in to generate clips.");
      return;
    }


    try {
      setLoading(true); // Start loading

      // detect video source (your helper function)
      const videoSource = getVideoSource(videoLink);



      const requestBody: ClipRequestBody = {
        url: videoLink,
        videoType: videoSource === "youtube" ? 2 : videoSource === "googleDrive" ? 3 : videoSource === "cloudinary" ? 1 : 1,
        langCode: selectedLang,
        auth_token: token,
        clipLength: clipLength === 0 ? 0 : clipLength, // if auto, don't send
        maxClipNumber: clipsCount,
        templateId: selectedTemplateId.toString(),
        prompt: prompt || "", // Add prompt input state if needed
      };


      const res = await fetch(import.meta.env.VITE_AI_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await res.json();

      if (data.status === "done") {
        toast.success("Clips generated successfully!");
        dispatch(setVideoGenerate(true))
        console.log("🎬 Generated Clips:", data.clips);
        // you can set clips in state if needed: setGeneratedClips(data.clips)
      } else {
        toast.error(data.error || "Clip generation is still in progress or failed.");
      }
    } catch (error: any) {
      console.error("❌ Error generating clips:", error);
      toast.error("Failed to generate clips. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };







  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Left Side */}
      <div className="md:w-5/12 w-full bg-[#1a1a1a] p-4 rounded-2xl">
        <div className="flex items-center gap-2 mb-4  bg-[#0d0d0d] rounded-full py-2 px-4">
          <img src={link} alt="" />
          <input
            type="text"
            value={videoLink}
            readOnly
            className="w-full text-white/50 text-xs px-3 py-2 rounded-md"
          />
          <button
            onClick={() => {
              dispatch(clearVideoLink());
              navigate("/dashboard/home");
            }}
            className="underline cursor-pointer text-white/50 text-xs"
          >
            Remove
          </button>
        </div>

        <div className="flex justify-between text-white/50 text-sm mb-3">
          <div>
            Speech language:{" "}
            <span className="text-white/80">
              <select
                className="bg-[#1a1a1a] text-white p-2 rounded-md text-sm"
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </span>
          </div>
        </div>

        <div className="relative mb-4">
          {videoLink ? (
            renderPreview(videoLink)
          ) : (
            <img src={cardimage} alt="Thumbnail" className="w-full rounded-xl" />
          )}
        </div>

        <button
          onClick={handleGetClips}
          disabled={loading}
          className="w-full bg-white cursor-pointer text-black font-semibold py-2 rounded-full flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              Generating...
            </>
          ) : (
            "Get Clips"
          )}
        </button>


        {/* <p className="text-white/50 text-center text-[10px] mt-3 leading-snug">
          Using video you don’t own may violate copyright laws. By continuing,
          you confirm this is your own original content.{" "}
        </p>

        <div className="flex items-center justify-center">
          <div className="flex gap-2 mt-1 text-center text-white text-[10px] underline">
            <button>Terms and Conditions</button>
            <button>Privacy Policy</button>
          </div>
        </div> */}
      </div>

      {/* Right Side */}
      <div className="flex-1 bg-black rounded-3xl p-4 md:p-6 flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 justify-baseline gap-4">
          {/* Clip Length */}
          <div className="text-white text-sm flex items-center gap-3">
            <label className="block mb-1 text-white/50">Clip Length</label>
            <select
              className="bg-[#1a1a1a] text-white p-2 rounded-md text-sm"
              value={clipLength}
              onChange={(e) => setClipLength(Number(e.target.value))}
            >
              {clipLengthOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>



          {/* Clips */}
          <div className="text-white text-sm flex items-center gap-3">
            <label className="block mb-1 text-white/50">Clips</label>
            <input
              type="range"
              min={1}
              max={100}
              value={clipsCount}
              onChange={(e) => setClipsCount(Number(e.target.value))}
              className="w-full h-2 rounded-lg accent-red-500"


            />
            <div className="flex items-center justify-center p-3 rounded bg-[#27272A]">
              {clipsCount}
            </div>
          </div>
        </div>

        <div className="w-full  mx-auto my-1">

          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            id="prompt"
            name="prompt"
            placeholder="Enter your prompt..."
            className="w-full px-4 py-2 border text-white border-gray-300/30 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        {/* Tabs */}
        <div className="w-full max-w-full overflow-hidden">
          <div className="flex gap-4 mb-7 mt-7 text-white text-sm">

            <button
              onClick={() => setActiveTab("my")}
              className={`font-semibold ${activeTab === "my" ? "text-white" : "text-white/50"
                }`}
            >
              My templates
            </button>
          </div>



          <Swiper
            slidesPerView={5}
            spaceBetween={20}
            // pagination={{ clickable: true }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {templates.map((tpl: any) => (
              <SwiperSlide key={tpl.id}>
                <div
                  className={`bg-[#1a1a1a] rounded-md overflow-hidden relative cursor-pointer transition-all ${selectedTemplateId === tpl.id ? "border-2 border-red-500" : ""
                    }`}
                  onClick={() => setSelectedTemplateId(tpl.id)}
                >
                  {tpl.introVideo || tpl.outroVideo ? (
                    <video
                      src={tpl.introVideo || tpl.outroVideo}
                      autoPlay
                      muted
                      loop
                      className="w-full h-36 object-cover"
                    />
                  ) : (
                    <img
                      src={cardimage}
                      alt={tpl.title}
                      className="w-full h-36 object-cover"
                    />
                  )}

                  <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                    {tpl.aspect}
                  </div>
                  <div className="absolute top-2 right-2  text-white text-[10px] px-2 py-0.5 rounded-full">
                    <span className="bg-gray-800 text-white px-2 py-0.5 rounded-full">
                      {tpl.platform}
                    </span>
                  </div>

                  <div className="p-2   w-full ">
                    <p className="text-white text-xs font-medium truncate">
                      {tpl.title}
                    </p>

                  </div>
                </div>
              </SwiperSlide>



            ))}
          </Swiper>

        </div>
        {/* 
        <div className="text-white text-sm flex items-center gap-2 mt-2">
          <label>Choose aspect ratio</label>
          <select className="bg-[#1a1a1a] text-white p-2 rounded-md text-sm">
            <option>9:16</option>
          </select>
        </div> */}

        {/* <button className="mt-4 bg-[#1a1a1a] text-white py-2 rounded-md text-sm self-start px-4">
          Save settings above as default
        </button> */}
      </div>
    </div>
  );
};

export default CreateTab;
