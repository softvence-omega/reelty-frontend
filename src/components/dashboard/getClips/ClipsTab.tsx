import { useState, useMemo } from "react";
import { Heart, Download, MoreVertical } from "lucide-react";
import { useGetMakeClipListWithClipQuery } from "../../../features/makeclip/makeclipApi";

const ClipsTab = () => {
  const { data, isLoading } = useGetMakeClipListWithClipQuery({});
  const [page, setPage] = useState(1);
  const limit = 6; // প্রতি পেজে কয়টা segment দেখাবে

  if (isLoading) {
    return <p className="text-white text-center">Loading...</p>;
  }

  return (
    <div className="text-white flex flex-col gap-10">
      {data?.clips?.map((parentClip: any, index: number) => (
        <div key={index} className="flex flex-col gap-4">
          {/* Parent Prompt */}
          <h2 className="text-xl font-semibold text-white/90">
            {parentClip?.prompt || "Untitled Prompt"}
          </h2>

          {/* Segments Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {parentClip?.segments?.map((clip: any, idx: number) => (
              <div
                key={idx}
                className="border border-gray-700 bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition"
              >
                {/* Video */}
                <video
                  src={clip?.videoUrl}
                  className="w-full h-48 object-cover"
                  autoPlay
                  muted
                  loop
                  controls={false}
                />

                {/* Content */}
                <div className="p-4 flex flex-col gap-3">
                  <p className="text-sm text-gray-300 line-clamp-2">
                    {clip?.text || "No description available"}
                  </p>

                  {/* Actions */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-gray-400 hover:text-red-500 transition">
                        <Heart size={16} />
                        <span className="text-sm">123</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-400 hover:text-white transition">
                        <Download size={16} />
                        <span className="text-sm">Download</span>
                      </button>
                    </div>
                    <button className="text-gray-400 hover:text-white transition">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Pagination Example (Enable later if needed) */}
      {/* <div className="flex justify-center items-center gap-4 mt-6">
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
      </div> */}
    </div>
  );
};

export default ClipsTab;
