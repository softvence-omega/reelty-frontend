import cardimage from "../../../assets/images/dashboard/home/cardimage.png";
import MaxWidthWrapper from "../../../components/wrappers/MaxWidthWrapper";
import { useGetMakeClipListWithClipQuery } from "../../../features/makeclip/makeclipApi";





const ProjectHistory = () => {
  const { data, isLoading } = useGetMakeClipListWithClipQuery({ page: 1, limit: 10 });

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
    }
    return videoUrl; // Return original URL for non-Google Drive sources (e.g., Cloudinary)
  };

  // Calculate recent projects count (clips with status "COMPLETED" or "PENDING")
  const recentProjectsCount = data?.clips?.length || 0;

  // Function to determine template name
  const getTemplateName = (templateId) => {
    return templateId === 1 ? "ClipBasic" : "ClipAdvanced"; // Adjust based on your template logic
  };

  // Function to calculate days before expiring (example logic)
  const getDaysBeforeExpiring = (createdAt) => {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - createdDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 ? `${7 - diffDays} days before expiring` : "Expired";
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
                Recent Projects ({recentProjectsCount})
              </button>
              <button className="py-2 px-4 rounded-xl bg-black text-white border border-gray-700">
                Saved Projects (0)
              </button>
            </div>
            <div className="text-white/60 text-sm">
              <span>0 GB</span> / <span>100 GB</span>
            </div>
          </div>
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {data?.clips?.map((clip : any) => (
              <div key={clip.id} className="relative bg-black rounded-lg overflow-hidden">
        {/* Video or Image */}
<div className="relative">
  {clip.videoUrl ? (
<video
                      src={getDirectVideoUrl(clip.videoUrl)} // Convert Google Drive URL to direct URL
                      className="w-full object-cover"
                      autoPlay // Enable autoplay
                      muted // Required for autoplay
                      loop // Loop the video
                      controls={false} // Hide controls
                    
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
                    {clip.segments.length > 0
                      ? clip.segments[0].title // Display first segment title if available
                      : "Untitled Project"}
                  </h3>
                  <p className="text-white/40 text-xs">{getTemplateName(clip.templateId)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default ProjectHistory;