
import cardimage from "../../../assets/images/dashboard/home/cardimage.png";
import MaxWidthWrapper from "../../../components/wrappers/MaxWidthWrapper";
import { useGetMakeClipListWithClipQuery } from "../../../features/makeclip/makeclipApi";

const ProjectHistory = () => {
  const {data} = useGetMakeClipListWithClipQuery({});

console.log(data);

    return (
        <div>
            <MaxWidthWrapper>
                    {/* Tabs and Cards */}
        <div className="w-full mt-10 z-10 flex flex-col gap-5">
          {/* Tabs */}
          <div className="flex items-center justify-between text-white">
            <div className="flex gap-4">
              <button className="py-2 px-4 rounded-xl bg-black text-white border border-gray-700">
                Recent Projects (2)
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
            {/* card */}
            <div className="relative bg-black rounded-lg overflow-hidden">
              {/* Image */}
              <div className="relative">
                <img src={cardimage} alt="Project Preview" className="w-full object-cover" />
                <div className="absolute bottom-0 w-full py-1 text-center text-white/50 bg-black/50 backdrop-blur-sm text-sm">
                  4 days before expiring
                </div>
              </div>

              {/* "New" Badge */}
              <div className="absolute top-2 right-2 bg-black text-white px-2 py-1 rounded text-xs">
                New
              </div>

              {/* Card Content */}
              <div className="p-3 flex flex-col gap-2">
                <h3 className="text-white text-sm">I my name is shafi miazi...</h3>
                <p className="text-white/40 text-xs">ClipBasic</p>
              </div>
            </div>
            {/* card */}
            <div className="relative bg-black rounded-lg overflow-hidden">
              {/* Image */}
              <div className="relative">
                <img src={cardimage} alt="Project Preview" className="w-full object-cover" />
                <div className="absolute bottom-0 w-full py-1 text-center text-white/50 bg-black/50 backdrop-blur-sm text-sm">
                  4 days before expiring
                </div>
              </div>

              {/* "New" Badge */}
              <div className="absolute top-2 right-2 bg-black text-white px-2 py-1 rounded text-xs">
                New
              </div>

              {/* Card Content */}
              <div className="p-3 flex flex-col gap-2">
                <h3 className="text-white text-sm">I my name is shafi miazi...</h3>
                <p className="text-white/40 text-xs">ClipBasic</p>
              </div>
            </div>
            {/* card */}
            <div className="relative bg-black rounded-lg overflow-hidden">
              {/* Image */}
              <div className="relative">
                <img src={cardimage} alt="Project Preview" className="w-full object-cover" />
                <div className="absolute bottom-0 w-full py-1 text-center text-white/50 bg-black/50 backdrop-blur-sm text-sm">
                  4 days before expiring
                </div>
              </div>

              {/* "New" Badge */}
              <div className="absolute top-2 right-2 bg-black text-white px-2 py-1 rounded text-xs">
                New
              </div>

              {/* Card Content */}
              <div className="p-3 flex flex-col gap-2">
                <h3 className="text-white text-sm">I my name is shafi miazi...</h3>
                <p className="text-white/40 text-xs">ClipBasic</p>
              </div>
            </div>
            {/* card */}
            <div className="relative bg-black rounded-lg overflow-hidden">
              {/* Image */}
              <div className="relative">
                <img src={cardimage} alt="Project Preview" className="w-full object-cover" />
                <div className="absolute bottom-0 w-full py-1 text-center text-white/50 bg-black/50 backdrop-blur-sm text-sm">
                  4 days before expiring
                </div>
              </div>

              {/* "New" Badge */}
              <div className="absolute top-2 right-2 bg-black text-white px-2 py-1 rounded text-xs">
                New
              </div>

              {/* Card Content */}
              <div className="p-3 flex flex-col gap-2">
                <h3 className="text-white text-sm">I my name is shafi miazi...</h3>
                <p className="text-white/40 text-xs">ClipBasic</p>
              </div>
            </div>
            {/* card */}
            <div className="relative bg-black rounded-lg overflow-hidden">
              {/* Image */}
              <div className="relative">
                <img src={cardimage} alt="Project Preview" className="w-full object-cover" />
                <div className="absolute bottom-0 w-full py-1 text-center text-white/50 bg-black/50 backdrop-blur-sm text-sm">
                  4 days before expiring
                </div>
              </div>

              {/* "New" Badge */}
              <div className="absolute top-2 right-2 bg-black text-white px-2 py-1 rounded text-xs">
                New
              </div>

              {/* Card Content */}
              <div className="p-3 flex flex-col gap-2">
                <h3 className="text-white text-sm">I my name is shafi miazi...</h3>
                <p className="text-white/40 text-xs">ClipBasic</p>
              </div>
            </div>
          </div>
        </div>
            </MaxWidthWrapper>
        </div>
    );
};

export default ProjectHistory;