import { useState } from "react";
import cardimage from "../../../assets/images/dashboard/home/cardimage.png";
import MaxWidthWrapper from "../../../components/wrappers/MaxWidthWrapper";
import { useGetMakeClipListWithClipQuery } from "../../../features/makeclip/makeclipApi";

const ProjectHistory = () => {
  const [currentPage, setCurrentPage] = useState(1); // State to track current page
  const limit = 10; // Number of clips per page
  const { data, isLoading } = useGetMakeClipListWithClipQuery({ page: currentPage, limit });

  if (isLoading) {
    return <div>Loading...</div>;
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

  // Function to determine template name
  const getTemplateName = (templateId: number): string => {
    return templateId === 1 ? "ClipBasic" : "ClipAdvanced";
  };

  // Function to calculate days before expiring
  const getDaysBeforeExpiring = (createdAt: string): string => {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate.getTime() - createdDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 ? `${7 - diffDays} days before expiring` : "Expired";
  };

  // Function to calculate total duration and format it
  const calculateTotalDuration = () => {
    if (!data?.clips) return "00:00"; // Default if no clips

    const totalSeconds = data.clips.reduce((sum, clip) => sum + (clip.duration || 0), 0);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    // Format as MM:SS
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
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

  return (
    <div>
      <MaxWidthWrapper>
        {/* Tabs and Cards */}
        <div className="w-full mt-10 z-10 flex flex-col gap-5">
          {/* Tabs */}
          <div className="flex items-center justify-between text-white">
            <div className="flex gap-4">
              <button className="py-2 px-4 rounded-xl bg-black text-white border border-gray-700">
                Recent Projects ({data?.clips?.length || 0})
              </button>
              <button className="py-2 px-4 rounded-xl bg-black text-white border border-gray-700">
                Saved Projects (0)
              </button>
            </div>
            <div className="text-white/60 text-sm">
              Total Duration: <span>{calculateTotalDuration()}</span>
            </div>
          </div>
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {data?.clips?.map((clip: any) => (
              <div key={clip.id} className="relative bg-black rounded-lg overflow-hidden">
                {/* Video or Image */}
                <div className="relative">
                  {clip.videoUrl && !getDirectVideoUrl(clip.videoUrl).endsWith(".png") ? (
                    <video
                      src={getDirectVideoUrl(clip.videoUrl)}
                      className="w-full object-cover"
                      autoPlay
                      muted
                      loop
                      controls={false}
                 
                    />
                  ) : (
                    <img
                      src={cardimage}
                      alt="Project Preview"
                      className="w-full object-cover"
                    />
                  )}
                  <div className="absolute bottom-0 w-full py-1 text-center text-white/50 bg-black/50 backdrop-blur-sm text-sm">
                    {getDaysBeforeExpiring(clip.createdAt)}
                  </div>
                </div>
                {/* "New" Badge */}
                {new Date(clip.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
                  <div className="absolute top-2 right-2 bg-black text-white px-2 py-1 rounded text-xs">
                    New
                  </div>
                )}
                {/* Card Content */}
                <div className="p-3 flex flex-col gap-2">
                  <h3 className="text-white text-sm">
                    {clip.segments.length > 0 ? clip.segments[0].title : "Untitled Project"}
                  </h3>
                  <p className="text-white/40 text-xs">{getTemplateName(clip.templateId)}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`py-2 px-4 rounded-xl text-white ${
                currentPage === 1 ? "bg-gray-700 cursor-not-allowed" : "bg-black border border-gray-700"
              }`}
            >
              Previous
            </button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageClick(page)}
                  className={`py-2 px-4 rounded-xl text-white ${
                    currentPage === page ? "bg-red-600/70" : "bg-black border border-gray-700"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`py-2 px-4 rounded-xl text-white ${
                currentPage === totalPages ? "bg-gray-700 cursor-not-allowed" : "bg-black border border-gray-700"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default ProjectHistory;