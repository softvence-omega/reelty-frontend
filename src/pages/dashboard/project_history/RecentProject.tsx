/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useGetMakeClipListWithClipQuery, useSaveMakeClipMutation } from "../../../features/makeclip/makeclipApi";
import MaxWidthWrapper from "../../../components/wrappers/MaxWidthWrapper";
import { Link } from "react-router";
import SegmentPlayer from "./SegmentPlayer";

const RecentProject = ({ setTotalDuration }: any) => {
    const [currentPage, setCurrentPage] = useState(1); 
    const limit = 10; // Number of clips per page
    const { data, isLoading } = useGetMakeClipListWithClipQuery({ page: currentPage, limit });
    const [saveMakeClip] = useSaveMakeClipMutation()

    useEffect(() => {
        if (!data?.clips) {
            setTotalDuration("00:00"); 
            return;
        }

        const totalSeconds = data.clips.reduce((sum: any, clip: any) => sum + (clip.duration || 0), 0);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds % 60);
        // Format as MM:SS
        const formattedDuration = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        setTotalDuration(formattedDuration);
    }, [data, setTotalDuration])

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


    // Pagination controls
    const totalPages = data?.totalPages || 1;
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    const handlePageClick = (page: number) => {
        setCurrentPage(page);
    };

    const handleSave = async (clipId: any) => {
        try {
            await saveMakeClip(clipId).unwrap();
        } catch (error) {
            console.log(error)
        }
    }
    console.log('data',data)

    return (
        <div>
            <MaxWidthWrapper>
                <div className="w-full mt-10 z-10 flex flex-col gap-6">

                    {/* Grid for Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                       {data?.clips?.map((clip: any) => (
                            <Link to={`/dashboard/project-clips/${clip.id}`} key={clip.id}>
                                <div
                                    className="relative cursor-pointer rounded overflow-hidden group flex flex-col h-[370px]
                     bg-gradient-to-br from-gray-900 via-black to-gray-900 shadow-lg 
                     hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                                >
                                    {/* Video / Thumbnail */}
                                    <div className="relative  w-full overflow-hidden">
                                        {clip.videoUrl ? (
                                            <SegmentPlayer segments={clip?.segments} />
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

                                    <div className="flex items-center justify-between gap-2 px-3 py-3">
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
                                            className={`  px-3 py-1 text-[10px] font-semibold rounded-full shadow-md
                ${clip.status === "COMPLETED"
                                                    ? "bg-green-500/90 text-white"
                                                    : "bg-yellow-500/90 text-black"
                                                }`}
                                        >
                                            {clip.status}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="p-4 flex flex-col  text-white justify-between">
                                        {/* Title */}
                                        <h3 className="text-base font-semibold truncate group-hover:text-red-400 transition-colors mb-3">
                                            {clip?.prompt || "Untitled Project"}
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

                    {/* Pagination Controls */}
                    <div className="flex items-center justify-center gap-4 mt-6">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            className={`cursor-pointer py-2 px-4 rounded-tl-md rounded-bl-md font-medium w-20 text-center
      ${currentPage === 1
                                    ? "text-white/30 cursor-not-allowed bg-black/50 border-b-2 border-transparent"
                                    : "text-white/50 hover:text-white/90 bg-black border-b-2 border-transparent hover:border-white/70"
                                }`}
                        >
                            Previous
                        </button>

                        <div className="flex gap-2">
                            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageClick(page)}
                                    className={`cursor-pointer py-2 px-4 font-medium w-12 text-center rounded-md
          ${currentPage === page
                                            ? "border-b-2 border-white/70 bg-black text-white"
                                            : "text-white/50 bg-black border-b-2 border-transparent hover:border-white/70 hover:text-white"
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className={`cursor-pointer py-2 px-4 rounded-tr-md rounded-br-md font-medium w-20 text-center
      ${currentPage === totalPages
                                    ? "text-white/30 cursor-not-allowed bg-black/50 border-b-2 border-transparent"
                                    : "text-white/50 hover:text-white/90 bg-black border-b-2 border-transparent hover:border-white/70"
                                }`}
                        >
                            Next
                        </button>
                    </div>
                </div>

            </MaxWidthWrapper>
        </div>
    )
}

export default RecentProject;