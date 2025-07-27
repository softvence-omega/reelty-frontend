import { Heart, Download, MoreVertical } from "lucide-react";

const clips = [
  {
    title: "Boba’s Wild Escape: Chased by Bulls and Massive Gains!",
    thumbnail: "https://i.ytimg.com/vi/1A2R3u4yNqo/mqdefault.jpg",
  },
  {
    title: "Strongest Man vs. Lion: Epic Tug-of-War!",
    thumbnail: "https://i.ytimg.com/vi/Bxg6PQm3MNw/mqdefault.jpg",
  },
  {
    title: "Lion Holds Strongest Man Back! What Happens Next?",
    thumbnail: "https://i.ytimg.com/vi/DPzPyREWf8s/mqdefault.jpg",
  },
  {
    title: "Money Run: Bulls vs. Cash! Can He Survive?",
    thumbnail: "https://i.ytimg.com/vi/LqUu0MLiNVU/mqdefault.jpg",
  },
  {
    title: "New World Record: Can He Jump Higher Than the Tiger?",
    thumbnail: "https://i.ytimg.com/vi/FJx0s5qIAC8/mqdefault.jpg",
  },
];

const ClipsTab = () => {
  return (
    <div className="text-white flex flex-col gap-6">
      <div>
        <h2 className="text-white/50 text-sm mb-4">
          Find the best clip for youtube shorts ({clips.length})
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {clips.map((clip, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <div className="aspect-[9/16] bg-gray-800 rounded overflow-hidden">
                <img
                  src={clip.thumbnail}
                  alt={clip.title}
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
                  <Download
                    size={16}
                    className="cursor-pointer hover:text-white"
                  />
                  <MoreVertical
                    size={16}
                    className="cursor-pointer hover:text-white"
                  />
                </div>
              </div>
              <p className="text-sm text-white line-clamp-2">{clip.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClipsTab;
