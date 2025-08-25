
import newtemplateImage from "../../../assets/images/dashboard/brandtemp/newtempicon.png";
import MaxWidthWrapper from "../../../components/wrappers/MaxWidthWrapper";
import { useGetTemplatesListQuery } from "../../../features/template/templateApi";

const BrandTemplate = () => {
  // Fetch templates from backend
  const { data, isLoading } = useGetTemplatesListQuery({ page: 1, limit: 10 });
  console.log("data", data)

  if (isLoading) return <p className="text-white text-center py-10">Loading templates...</p>;

  // Map backend data to frontend template structure
  const templates = data?.data?.items.map((item: any) => ({
    id: item.id,
    aspect: item.aspectRatio,
    colorDots: ["white", "red"], // optionally map colorTheme
    title: item.templateName,
    selected: item.isDefault,
    overlayLogo: item.overlayLogo,
    introVideo: item.introVideo,
    outroVideo: item.outroVideo,
  })) || [];

  return (
    <div className="text-white py-10">
      <MaxWidthWrapper>
        {/* Title & Info */}
        <h1 className="text-2xl font-semibold mb-2">Brand Templates</h1>
        <p className="text-sm text-gray-400 mb-6">
          Only Pro accounts may use the Brand Kit. Upgrade now to build your
          Brand Kit with custom fonts, intro & outro cards, B-Roll, and more.{" "}
          <a href="#" className="text-blue-400 underline">
            Upgrade to Pro now
          </a>
        </p>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((template : any) => (
            <div key={template.id} className="flex flex-col gap-4">
              <div
                className={`rounded-xl p-4 flex flex-col gap-3 ${
                  template.selected
                    ? "border-2 border-blue-500"
                    : "border border-[#27272A]"
                } bg-[#27272A]`}
              >
                <p className="text-sm">{template.aspect}</p>
                <h3 className="uppercase text-xl text-center">
                  <span>Choose a </span>
                  <span className="font-bold text-red-500">Style</span>
                </h3>
                <div className="flex items-center justify-between w-full">
                  <p className="text-white/50 text-sm">
                    logo, intro, and more...
                  </p>
                  <div className="flex items-center gap-2">
                    {template.colorDots.map((color : any, idx : number) => (
                      <div
                        key={idx}
                        className={`w-5 h-5 rounded-full bg-${color}-500`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {template.selected && (
                  <div className="py-1 px-3 rounded-full text-white text-xs bg-[#27272A]">
                    Default
                  </div>
                )}
                <p className="text-sm">{template.title}</p>
              </div>
            </div>
          ))}

          {/* Create New Template */}
          <div className="bg-[#27272A] border h-32 border-dashed border-red-500 rounded-md p-4 flex flex-col justify-center items-center cursor-pointer hover:border-red-400 transition">
            <div className=" w-full  rounded-md flex justify-center items-center">
              <img src={newtemplateImage} alt="" />
            </div>
            <p className="text-xs text-gray-300 mt-2">Create new template</p>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default BrandTemplate;
