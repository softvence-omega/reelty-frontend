import { useState } from "react";
import MaxWidthWrapper from "../../../components/wrappers/MaxWidthWrapper";
import logoPlaceholder from "../../../assets/images/dashboard/template/default-temp.jpg";

const CreateTemplate = () => {
    const [templateName, setTemplateName] = useState("Template 1");
    const [logo, setLogo] = useState(null);
    const [overlayFile, setOverlayFile] = useState(null);
    const [introFile, setIntroFile] = useState(null);
    const [outroFile, setOutroFile] = useState(null);

    const handleFileUpload = (e, setter) => {
        if (e.target.files && e.target.files[0]) {
            setter(URL.createObjectURL(e.target.files[0]));
        }
    };

    return (
        <div className="text-white py-10 min-h-screen  to-black">
            <MaxWidthWrapper>
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <button className="px-4 py-2 bg-[#27272A] rounded-lg transition">
                        ← Back
                    </button>
                    <input
                        value={templateName}
                        onChange={(e) => setTemplateName(e.target.value)}
                        className="max-w-3xl py-2 px-4 rounded-3xl bg-black text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="px-4 py-2 bg-[#27272A] rounded-lg transition">
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
                            <select className="w-full bg-[#27272A] text-white px-4 py-2 rounded-lg">
                                <option value="9:16">9:16</option>
                                <option value="1:1">1:1</option>
                                <option value="4:5">4:5</option>
                                <option value="16:9">16:9</option>
                            </select>
                        </div>



                        {/* Intro / Outro */}
                        <div className="space-y-2">
                            <p className="font-medium">Intro / Outro</p>
                            <label className="w-full bg-[#27272A] cursor-pointer py-2 rounded-lg text-center">
                                {introFile ? "Intro Selected" : "Upload Intro"}
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => handleFileUpload(e, setIntroFile)}
                                />
                            </label>
                            <label className="w-full bg-[#27272A] cursor-pointer py-2 rounded-lg text-center">
                                {outroFile ? "Outro Selected" : "Upload Outro"}
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => handleFileUpload(e, setOutroFile)}
                                />
                            </label>
                        </div>

                        {/* Logo Upload */}
                        <div className="space-y-2">
                            <p className="font-medium">Logo</p>
                            <label className="w-full bg-[#27272A] cursor-pointer py-2 rounded-lg text-center">
                                Upload Logo
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => handleFileUpload(e, setLogo)}
                                />
                            </label>
                        </div>
                    </div>

                    {/* Right Side - Preview */}
                    <div className="lg:w-4/12 bg-[#1f1f1f] p-6 rounded-xl shadow-lg flex flex-col">
                        <h4 className="text-xl font-semibold mb-4">Preview</h4>
                        <div className="relative w-full h-[400px] bg-black/20 rounded-xl overflow-hidden flex items-start justify-start">
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
