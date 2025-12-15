/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router';
import { useSaveMakeClipMutation } from '../../../features/makeclip/makeclipApi';

const NewlyCreatedClip = ({ results }: { results: any }) => {
    console.log(results?.clips)
    const [saveMakeClip] = useSaveMakeClipMutation();

    const handleSave = async (clipId: any) => {
        try {
            await saveMakeClip(clipId).unwrap();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            {results?.clips?.map((clip: any) => (
                <Link to={`/dashboard/project-clips/${results.clip_stored_id}`} key={clip.videoId}>
                    <div
                        className="relative cursor-pointer rounded overflow-hidden group flex flex-col h-[370px]
                        bg-gradient-to-br from-gray-900 via-black to-gray-900 shadow-lg 
                        hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                    >
                        {/* Video / Thumbnail */}
                        <div className="relative  w-full overflow-hidden">
                            {clip.videoUrl ? (
                                <div className="relative w-full max-w-lg mx-auto rounded-xl overflow-hidden shadow-lg bg-black">
                                        <video
                                            // key={segments[currentIndex].id}
                                            src={clip.videoUrl}
                                            autoPlay
                                            muted
                                            playsInline
                                            controls={false}  // disable controls
                                            className="w-full h-30 object-cover"
                                            // onEnded={handleVideoEnd}
                                        />
                                </div>
                            ) : (
                                <div className="h-full flex items-center justify-center bg-gray-700 text-white/60">
                                    <p>Clip Unavailable</p>
                                </div>
                            )}

                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-all duration-300"></div>

                            {/* "New" Badge */}
                            {new Date(clip.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
                                <span className="absolute top-3 left-3 bg-red-600 text-white px-2 py-0.5 rounded-full text-[10px] font-medium shadow-md">
                                    NEW
                                </span>
                            )}
                        </div>

                        <div className="flex items-center justify-between px-5 py-3">
                            {/* Save Button */}
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSave(clip.id);
                                }}
                                className=" cursor-pointer   backdrop-blur-md  px-2 py-1 rounded-full text-xs font-medium border border-red-600 text-white transition-all"
                            >
                                {clip.isSaved ? "❤️ Saved" : "♡ Save"}
                            </button>
                            {/* Status Badge */}
                            <span
                                className='px-3 py-1 text-[10px] font-semibold rounded-full shadow-md bg-green-500/90 text-white'
                            >
                                COMPLETED
                            </span>
                        </div>

                        {/* Content */}
                        <div className="p-4 flex flex-col  text-white justify-between">
                            {/* Title */}
                            <h3 className="text-base font-semibold truncate group-hover:text-red-400 transition-colors mb-3">
                                {clip?.title|| "Untitled Project"}
                            </h3>

                            {/* Meta Info Grid */}
                            <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
                                <div className="flex flex-col">
                                    <span className="font-medium text-white">Source</span>
                                    <span className="truncate italic">{clip.videoSourceInName || "N/A"}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-medium text-white">Duration</span>
                                    <span className="italic">{clip.duration}s</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-medium text-white">Credits Used</span>
                                    <span className="italic">{clip.creditUsed}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-medium text-white">Created</span>
                                    <span className="italic">{new Date(clip.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </Link>
            ))}
        </div>
    )
}

export default NewlyCreatedClip