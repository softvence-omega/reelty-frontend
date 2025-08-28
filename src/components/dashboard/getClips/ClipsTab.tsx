import { useState, useMemo } from "react";
import { Heart, Download, MoreVertical } from "lucide-react";
import { useGetMakeClipListWithClipQuery } from "../../../features/makeclip/makeclipApi";

const ClipsTab = () => {
  const { data, isLoading } = useGetMakeClipListWithClipQuery({page: 1, limit: 1000});
  const [page, setPage] = useState(1);
  const limit = 6; // প্রতি পেজে কয়টা দেখাবে

  // সব segments কে flatten করে নিচ্ছি
  const segments = useMemo(() => {
    if (!data?.clips) return [];
    return data.clips.flatMap((clip: any) =>
      clip.segments.map((segment: any) => ({
        ...segment,
        parentPrompt: clip.prompt,
      }))
    );
  }, [data]);

  const totalPages = Math.ceil(segments.length / limit);

  // paginate
  const paginatedSegments = useMemo(() => {
    const start = (page - 1) * limit;
    return segments.slice(start, start + limit);
  }, [page, limit, segments]);

  if (isLoading) {
    return <p className="text-white">Loading...</p>;
  }

  return (
    <div className="text-white flex flex-col gap-6">
      <div>
        <h2 className="text-white/50 text-sm mb-4">
          Find the best clip for youtube shorts ({segments.length})
        </h2>

        {/* Prompt (ekdom top e dekhabo) */}
        {data?.clips?.[0]?.prompt && (
          <p className="text-white/70 text-xs mb-4 italic">
            🎬 Prompt: {data.clips[0].prompt}
          </p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {paginatedSegments.map((segment: any) => (
            <div key={segment.id} className="flex flex-col gap-2">
              <div className="aspect-[9/16] bg-gray-800 rounded overflow-hidden">
                <video
                  src={segment.videoUrl}
                  controls
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between">
                <div></div>
                <div className="flex items-center gap-6 text-white/60 ">
                  <Heart
                    size={16}
                    className="cursor-pointer hover:text-white"
                  />
                  <a href={segment.videoUrl} download>
                    <Download
                      size={16}
                      className="cursor-pointer hover:text-white"
                    />
                  </a>
                  <MoreVertical
                    size={16}
                    className="cursor-pointer hover:text-white"
                  />
                </div>
              </div>
              <p className="text-sm text-white line-clamp-2">
                {segment.title}
              </p>
              <p className="text-xs text-white/50 line-clamp-2">
                {segment.description}
              </p>
              <p className="text-[10px] text-white/40">
                Viral Score: {segment.viralScore}
              </p>
            </div>
          ))}
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-40"
            >
              Prev
            </button>
            <span className="text-sm text-white/70">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClipsTab;
