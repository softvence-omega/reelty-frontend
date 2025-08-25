import MaxWidthWrapper from "../../../components/wrappers/MaxWidthWrapper";

const CreateTemplate = () => {
  return (
    <div className="text-white py-10 bg-gray-900 min-h-screen">
      <MaxWidthWrapper>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition">
            ← Back
          </button>
          <div className="max-w-3xl py-2 px-4 rounded-3xl bg-black text-center text-lg font-semibold">
            Template 1
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition">
            Save Template
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side - Settings */}
          <div className="lg:w-3/5 bg-[#27272A] p-6 rounded-lg space-y-6 shadow-md">
            <h4 className="text-xl font-semibold mb-4">Settings</h4>

            {/* Aspect Ratio */}
            <div className="space-y-2">
              <p className="font-medium">Aspect Ratio</p>
              <select className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg">
                <option value="16:9">16:9</option>
                <option value="1:1">1:1</option>
                <option value="9:16">9:16</option>
              </select>
            </div>

            {/* Overlay */}
            <div className="space-y-2">
              <p className="font-medium">Overlay</p>
              <button className="w-full bg-blue-600 hover:bg-blue-500 py-2 rounded-lg transition">
                Upload Overlay
              </button>
            </div>

            {/* Intro / Outro */}
            <div className="space-y-2">
              <p className="font-medium">Intro / Outro</p>
              <button className="w-full bg-blue-600 hover:bg-blue-500 py-2 rounded-lg transition">
                Upload Intro
              </button>
              <button className="w-full bg-blue-600 hover:bg-blue-500 py-2 rounded-lg transition">
                Upload Outro
              </button>
            </div>
          </div>

          {/* Right Side - Preview */}
          <div className="lg:w-2/5 bg-[#27272A] p-6 rounded-lg shadow-md flex flex-col">
            <h4 className="text-xl font-semibold mb-4">Preview</h4>
            <div className="relative w-full h-[400px] bg-black/20 rounded-lg flex items-start justify-start p-4">
              {/* Logo Placeholder */}
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-sm">
                Logo
              </div>
              {/* Image Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                Preview Image
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default CreateTemplate;
