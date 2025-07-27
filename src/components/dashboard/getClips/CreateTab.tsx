

import cardimage from "../../../assets/images/dashboard/home/cardimage.png";
import link from "../../../assets/images/dashboard/home/homelinkicon.png";

import crediticon from "../../../assets/images/dashboard/getclips/crediticon.png"
import detailsicon from "../../../assets/images/dashboard/getclips/detailsicon.png";

const CreateTab = () => {
    return (
       <div className="flex flex-col md:flex-row gap-6">
            {/* Left Side */}
            <div className="md:w-5/12 w-full bg-[#1a1a1a] p-4 rounded-2xl">
              {/* <div className="text-white text-sm mb-2">313.01 × 36</div> */}
              <div className="flex items-center gap-2 mb-4  bg-[#0d0d0d] rounded-full py-2 px-4">
                <img src={link} alt="" />
                <input
                  type="text"
                  value="https://www.youtube.com/watch?v=fWsdFuhPpjI"
                  readOnly
                  className="w-full text-white/50 text-xs px-3 py-2 rounded-md"
                />
                <button className="underline text-white/50 text-xs">
                  Remove
                </button>
              </div>

              <div className="flex justify-between text-white/50 text-sm mb-3">
                <div>
                  Speech language:{" "}
                  <span className="text-white/80">
                    <select className="bg-[#1a1a1a] text-white p-2 rounded-md text-sm">
                      <option>English</option>
                    </select>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  Credit usage:{" "}
                  <span>
                    <img src={crediticon} alt="" />
                  </span>{" "}
                  <span className="text-white/80">20</span>
                  <span>
                    <img src={detailsicon} alt="" />
                  </span>
                </div>
              </div>

              <div className="relative mb-4">
                <img
                  src={cardimage}
                  alt="Thumbnail"
                  className="w-full rounded-xl"
                />
                <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded-md">
                  4K
                </div>
              </div>

              <div className="text-xs text-green-400 mb-1">Credit saver</div>
              <div className="w-full h-2 bg-gray-700 rounded-full mb-1 relative">
                <div className="w-1/2 h-2 bg-green-400 rounded-full absolute top-0 left-0" />
              </div>
              <div className="flex justify-between text-white/60 text-xs mb-4">
                <span>00:00:00</span>
                <span>20:36</span>
              </div>

              <button className="w-full bg-white text-black font-semibold py-2 rounded-full">
                Get Clips
              </button>

              <p className="text-white/50 text-center text-[10px] mt-3 leading-snug">
                Using video you don’t own may violate copyright laws. By
                continuing, you confirm this is your own original content.{" "}
              </p>

              <div className="flex items-center justify-center">
                <div className="flex gap-2 mt-1 text-center text-white text-[10px] underline">
                  <button>Terms and Conditions</button>
                  <button>Privacy Policy</button>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex-1 bg-black rounded-3xl p-4 md:p-6 flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-3  justify-baseline gap-4">
                <div className="text-white text-sm flex items-center gap-3">
                  <label className="block mb-1 text-white/50">Genre</label>
                  <select className="bg-[#1a1a1a] text-white p-2 rounded-md text-sm">
                    <option>Vlog</option>
                  </select>
                </div>
                <div className="text-white text-sm flex items-center gap-3">
                  <label className="block mb-1 text-white/50">
                    Clip Length
                  </label>
                  <select className="bg-[#1a1a1a] text-white p-2 rounded-md text-sm">
                    <option>&lt;30s</option>
                  </select>
                </div>
                <div className="text-white text-sm  flex items-center gap-3">
                  <label className="block mb-1 text-white/50">Clips</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value="2"
                    className="w-full"
                  />
                  <div className="flex items-center justify-center p-3  rounded bg-[#27272A]">
                    2
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-white/50 text-sm block mb-1">
                    Include specific moments
                  </label>
                  <p className="text-white/40 text-xs mt-1">
                    Not sure how to prompt?{" "}
                    <span className="underline cursor-pointer">Learn more</span>
                  </p>
                </div>
                <input
                  type="text"
                  placeholder="Example: find moments when we talked about the playoffs"
                  className="w-full bg-[#1a1a1a] text-white p-2 rounded-md text-sm"
                />
              </div>

              <div>
                <div className="flex gap-4 mb-7 mt-7 text-white text-sm">
                  <button className="font-semibold">Quick presets</button>
                  <button className="text-white/50">My templates</button>
                </div>
                <div className="flex gap-4 overflow-x-auto">
                  <img
                    src={cardimage}
                    alt="Preset 1"
                    className="w-24 h-36 object-cover rounded-md"
                  />
                  <img
                    src={cardimage}
                    alt="Preset 2"
                    className="w-24 h-36 object-cover rounded-md"
                  />
                  <img
                    src={cardimage}
                    alt="Preset 3"
                    className="w-24 h-36 object-cover rounded-md"
                  />
                </div>
              </div>

              <div className="text-white text-sm flex items-center gap-2 mt-2">
                <label>Choose aspect ratio</label>
                <select className="bg-[#1a1a1a] text-white p-2 rounded-md text-sm">
                  <option>9:16</option>
                </select>
              </div>

              <button className="mt-4 bg-[#1a1a1a] text-white py-2 rounded-md text-sm self-start px-4">
                Save settings above as default
              </button>
            </div>
          </div>
    );
};

export default CreateTab;