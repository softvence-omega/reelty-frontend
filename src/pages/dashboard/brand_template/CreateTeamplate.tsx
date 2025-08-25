import { useState, useEffect } from "react";
import MaxWidthWrapper from "../../../components/wrappers/MaxWidthWrapper";
import logoPlaceholder from "../../../assets/images/dashboard/template/default-temp.jpg";
import { Link } from "react-router";

const CreateTemplate = () => {
  const [templateName, setTemplateName] = useState("Template 1");
  const [logo, setLogo] = useState(null);
  const [introFile, setIntroFile] = useState(null);
  const [outroFile, setOutroFile] = useState(null);
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [previewHeight, setPreviewHeight] = useState(400);
  const [errors, setErrors] = useState({ intro: "", outro: "" });

  // Update preview height based on aspect ratio
  useEffect(() => {
    const width = 600; // preview width in px
    const [w, h] = aspectRatio.split(":").map(Number);
    const height = (width * h) / w;
    setPreviewHeight(height);
  }, [aspectRatio]);

  const handleFileUpload = (e, setter, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === "intro" || type === "outro") {
      if (!file.type.startsWith("video/")) {
        setErrors((prev) => ({
          ...prev,
          [type]: "Please select a video file.",
        }));
        setter(null);
        return;
      } else {
        setErrors((prev) => ({ ...prev, [type]: "" }));
      }
    }

    setter(URL.createObjectURL(file));
  };

  return (
    <div className="text-white py-10 min-h-screen ">
      <MaxWidthWrapper>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to={"/dashboard/brand-template"} className="px-4 py-2 bg-[#27272A] hover:bg-gray-700 rounded-lg transition">
            ← Back
          </Link>
          <input
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            className="max-w-3xl py-2 px-4 rounded-3xl bg-black text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button className="px-4 py-2 bg-[#27272A] hover:bg-gray-700 rounded-lg transition">
            Save Template
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side - Settings */}
          <div className="lg:w-3/12 bg-[#1f1f1f] p-6 rounded-xl space-y-6 shadow-lg">
            <h4 className="text-xl font-semibold mb-4">Settings</h4>

            {/* Aspect Ratio */}
            <div className="space-y-2">
              <p className="font-medium">Aspect Ratio</p>
              <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
                className="w-full bg-[#27272A] text-white px-4 py-2 rounded-lg"
              >
                <option value="16:9">16:9</option>
                <option value="9:16">9:16</option>
                <option value="1:1">1:1</option>
                <option value="4:5">4:5</option>
              </select>
            </div>

            {/* Intro / Outro */}
            <div className="space-y-2">
              <p className="font-medium">Intro / Outro</p>
              <div className="flex flex-col gap-2">
                <label className="w-full bg-[#27272A] hover:bg-gray-700 cursor-pointer py-2 rounded-lg text-center transition">
                  {introFile ? "Intro Selected" : "Upload Intro"}
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, setIntroFile, "intro")}
                  />
                </label>
                {errors.intro && (
                  <p className="text-red-500 text-sm">{errors.intro}</p>
                )}

                <label className="w-full bg-[#27272A] hover:bg-gray-700 cursor-pointer py-2 rounded-lg text-center transition">
                  {outroFile ? "Outro Selected" : "Upload Outro"}
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, setOutroFile, "outro")}
                  />
                </label>
                {errors.outro && (
                  <p className="text-red-500 text-sm">{errors.outro}</p>
                )}
              </div>
            </div>

            {/* Logo Upload */}
            <div className="space-y-2">
              <p className="font-medium">Logo</p>
              <div className="flex flex-col gap-2">
                <label className="w-full bg-[#27272A] hover:bg-gray-700 cursor-pointer py-2 rounded-lg text-center transition">
                  Upload Logo
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, setLogo)}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Right Side - Preview */}
          <div className="lg:w-4/12 bg-[#1f1f1f] p-6 rounded-xl shadow-lg flex flex-col">
            <h4 className="text-xl font-semibold mb-4">Preview</h4>
            <div
              className="relative w-full bg-black/20 rounded-xl overflow-hidden flex items-start justify-start"
              style={{ height: `${previewHeight}px` }}
            >
              {/* Main Image */}
              <img
                src={logoPlaceholder}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              {/* Logo on top-left */}
              {logo && (
                <img
                  src={logo}
                  alt="Logo"
                  className="absolute top-4 left-4 w-16 h-16 rounded-full object-cover border-2 border-white"
                />
              )}
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default CreateTemplate;
