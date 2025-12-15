/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cardimage from "../../../assets/images/dashboard/home/cardimage.jpg";
import link from "../../../assets/images/dashboard/home/homelinkicon.png";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { useGetTemplatesListQuery } from "../../../features/template/templateApi";
import { clearVideoLink } from "../../../features/video/videoSlice";
import type { RootState } from "../../../store";

// Swiper imports
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import { useActiveStatusQuery } from "../../../features/auth/authApi";
import NewlyCreatedClip from "./NewlyCreatedClip";

const languages = [
  { value: "en", label: "English" },
  { value: "ar", label: "Arabic (عربي)" },
  // ... rest of languages
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
  } else if (videoLink.includes("vimeo.com")) {
    const videoId = videoLink.split("/").pop()?.split("?")[0];
    if (videoId) {
      return (
        <iframe
          src={`https://player.vimeo.com/video/${videoId}`}
          width="100%"
          height="250"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="rounded-xl"
        />
      );
    }
  } else {
    return <video src={videoLink} controls className="w-full rounded-xl" />;
  }
};

// Progress Data Interface
interface ProgressData {
  message: string;
  progress: number;
  type: string;
  result?: {
    clips?: any[];
    status?: string;
    [key: string]: any;
  };
}

// Helper function to get progress stage
const getProgressStage = (progress: number): string => {
  if (progress < 20) return "Initializing...";
  if (progress < 40) return "Analyzing video...";
  if (progress < 60) return "Extracting content...";
  if (progress < 80) return "Generating clips...";
  if (progress < 100) return "Finalizing...";
  return "Completed";
};

const CreateTab = () => {
  const [clipLength, setClipLength] = useState<number>(0);
  const [clipsCount, setClipsCount] = useState<number>(2);
  const [selectedLang, setSelectedLang] = useState("en");
  const [prompt, setPrompt] = useState("");
  const [activeTab, setActiveTab] = useState<"quick" | "my">("my");
  const { data } = useGetTemplatesListQuery({ page: 1, limit: 20 });
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const dispatch = useDispatch();
  const { data: isActiveSubscription } = useActiveStatusQuery();
  const [, setProjectId] = useState('');
  const navigate = useNavigate();
  const [finalData, setFinalData] = useState<any>({})

  type VideoSource = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 0;


  const getVideoSource = (url: string): VideoSource => {
    if (!url) return 0;


    if (url.includes("res.cloudinary.com")) return 1;


    if (url.includes("youtube.com") || url.includes("youtu.be")) return 2;


    if (url.includes("drive.google.com")) return 3;


    if (url.includes("vimeo.com")) return 4;


    if (url.includes("streamyard.com")) return 5;


    if (url.includes("tiktok.com")) return 6;


    if (url.includes("twitter.com") || url.includes("x.com")) return 7;

    if (url.includes("rumble.com")) return 8;


    if (url.includes("twitch.tv")) return 9;
    if (url.includes("loom.com")) return 10;

    if (url.includes("facebook.com")) return 11;

    if (url.includes("linkedin.com")) return 12;

    return 0;
  };

  const [isLoading, setIsLoading] = useState(false);
  const [progressData, setProgressData] = useState<ProgressData | null>(null);

  // Ref for WebSocket connection
  const websocketRef = useRef<WebSocket | null>(null);

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

  // Function to close WebSocket connection
  const closeWebSocket = () => {
    if (websocketRef.current) {
      if (websocketRef.current.readyState === WebSocket.OPEN) {
        websocketRef.current.close(1000, "Processing completed");
        console.log("WebSocket connection closed normally");
      }
      websocketRef.current = null;
    }
  };

  // Cleanup WebSocket on component unmount
  useEffect(() => {
    return () => {
      closeWebSocket();
    };
  }, []);

  const connectWebSocket = (projectId: string) => {
    try {
      const wsUrl = `ws://184.105.4.166:8000/ai/ws/connect/${projectId}`;

      const socket = new WebSocket(wsUrl);
      websocketRef.current = socket;

      socket.onopen = () => {
        const token = localStorage.getItem("accessToken");
        socket.send(
          JSON.stringify({
            action: "authenticate",
            token: token,
            project_id: projectId,
            message: "Client connected"
          })
        );
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("📨 WebSocket Message:", data);

          // Handle progress updates
          if (data.type === "progress") {
            console.log(`Processing progress: ${data.progress}%`);
            setProgressData({
              // message: data.message || "Processing...",
              message: "Processing...",
              progress: data.progress || 0,
              type: data.type,
            });
          }


          // Handle completion
          else if (data.type === "result") {
            console.log("Processing result received:", data);

            // Update progress data with result
            setProgressData({
              message: "Processing completed",
              progress: 100,
              type: data.type,
              result: data.result
            });

            setFinalData(data)

            // Close WebSocket connection
            setTimeout(() => {
              closeWebSocket();
              setIsLoading(false);

              // You can navigate or show results here
              // navigate("/dashboard/results");
            }, 2000);
          }

          // Handle errors
          else if (data.type === "error") {
            console.error("Processing error:", data.message);
            toast.error(`Error: ${data.message}`);
            setProgressData({
              message: data.message || "Processing failed",
              progress: 0,
              type: data.type
            });

            setTimeout(() => {
              closeWebSocket();
              setIsLoading(false);
              setProgressData(null);
            }, 3000);
          }
          // Handle any other message types
          else {
            console.log("Other WebSocket message:", data);
            setProgressData(prev => ({
              message: "Processing...",
              progress: data.progress || prev?.progress || 0,
              type: data.type || "info",
              result: data.result || prev?.result
            }));
          }
        } catch (error) {
          console.log("Raw WebSocket message or parse error:", event.data);
        }
      };

      socket.onerror = (error) => {
        console.error("❌ WebSocket error:", error);
        toast.error("Connection error occurred");
        setIsLoading(false);
        setProgressData(null);
      };

      socket.onclose = (event) => {
        console.log("WebSocket closed:", event.code, event.reason);
        if (event.code !== 1000) {
          console.warn("WebSocket closed unexpectedly");
          toast.warning("Connection closed unexpectedly");
        }
        websocketRef.current = null;
      };

    } catch (error) {
      console.error("Failed to create WebSocket:", error);
      toast.error("Failed to establish connection");
      setIsLoading(false);
      setProgressData(null);
    }
  };



  const handleGetClips = async () => {
    // Check video source
    const videoSource = getVideoSource(videoLink);

    if (videoSource === 0) {
      toast.error("Unsupported video source. Please use YouTube, Google Drive, Cloudinary, or Vimeo.");
      return;
    }

    if (!isActiveSubscription) {
      toast.error("You don't have an active subscription.");
      return;
    }

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

    // Reset states
    setIsLoading(true);
    setProgressData(null);

    // Close any existing WebSocket connection
    closeWebSocket();

    const payload = {
      auth_token: token,
      url: videoLink,
      videoType: getVideoSource(videoLink),
      langCode: selectedLang,
      clipLength,
      maxClipNumber: clipsCount,
      templateId: String(selectedTemplateId),
      prompt
    };


    console.log("📤 Sending request to start processing...", payload);

    try {
      const response = await axios.post(
        "http://184.105.4.166:8000/ai/generate",
        payload,
        {
          timeout: 30000,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.data && response.data.project_id) {
        const pid = response.data.project_id;
        setProjectId(pid);
        toast.success("Processing started!");

        // Initial progress data
        setProgressData({
          message: "Starting processing...",
          progress: 0,
          type: "progress"
        });

        // WebSocket connection function
        connectWebSocket(pid);
      } else {
        console.error("No project_id in response:", response.data);
        toast.error("Failed! Please try again");
        setIsLoading(false);
      }

    } catch (error: any) {
      console.error("API Error:", error);
      toast.error(error.response?.data?.message || "Failed to start processing");
      setIsLoading(false);
      setProgressData(null);
    }
  };

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-500"></div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Left Side */}
      <div className="md:w-5/12 w-full bg-[#1a1a1a] p-4 rounded-2xl">
        <div className="flex items-center gap-2 mb-4 bg-[#0d0d0d] rounded-full py-2 px-4">
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
                disabled={isLoading}
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
            <img src={cardimage} alt="Thumbnail" className="w-full h-96 rounded-xl" />
          )}
        </div>

        {/* Progress Display */}
        {progressData && (
          <div className="mb-4 p-3 bg-[#0d0d0d] rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white text-lg font-medium">
                {progressData.message === "Connection alive" ? "Waiting..." : progressData.message}
              </span>

              <span className="text-white/70 text-sm">
                {progressData.progress}%
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-red-500 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progressData.progress}%` }}
              ></div>
            </div>

            {/* Additional status info */}
            {progressData.type === 'result' && (
              <div className="mt-3">
                <div className="text-green-400 text-md mb-1">
                  ✅ Processing completed successfully
                </div>
                {progressData.result?.clips && (
                  <div className="text-white/80 text-sm">
                    {progressData.result.clips.length} clips generated
                  </div>
                )}
              </div>
            )}

            {/* Progress stages indicator */}
            {progressData.type === 'progress' && (
              <div className="mt-2 flex items-center gap-1">
                <div className="text-xs text-white/60">
                  Stage: {getProgressStage(progressData.progress)}
                </div>
              </div>
            )}
          </div>
        )}

        <button
          onClick={handleGetClips}
          disabled={isLoading || !videoLink || !selectedTemplateId}
          className="w-full bg-white cursor-pointer text-black font-semibold py-3 rounded-full flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed hover:bg-gray-200"
        >
          {isLoading ? (
            <>
              <LoadingSpinner />
              <span>Processing...</span>
            </>
          ) : (
            'Generate Clips'
          )}
        </button>

        {/* Newly Created Clips Section */}
        {finalData?.type === 'result' && finalData?.result?.clips && (
          <div className="mt-6 w-full">
            <NewlyCreatedClip results={finalData.result} />
          </div>
        )}
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
              disabled={isLoading}
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
              disabled={isLoading}
            />
            <div className="flex items-center justify-center p-3 rounded bg-[#27272A]">
              {clipsCount}
            </div>
          </div>
        </div>

        <div className="w-full mx-auto my-1">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            id="prompt"
            name="prompt"
            placeholder="Enter your prompt..."
            className="w-full px-4 py-2 border text-white border-gray-300/30 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            disabled={isLoading}
          />
        </div>

        {/* Tabs */}
        <div className="w-full max-w-full overflow-hidden">
          <div className="flex gap-4 mb-7 mt-7 text-white text-sm">
            <button
              onClick={() => setActiveTab("my")}
              className={`font-semibold ${activeTab === "my" ? "text-white" : "text-white/50"}`}
              disabled={isLoading}
            >
              My templates
            </button>
          </div>

          {templates.length > 0 ? (
            <Swiper
              slidesPerView={3}
              spaceBetween={20}
              className="mySwiper"
            >
              {templates?.map((tpl: any) => (
                <SwiperSlide key={tpl.id}>
                  <div
                    className={`bg-[#1a1a1a] rounded-md overflow-hidden relative cursor-pointer transition-all ${selectedTemplateId === tpl.id ? "border-2 border-red-500" : ""} ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                    onClick={() => !isLoading && setSelectedTemplateId(tpl.id)}
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
                      <div className="flex items-center w-full justify-center h-36 bg-[#121212]">
                        <span className="text-gray-400 text-sm">No Preview Available</span>
                      </div>
                    )}

                    <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                      {tpl.aspect}
                    </div>
                    <div className="absolute top-2 right-2 text-white text-[10px] px-2 py-0.5 rounded-full">
                      <span className="bg-gray-800 text-white px-2 py-0.5 rounded-full">
                        {tpl.platform}
                      </span>
                    </div>

                    <div className="p-2 w-full">
                      <p className="text-white text-xs font-medium truncate">
                        {tpl.title}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="flex flex-col items-center w-full justify-center h-36 bg-[#121212] p-3 text-center">
              <span className="text-gray-300 text-sm font-medium">
                You haven't created any <Link to={"/dashboard/brand-template"}><span className="text-red-500 font-semibold">Brand Template</span></Link> yet.
              </span>
              <span className="text-gray-500 text-xs mt-1">
                Please create a Brand Template first. Once created, its preview will appear here.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateTab;