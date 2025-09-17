import { useState } from "react";

function SegmentPlayer({ segments } : any) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleVideoEnd = () => {
    if (currentIndex < segments.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="relative w-full max-w-lg mx-auto rounded-xl overflow-hidden shadow-lg bg-black">
      {segments?.length > 0 ? (
        <video
          key={segments[currentIndex].id}
          src={segments[currentIndex].videoUrl}
          autoPlay
          muted
          playsInline
          controls={false}  // disable controls
          className="w-full h-30 object-cover"
          onEnded={handleVideoEnd}
        />
      ) : (
        <div className="h-64 flex items-center justify-center text-white/70">
          <p>No Segments Found</p>
        </div>
      )}
    </div>
  );
}

export default SegmentPlayer;
