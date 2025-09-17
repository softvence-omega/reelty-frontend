import { useGetSingleProjectClipsQuery } from "../../../features/makeclip/makeclipApi";
import MaxWidthWrapper from "../../../components/wrappers/MaxWidthWrapper";
import { useParams } from "react-router";

const SingleProjectClips = () => {
  const { id } = useParams();

  const { data, error, isLoading } = useGetSingleProjectClipsQuery({ id });

  // ---------------- Loading ----------------
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex space-x-2">
          <span className="w-4 h-4 bg-red-500 rounded-full animate-bounce delay-0"></span>
          <span className="w-4 h-4 bg-red-500 rounded-full animate-bounce delay-150"></span>
          <span className="w-4 h-4 bg-red-500 rounded-full animate-bounce delay-300"></span>
        </div>
      </div>
    );
  }

  // ---------------- Error ----------------
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
        <svg
          className="w-12 h-12 text-red-500 mb-4 animate-shake"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h2 className="text-xl font-semibold text-red-500 mb-2">
          Failed to load clips
        </h2>
        <p className="text-gray-400 text-sm">
          Something went wrong. Please try again later.
        </p>
      </div>
    );
  }

  // ---------------- Empty ----------------
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-center text-gray-400 text-lg">
        No clips found.
      </div>
    );
  }

  // ---------------- Clips Grid ----------------
  return (
    <MaxWidthWrapper>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
        {data.map((clip: any) => (
          <div
            key={clip.id}
            className="bg-gradient-to-br from-gray-900 via-black to-black-800 bg-opacity-70 rounded-2xl p-5 flex flex-col gap-4 shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            {/* Title + Viral Score */}
            <div className="flex justify-between items-center">
              <h2
                className="text-lg flex-1 font-semibold text-white truncate"
                title={clip.title}
              >
                {clip.title || "Untitled Clip"}
              </h2>
              {clip.viralScore !== undefined && (
                <span className="bg-red-600 text-white  text-xs px-3 py-1 rounded-full font-medium">
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
                <summary className="cursor-pointer font-semibold">
                  Transcript
                </summary>
                <p className="mt-2 whitespace-pre-wrap">{clip.transcript}</p>
              </details>
            )}

            {/* Viral Reason */}
            {clip.viralReason && (
              <p className="text-white/60 italic text-xs mt-2">
                Viral Reason: {clip.viralReason}
              </p>
            )}

          </div>
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default SingleProjectClips;
