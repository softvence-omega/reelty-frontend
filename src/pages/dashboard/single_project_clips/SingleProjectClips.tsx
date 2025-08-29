import { useGetSingleProjectClipsQuery } from "../../../features/makeclip/makeclipApi";
import MaxWidthWrapper from "../../../components/wrappers/MaxWidthWrapper";
import { useParams } from "react-router";

const SingleProjectClips = () => {
  const { id } = useParams();

  // Fetch clips data by project ID
  const { data, error, isLoading } = useGetSingleProjectClipsQuery({ id });

  if (isLoading) return <div className="text-white text-center py-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-10">Error loading clips.</div>;

  return (
    <MaxWidthWrapper>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
        {data?.length === 0 && (
          <p className="text-white text-center col-span-full">No clips found.</p>
        )}

        {data?.map((clip : any) => (
          <div
            key={clip.id}
            className="bg-black bg-opacity-60 rounded-lg p-6 flex flex-col gap-4 border border-gray-700 shadow-md"
          >
            {/* Title and viral score */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">{clip.title}</h2>
              <span className="bg-red-600 text-white text-sm px-3 py-1 rounded-full font-medium">
                Viral Score: {clip.viralScore}
              </span>
            </div>

            {/* Video preview */}
            <video
              src={clip.videoUrl}
              className="w-full h-48 object-cover rounded-md"
              controls
              preload="metadata"
            />

            {/* Related Topics */}
            <div className="flex flex-wrap gap-2">
              {clip.relatedTopic.map((topic : any, i : number) => (
                <span
                  key={i}
                  className="bg-gray-800 text-white/80 px-3 py-1 rounded-full text-xs font-semibold"
                >
                  {topic}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="text-white/90 text-sm">{clip.description}</p>

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

            {/* Clip Editor Link
            {clip.clipEditorUrl && (
              <a
                href={clip.clipEditorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:underline text-sm mt-auto"
              >
                Edit this clip &rarr;
              </a>
            )} */}
          </div>
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default SingleProjectClips;
