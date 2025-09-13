import { useEffect, useState } from "react";
import {  useGetMakeClipListWithClipQuery, useSaveMakeClipMutation } from "../../../features/makeclip/makeclipApi";
import MaxWidthWrapper from "../../../components/wrappers/MaxWidthWrapper";
import cardimage from "../../../assets/images/dashboard/home/cardimage.png";
import { Link } from "react-router";

const RecentProject = ({ setTotalDuration }: any) => {
    const [currentPage, setCurrentPage] = useState(1); // State to track current page
    const limit = 10; // Number of clips per page
    const { data, isLoading } = useGetMakeClipListWithClipQuery({ page: currentPage, limit });
    const [saveMakeClip] = useSaveMakeClipMutation();


    useEffect(() => {
        if (!data?.clips) {
            setTotalDuration("00:00"); // Default if no clips
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
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-6 animate-pulse">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="border border-gray-700 bg-black rounded-xl overflow-hidden shadow-lg"
                    >
                        {/* Video skeleton */}
                        <div className="w-full h-48 bg-gray-800" />

                        {/* Content skeleton */}
                        <div className="p-4 flex flex-col gap-3">
                            <div className="h-4 bg-gray-700 rounded w-3/4" />
                            <div className="h-3 bg-gray-700 rounded w-1/2" />

                            <div className="flex justify-between items-center mt-3">
                                <div className="h-4 bg-gray-700 rounded w-20" />
                                <div className="h-4 bg-gray-700 rounded w-6" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }





    // Function to convert Google Drive viewer URL to direct download URL
    const getDirectVideoUrl = (videoUrl: string): string => {
        if (videoUrl.includes("drive.google.com")) {
            const fileIdMatch = videoUrl.match(/\/d\/(.+?)\//);
            if (fileIdMatch && fileIdMatch[1]) {
                return `https://drive.google.com/uc?export=download&id=${fileIdMatch[1]}`;
            }
            console.warn(`Invalid Google Drive URL: ${videoUrl}`);
            return cardimage; // Fallback to cardimage if file ID is missing
        } else if (videoUrl.includes("res.cloudinary.com/demo")) {
            console.warn(`Cloudinary demo URL may be invalid: ${videoUrl}`);
            return cardimage; // Fallback to cardimage for demo account URLs
        }
        return videoUrl; // Return original URL for valid Cloudinary sources
    };







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

        }
    }
    return (
        <div>
            <MaxWidthWrapper>
                {/* Tabs and Cards */}
                <div className="w-full mt-10 z-10 flex flex-col gap-5">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
  {data?.clips?.map((clip: any) => (
    <Link to={`/dashboard/project-clips/${clip.id}`} key={clip.id}>
      <div
        className="relative cursor-pointer bg-black rounded-lg overflow-hidden group flex flex-col h-[350px]"
      >
        {/* Video or Image with fixed height */}
        <div className="relative h-48">
          {clip.videoUrl && !getDirectVideoUrl(clip.videoUrl).endsWith(".png") ? (
            <video
              src={getDirectVideoUrl(clip.videoUrl)}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              controls={false}
            />
          ) : (
            <div className="h-full flex items-center justify-center bg-black text-white/70">
              <p>Clip Unavailable</p>
            </div>
          )}
        </div>

        {/* "New" Badge */}
        {new Date(clip.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
          <div className="absolute top-2 right-2 bg-black text-white px-2 py-1 rounded text-xs">
            New
          </div>
        )}

        {/* Save button */}
        <div
          onClick={() => handleSave(clip.id)}
          className="absolute top-2 left-2 cursor-pointer bg-red-500 text-white px-2 py-1 rounded text-xs"
        >
          {clip.isSaved ? "Saved" : "Save"}
        </div>

        {/* Card Content - flex-grow to fill remaining space */}
        <div className="p-3 flex flex-col flex-grow justify-between">
          <h3 className="text-white text-sm">
            {clip?.prompt || "Untitled Project"}
          </h3>
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