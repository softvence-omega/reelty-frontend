

// import cardimage from "../../../assets/images/dashboard/home/cardimage.png";
// import link from "../../../assets/images/dashboard/home/homelinkicon.png";

// // import crediticon from "../../../assets/images/dashboard/getclips/crediticon.png"
// // import detailsicon from "../../../assets/images/dashboard/getclips/detailsicon.png";
// import { useDispatch, useSelector } from "react-redux";
// import type { RootState } from "../../../store";
// import { clearVideoLink } from "../../../features/video/videoSlice";
// import { useNavigate } from "react-router";
// import { useState } from "react";
// import { useGetTemplatesListQuery } from "../../../features/template/templateApi";

// const languages = [
//   { value: "en", label: "English" },
//   { value: "ar", label: "Arabic (عربي)" },
//   { value: "bg", label: "Bulgarian (български)" },
//   { value: "hr", label: "Croatian (Hrvatski)" },
//   { value: "cs", label: "Czech (čeština)" },
//   { value: "da", label: "Danish (Dansk)" },
//   { value: "nl", label: "Dutch (Nederlands)" },
//   { value: "fi", label: "Finnish (Suomi)" },
//   { value: "fr", label: "French (Français)" },
//   { value: "de", label: "German (Deutsch)" },
//   { value: "el", label: "Greek (Ελληνικά)" },
//   { value: "iw", label: "Hebrew (עִברִית)" },
//   { value: "hi", label: "Hindi (हिंदी)" },
//   { value: "hu", label: "Hungarian (Magyar nyelv)" },
//   { value: "id", label: "Indonesian (Bahasa Indonesia)" },
//   { value: "it", label: "Italian (Italiano)" },
//   { value: "ja", label: "Japanese (日本語)" },
//   { value: "ko", label: "Korean (한국어)" },
//   { value: "lt", label: "Lithuanian (Lietuvių kalba)" },
//   { value: "mal", label: "Malay (Melayu)" },
//   { value: "zh", label: "Mandarin - Simplified (简体)" },
//   { value: "zh-TW", label: "Mandarin - Traditional (繁體)" },
//   { value: "no", label: "Norwegian (Norsk)" },
//   { value: "pl", label: "Polish (Polski)" },
//   { value: "pt", label: "Portuguese (Português)" },
//   { value: "ro", label: "Romanian (Limba română)" },
//   { value: "ru", label: "Russian (Pусский)" },
//   { value: "sr", label: "Serbian (Српски)" },
//   { value: "sk", label: "Slovak (Slovenský)" },
//   { value: "es", label: "Spanish (Español)" },
//   { value: "sv", label: "Swedish (Svenska)" },
//   { value: "tr", label: "Turkish (Türkçe)" },
//   { value: "uk", label: "Ukrainian (Україна)" },
//   { value: "vi", label: "Vietnamese (Tiếng Việt)" },
// ];

// const renderPreview = (videoLink: string) => {
//   if (videoLink.includes("youtube.com") || videoLink.includes("youtu.be")) {
//     // extract video id
//     const videoId = videoLink.split("v=")[1]?.split("&")[0] || videoLink.split("/").pop();
//     return (
//       <iframe
//         width="100%"
//         height="250"
//         src={`https://www.youtube.com/embed/${videoId}`}
//         title="YouTube video player"
//         frameBorder="0"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//         allowFullScreen
//         className="rounded-xl"
//       />
//     );
//   } else if (videoLink.includes("drive.google.com")) {
//     // extract file id
//     const match = videoLink.match(/\/d\/(.*?)\//);
//     const fileId = match ? match[1] : null;
//     if (fileId) {
//       return (
//         <iframe
//           src={`https://drive.google.com/file/d/${fileId}/preview`}
//           width="100%"
//           height="250"
//           allow="autoplay"
//           className="rounded-xl"
//         />
//       );
//     }
//   } else {
//     // fallback for uploaded files
//     return <video src={videoLink} controls className="w-full rounded-xl" />;
//   }
// };



// const CreateTab = () => {
//   const [selectedLang, setSelectedLang] = useState("en");
//   const { data, isLoading } = useGetTemplatesListQuery({ page: 1, limit: 20 });

//   const dispatch = useDispatch()
//   const navigate = useNavigate();

//   const videoLink = useSelector((state: RootState) => state.video.videoURL)


//   // Helper: YouTube thumbnail URL ber kore
//   // const getYoutubeThumbnail = (url: string) => {
//   //   const regex = /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&#]+)/;
//   //   const match = url.match(regex);
//   //   return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
//   // };

//     // Map backend data to frontend template structure
//   const templates =
//     data?.data?.items.map((item: any) => ({
//       id: item.id,
//       aspect: item.aspectRatio,
//       title: item.templateName,
//       selected: item.isDefault,
//       overlayLogo: item.overlayLogo,
//       introVideo: item.introVideo,
//       outroVideo: item.outroVideo,
//     })) || [];

//   return (
//     <div className="flex flex-col md:flex-row gap-6">
//       {/* Left Side */}
//       <div className="md:w-5/12 w-full bg-[#1a1a1a] p-4 rounded-2xl">
//         {/* <div className="text-white text-sm mb-2">313.01 × 36</div> */}
//         <div className="flex items-center gap-2 mb-4  bg-[#0d0d0d] rounded-full py-2 px-4">
//           <img src={link} alt="" />
//           <input
//             type="text"
//             value={videoLink}
//             readOnly
//             className="w-full text-white/50 text-xs px-3 py-2 rounded-md"
//           />
//           <button onClick={() => {
//             dispatch(clearVideoLink())
//             navigate('/dashboard/home')
//           }} className="underline cursor-pointer text-white/50 text-xs">
//             Remove
//           </button>
//         </div>

//         <div className="flex justify-between text-white/50 text-sm mb-3">
//           <div>
//             Speech language:{" "}
//             <span className="text-white/80">
//               <select
//                 className="bg-[#1a1a1a] text-white p-2 rounded-md text-sm"
//                 value={selectedLang}
//                 onChange={(e) => setSelectedLang(e.target.value)}
//               >
//                 {languages.map((lang) => (
//                   <option key={lang.value} value={lang.value}>
//                     {lang.label}
//                   </option>
//                 ))}
//               </select>
//             </span>

//           </div>
//           {/* <div className="flex items-center gap-2">
//             Credit usage:{" "}
//             <span>
//               <img src={crediticon} alt="" />
//             </span>{" "}
//             <span className="text-white/80">20</span>
//             <span>
//               <img src={detailsicon} alt="" />
//             </span>
//           </div> */}
//         </div>
//         <div className="relative mb-4">
//           {videoLink ? (
//             renderPreview(videoLink)
//           ) : (
//             <img src={cardimage} alt="Thumbnail" className="w-full rounded-xl" />
//           )}
//         </div>






//         <button className="w-full bg-white text-black font-semibold py-2 rounded-full">
//           Get Clips
//         </button>

//         <p className="text-white/50 text-center text-[10px] mt-3 leading-snug">
//           Using video you don’t own may violate copyright laws. By
//           continuing, you confirm this is your own original content.{" "}
//         </p>

//         <div className="flex items-center justify-center">
//           <div className="flex gap-2 mt-1 text-center text-white text-[10px] underline">
//             <button>Terms and Conditions</button>
//             <button>Privacy Policy</button>
//           </div>
//         </div>
//       </div>

//       {/* Right Side */}
//       <div className="flex-1 bg-black rounded-3xl p-4 md:p-6 flex flex-col gap-4">
//         <div className="grid grid-cols-1 md:grid-cols-3  justify-baseline gap-4">

//           <div className="text-white text-sm flex items-center gap-3">
//             <label className="block mb-1 text-white/50">
//               Clip Length
//             </label>
//             <select className="bg-[#1a1a1a] text-white p-2 rounded-md text-sm">
//               <option>&lt;30s</option>
//             </select>
//           </div>
//           <div className="text-white text-sm  flex items-center gap-3">
//             <label className="block mb-1 text-white/50">Clips</label>
//             <input
//               type="range"
//               min="1"
//               max="10"
//               value="2"
//               className="w-full"
//             />
//             <div className="flex items-center justify-center p-3  rounded bg-[#27272A]">
//               2
//             </div>
//           </div>
//         </div>

//         <div>
//           <div className="flex justify-between items-center mb-2">
//             <label className="text-white/50 text-sm block mb-1">
//               Include specific moments
//             </label>
//             <p className="text-white/40 text-xs mt-1">
//               Not sure how to prompt?{" "}
//               <span className="underline cursor-pointer">Learn more</span>
//             </p>
//           </div>
//           <input
//             type="text"
//             placeholder="Example: find moments when we talked about the playoffs"
//             className="w-full bg-[#1a1a1a] text-white p-2 rounded-md text-sm"
//           />
//         </div>

//         <div>
//           <div className="flex gap-4 mb-7 mt-7 text-white text-sm">
//             <button className="font-semibold">Quick presets</button>
//             <button className="text-white/50">My templates</button>
//           </div>
//           <div className="flex gap-4 overflow-x-auto">
//             <img
//               src={cardimage}
//               alt="Preset 1"
//               className="w-24 h-36 object-cover rounded-md"
//             />
//             <img
//               src={cardimage}
//               alt="Preset 2"
//               className="w-24 h-36 object-cover rounded-md"
//             />
//             <img
//               src={cardimage}
//               alt="Preset 3"
//               className="w-24 h-36 object-cover rounded-md"
//             />
//           </div>
//         </div>

//         <div className="text-white text-sm flex items-center gap-2 mt-2">
//           <label>Choose aspect ratio</label>
//           <select className="bg-[#1a1a1a] text-white p-2 rounded-md text-sm">
//             <option>9:16</option>
//           </select>
//         </div>

//         <button className="mt-4 bg-[#1a1a1a] text-white py-2 rounded-md text-sm self-start px-4">
//           Save settings above as default
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CreateTab;

import cardimage from "../../../assets/images/dashboard/home/cardimage.png";
import link from "../../../assets/images/dashboard/home/homelinkicon.png";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { clearVideoLink } from "../../../features/video/videoSlice";
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
  videoSourceInNumber: number;
  videoSourceInName: string;
  langCode?: string;
  clipLength?: number;
  maxClipNumber?: number;
  templateId?: string | null;
  prompt?: string;
}

const CreateTab = () => {

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
    try {

      const videoSource = getVideoSource(videoLink);
      const requestBody: ClipRequestBody = {
        url: videoLink,
        videoSourceInNumber: videoSource === "youtube" ? 2 : videoSource === "googleDrive" ? 3 : videoSource === "cloudinary" ? 1 : 0,
        videoSourceInName: videoSource,
        langCode: selectedLang,
        clipLength: clipLength === 0 ? 0 : clipLength, // if auto, don't send
        maxClipNumber: clipsCount,
        templateId: selectedTemplateId,
        prompt: prompt || "", // Add prompt input state if needed
      };

      console.log(requestBody);

    } catch (error: any) {

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

          className="w-full bg-white text-black font-semibold py-2 rounded-full">
          Get Clips
        </button>

        <p className="text-white/50 text-center text-[10px] mt-3 leading-snug">
          Using video you don’t own may violate copyright laws. By continuing,
          you confirm this is your own original content.{" "}
        </p>

        <div className="flex items-center justify-center">
          <div className="flex gap-2 mt-1 text-center text-white text-[10px] underline">
            <button>Terms and Conditions</button>
            <button>Privacy Policy</button>
          </div>
        </div>
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
        <div>
          <div className="flex gap-4 mb-7 mt-7 text-white text-sm">
            <button
              onClick={() => setActiveTab("quick")}
              className={`font-semibold ${activeTab === "quick" ? "text-white" : "text-white/50"
                }`}
            >
              Quick presets
            </button>
            <button
              onClick={() => setActiveTab("my")}
              className={`font-semibold ${activeTab === "my" ? "text-white" : "text-white/50"
                }`}
            >
              My templates
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "quick" ? (
            <Swiper
              slidesPerView={4}
              spaceBetween={20}
              pagination={{ clickable: true }}
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
                    {/* Autoplay intro/outro video silently */}
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

                    {/* Overlay logo */}
                    {tpl.overlayLogo && (
                      <img
                        src={tpl.overlayLogo}
                        alt="Logo"
                        className="absolute top-2 left-2 w-10 h-10 object-contain"
                      />
                    )}

                    <p className="text-white text-xs p-2 truncate">{tpl.title}</p>
                  </div>
                </SwiperSlide>


              ))}
            </Swiper>
          ) : (
            <Swiper
              slidesPerView={4}
              spaceBetween={20}
              pagination={{ clickable: true }}
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
                    {/* Autoplay intro/outro video silently */}
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

                    {/* Overlay logo */}
                    {tpl.overlayLogo && (
                      <img
                        src={tpl.overlayLogo}
                        alt="Logo"
                        className="absolute top-2 left-2 w-10 h-10 object-contain"
                      />
                    )}

                    <p className="text-white text-xs p-2 truncate">{tpl.title}</p>
                  </div>
                </SwiperSlide>



              ))}
            </Swiper>
          )}
        </div>

        <div className="text-white text-sm flex items-center gap-2 mt-2">
          <label>Choose aspect ratio</label>
          <select className="bg-[#1a1a1a] text-white p-2 rounded-md text-sm">
            <option>9:16</option>
          </select>
        </div>

        <button className="mt-4 bg-[#1a1a1a] text-white py-2 rounded-md text-sm self-start px-4">
          Save settings above as default
        </button>
      </div>
    </div>
  );
};

export default CreateTab;
