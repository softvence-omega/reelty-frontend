import { Download } from "lucide-react";
import { useGetMakeClipListWithClipQuery } from "../../../features/makeclip/makeclipApi";
import dayjs from "dayjs";

const ClipsTab = () => {
  const { data, isLoading } = useGetMakeClipListWithClipQuery({});

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename || "clip.mp4";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="flex space-x-2">
          <span className="w-4 h-4 bg-red-500 rounded-full animate-bounce delay-0"></span>
          <span className="w-4 h-4 bg-red-500 rounded-full animate-bounce delay-150"></span>
          <span className="w-4 h-4 bg-red-500 rounded-full animate-bounce delay-300"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="text-white flex flex-col gap-10">
      {data?.clips?.map((parentClip: any, index: number) => (
        <div key={index} className="flex flex-col gap-4">
          {/* Parent Info */}
          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2">
            <h2 className="text-xl font-semibold text-white/90">
              {parentClip?.prompt || "Untitled Prompt"}
            </h2>
            <div className="flex gap-4 text-gray-400 text-sm">
              <span>Duration: {parentClip.duration}s</span>
              <span>Credits Used: {parentClip.creditUsed}</span>
              <span>Status: {parentClip.status}</span>
              <span>Created: {dayjs(parentClip.createdAt).format("MMM D, YYYY")}</span>
            </div>
          </div>

          {/* Segments Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6">
            {parentClip?.segments?.map((clip: any, idx: number) => (
              <div
                key={clip.id}
                className="bg-gradient-to-br from-gray-900 via-black to-black-800 bg-opacity-70 rounded-2xl p-5 flex flex-col gap-4 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* Title + Viral Score */}
                <div className="flex justify-between items-center">
                  <h2
                    className="text-lg flex-1 font-semibold text-white truncate"
                    title={clip.title || "Untitled Clip"}
                  >
                    {clip.title || "Untitled Clip"}
                  </h2>
                  {clip.viralScore !== undefined && (
                    <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                      Viral Score: {clip.viralScore}
                    </span>
                  )}
                </div>

                {/* Video Preview */}
                {clip.videoUrl && (
                  <video
                    src={clip.videoUrl}
                    className="w-full h-48 object-cover rounded-md bg-black"
                    controls
                    preload="metadata"
                  />
                )}

                {/* Related Topics */}
                {clip?.relatedTopic?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {clip.relatedTopic.map((topic: string, i: number) => (
                      <span
                        key={i}
                        className="text-xs text-gray-300 bg-gray-700 px-2 py-0.5 rounded-full"
                      >
                        {topic.replace(/[\[\]"]+/g, "")}
                      </span>
                    ))}
                  </div>
                )}

                {/* Description */}
                {clip.description && (
                  <p className="text-white/90 text-sm">{clip.description}</p>
                )}

                {/* Transcript */}
                {clip.transcript && (
                  <details className="text-white/70 text-sm">
                    <summary className="cursor-pointer font-semibold">Transcript</summary>
                    <p className="mt-2 whitespace-pre-wrap">{clip.transcript}</p>
                  </details>
                )}

                {/* Viral Reason */}
                {clip.viralReason && (
                  <p className="text-white/60 italic text-xs mt-2">
                    Viral Reason: {clip.viralReason}
                  </p>
                )}

                {/* Actions */}
                <div className="flex justify-between items-center mt-3">
                  <button
                    onClick={() =>
                      handleDownload(clip.videoUrl, `clip-${idx + 1}.mp4`)
                    }
                    className="flex items-center gap-1 text-gray-400 hover:text-white transition"
                  >
                    <Download size={16} />
                    <span className="text-sm">Download</span>
                  </button>
                  <span className="text-xs text-gray-500">
                    {new Date(clip.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClipsTab;
