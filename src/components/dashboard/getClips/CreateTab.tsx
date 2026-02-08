/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cardimage from "../../../assets/images/dashboard/home/cardimage.jpg";
import link from "../../../assets/images/dashboard/home/homelinkicon.png";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
  { value: "bn", label: "Bengali (বাংলা)" },
  { value: "zh", label: "Chinese (中文)" },
  { value: "nl", label: "Dutch (Nederlands)" },
  { value: "fil", label: "Filipino" },
  { value: "fi", label: "Finnish (suomi)" },
  { value: "fr", label: "French (français)" },
  { value: "de", label: "German (Deutsch)" },
  { value: "el", label: "Greek (Ελληνικά)" },
  { value: "gu", label: "Gujarati (ગુજરાતી)" },
  { value: "hi", label: "Hindi (हिन्दी)" },
  { value: "hu", label: "Hungarian (magyar)" },
  { value: "id", label: "Indonesian (Indonesia)" },
  { value: "it", label: "Italian (italiano)" },
  { value: "ja", label: "Japanese (日本語)" },
  { value: "ko", label: "Korean (한국어)" },
  { value: "mr", label: "Marathi (मराठी)" },
  { value: "pl", label: "Polish (polski)" },
  { value: "pt", label: "Portuguese (português)" },
  { value: "ro", label: "Romanian (română)" },
  { value: "ru", label: "Russian (русский)" },
  { value: "sr", label: "Serbian (српски)" },
  { value: "si", label: "Sinhala (සිංහල)" },
  { value: "es", label: "Spanish (español)" },
  { value: "sw", label: "Swahili (Kiswahili)" },
  { value: "sv", label: "Swedish (svenska)" },
  { value: "ta", label: "Tamil (தமிழ்)" },
  { value: "te", label: "Telugu (తెలుగు)" },
  { value: "th", label: "Thai (ไทย)" },
  { value: "tr", label: "Turkish (Türkçe)" },
  { value: "uk", label: "Ukrainian (українська)" },
  { value: "ur", label: "Urdu (اردو)" },
  { value: "vi", label: "Vietnamese (Tiếng Việt)" }
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

const axiosInstance = axios.create({
  timeout: 120000, // 2 minutes
  headers: {
    'Content-Type': 'application/json',
  }
});

// Retry logic function
const retryRequest = async (payload: any, retries = 2, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axiosInstance.post(
        "http://184.105.4.166:8000/ai/generate",
        payload
      );
      return response;
    } catch (error: any) {
      if (i === retries - 1) throw error;
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      console.log(`Retry attempt ${i + 1}...`);
    }
  }
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
  const [projectId, setProjectId] = useState('');
  const navigate = useNavigate();
  const [finalData, setFinalData] = useState<any>({});

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
  const [showProcessingModal, setShowProcessingModal] = useState(false);
  console.log(showProcessingModal)

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

  // Function to close WebSocket connection with reason
  const closeWebSocket = (reason = "Normal closure") => {
    if (websocketRef.current) {
      // Clear heartbeat interval if exists
      const socketWithExtras = websocketRef.current as any;
      if (socketWithExtras.heartbeatInterval) {
        clearInterval(socketWithExtras.heartbeatInterval);
      }
      
      if (websocketRef.current.readyState === WebSocket.OPEN) {
        websocketRef.current.close(1000, reason);
        console.log(`WebSocket connection closed: ${reason}`);
      } else {
        console.log(`WebSocket already in state: ${websocketRef.current.readyState}`);
      }
      websocketRef.current = null;
    }
  };

  // Cleanup WebSocket on component unmount
  useEffect(() => {
    return () => {
      closeWebSocket("Component unmounted");
    };
  }, []);

  // Function to connect WebSocket with reconnection logic
  const connectWebSocket = (pid: string, retryCount = 0) => {
    try {
      const maxRetries = 5;
      const baseDelay = 1000; // 1 second
      const maxDelay = 30000; // 30 seconds
      
      const wsUrl = `wss://ai.reelty.com.au/ai/ws/connect/${pid}`;
      // const wsUrl = `ws://184.105.4.166:8000/ai/ws/connect/${pid}`;

      console.log(`🔗 Connecting to WebSocket (attempt ${retryCount + 1})...`);

      const socket = new WebSocket(wsUrl);
      websocketRef.current = socket;

      // Add heartbeat interval to socket object
      const socketWithExtras = socket as any;

      // Connection timeout
      const connectionTimeout = setTimeout(() => {
        if (socket.readyState !== WebSocket.OPEN) {
          console.warn('WebSocket connection timeout');
          socket.close();
        }
      }, 10000);

      socket.onopen = () => {
        clearTimeout(connectionTimeout);
        console.log('✅ WebSocket connected successfully');
        
        const token = localStorage.getItem("accessToken");
        socket.send(
          JSON.stringify({
            action: "authenticate",
            token: token,
            project_id: pid,
            message: "Client connected"
          })
        );
        
        // Set up heartbeat interval
        socketWithExtras.heartbeatInterval = setInterval(() => {
          if (socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ 
              action: "ping", 
              timestamp: Date.now() 
            }));
          } else {
            clearInterval(socketWithExtras.heartbeatInterval);
          }
        }, 30000); // Send ping every 30 seconds
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("📨 WebSocket Message:", data);

          // Handle heartbeat/ping messages
          if (data.type === "ping" || data.message === "Connection alive") {
            console.log('❤️ Heartbeat received');
            // Send pong response
            socket.send(JSON.stringify({ 
              action: "pong", 
              timestamp: Date.now() 
            }));
            return;
          }

          // Handle progress updates
          if (data.type === "progress") {
            console.log(`Processing progress: ${data.progress}%`);
            setProgressData({
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
              message: "Completed",
              progress: 100,
              type: data.type,
              result: data.result
            });

            setFinalData(data);

            // Close WebSocket connection normally
            setTimeout(() => {
              closeWebSocket("Processing completed");
              setIsLoading(false);
              setShowProcessingModal(false);
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
              closeWebSocket("Error occurred");
              setIsLoading(false);
              setProgressData(null);
              setShowProcessingModal(false);
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
        clearTimeout(connectionTimeout);
        console.error("❌ WebSocket error:", error);
        
        // Only show error if not in reconnection mode
        if (retryCount === 0) {
          toast.error("Connection error occurred");
        }
      };

      socket.onclose = (event) => {
        clearTimeout(connectionTimeout);
        // Clear heartbeat interval
        if (socketWithExtras.heartbeatInterval) {
          clearInterval(socketWithExtras.heartbeatInterval);
        }
        
        console.log(`🔌 WebSocket closed: ${event.code} - ${event.reason || 'No reason'}`);
        
        // If not a normal closure and still loading, try to reconnect
        if (event.code !== 1000 && isLoading && retryCount < maxRetries) {
          const delay = Math.min(baseDelay * Math.pow(2, retryCount), maxDelay);
          
          console.log(`🔄 Attempting reconnect in ${delay}ms (${retryCount + 1}/${maxRetries})`);
          
          // Update progress message
          setProgressData(prev => prev ? {
            ...prev,
            message: `Connection lost. Reconnecting... (${retryCount + 1}/${maxRetries})`
          } : null);
          
          // Schedule reconnection
          setTimeout(() => {
            if (isLoading) {
              connectWebSocket(pid, retryCount + 1);
            }
          }, delay);
        } 
        // Max retries exceeded or normal closure
        else if (event.code !== 1000 && isLoading) {
          console.error('❌ Max reconnection attempts exceeded');
          toast.error("Connection failed after multiple attempts. Please try again.");
          setIsLoading(false);
          setProgressData(null);
          setShowProcessingModal(false);
        }
        
        websocketRef.current = null;
      };

    } catch (error) {
      console.error("Failed to create WebSocket:", error);
      
      // Retry on initialization error
      const maxRetries = 5;
      if (retryCount < maxRetries) {
        const baseDelay = 1000;
        const maxDelay = 30000;
        const delay = Math.min(baseDelay * Math.pow(2, retryCount), maxDelay);
        console.log(`🔄 Retrying WebSocket creation in ${delay}ms`);
        
        setTimeout(() => {
          if (isLoading) {
            connectWebSocket(pid, retryCount + 1);
          }
        }, delay);
      } else {
        toast.error("Failed to establish connection");
        setIsLoading(false);
        setProgressData(null);
        setShowProcessingModal(false);
      }
    }
  };

  // Polling fallback function
  const pollStatus = async (pid: string) => {
    const token = localStorage.getItem("accessToken");
    let attempts = 0;
    const maxAttempts = 60; // Poll for up to 5 minutes (5 sec intervals)
    
    const poll = async () => {
      if (attempts >= maxAttempts || !isLoading) {
        console.log("Polling stopped");
        setShowProcessingModal(false);
        return;
      }
      
      attempts++;
      
      try {
        const response = await axios.get(
          `https://ai.reelty.com.au/ai/status/${pid}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            timeout: 10000
          }
        );
        
        const data = response.data;
        setProgressData({
          message: data.message || "Processing...",
          progress: data.progress || 0,
          type: data.status || "progress",
          result: data.result
        });
        
        if (data.status === "completed" || data.status === "failed") {
          setIsLoading(false);
          setShowProcessingModal(false);
          
          if (data.status === "completed") {
            setProgressData({
              message: "Completed",
              progress: 100,
              type: "result",
              result: data
            });
            setFinalData({ type: "result", result: data });
            toast.success("Completed!");
          } else {
            toast.error(data.message || "Processing failed");
          }
        } else {
          // Continue polling
          setTimeout(poll, 5000);
        }
      } catch (error) {
        console.error("Polling error:", error);
        // Retry polling
        setTimeout(poll, 5000);
      }
    };
    
    poll();
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

    // Check URL length
    if (videoLink.length > 1000) {
      toast.error("Video URL is too long. Please use a shorter link or upload directly.");
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
    setFinalData({});
    setShowProcessingModal(true);

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

    // Check payload size
    const payloadString = JSON.stringify(payload);
    if (payloadString.length > 5000) {
      console.warn("Large payload size:", payloadString.length);
      toast.info("Processing large video. This may take a moment...");
    }

    console.log("📤 Sending request to start processing...", payload);

    try {
      // Try the queue endpoint first for immediate response
      try {
        const quickResponse = await axios.post(
          "https://ai.reelty.com.au/ai/queue",
          { ...payload, immediate: true },
          { timeout: 10000 }
        );
        
        if (quickResponse.data.queued) {
          const pid = quickResponse.data.project_id;
          setProjectId(pid);
          toast.success("Video queued for processing!");
          
          setProgressData({
            message: "Queued for processing. You'll be notified when complete.",
            progress: 0,
            type: "queued"
          });
          
          // Start polling for status
          pollStatus(pid);
          return;
        }
      } catch (queueError: any) {
        console.log("Queue endpoint not available, trying direct processing...");
        // Continue to direct processing
      }

      // Direct processing with retry logic
      const response = await retryRequest(payload);

      if (response?.data && response?.data.project_id) {
        const pid = response?.data.project_id;
        setProjectId(pid);
        toast.success("Processing started!");

        // Initial progress data
        setProgressData({
          message: "Starting processing...",
          progress: 0,
          type: "progress"
        });

        // Connect WebSocket for real-time updates
        connectWebSocket(pid);
      } else {
        console.error("No project_id in response:", response?.data);
        toast.error("Failed! Please try again");
        setIsLoading(false);
        setShowProcessingModal(false);
      }

    } catch (error: any) {
      console.error("API Error:", error);
      
      if (error.code === 'ECONNABORTED') {
        toast.info("Request is taking longer than expected. The server is processing your video. Check your projects page for updates.");
        
        // Provide alternative feedback
        setProgressData({
          message: "Server is processing your request. This may take a few minutes. Check your projects page for updates.",
          progress: 0,
          type: "info"
        });
        
        // Start polling if we have a project ID
        if (projectId) {
          pollStatus(projectId);
        } else {
          setIsLoading(false);
          setShowProcessingModal(false);
        }
      } else {
        toast.error(error.response?.data?.message || "Failed to start processing");
        setIsLoading(false);
        setProgressData(null);
        setShowProcessingModal(false);
      }
    }
  };

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-500"></div>
    </div>
  );

  return (
    <>
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
                  {progressData.progress === 100 ? 
                    "Completed" : 
                    (progressData.message === "Connection alive" ? "Waiting..." : progressData.message)
                  }
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
                    ✅ Completed
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
    </>
  );
};

export default CreateTab;