// import backgroundimage from "../../../assets/images/dashboard/home/dashhomebackphoto.png";
// import driveicon from "../../../assets/images/dashboard/home/driveicon.png";
// import uploadicon from "../../../assets/images/dashboard/home/uploadicon.png";
// import homelinkicon from "../../../assets/images/dashboard/home/homelinkicon.png";
// import homecircle from "../../../assets/images/dashboard/home/homecircle.png";
// import cardimage from "../../../assets/images/dashboard/home/cardimage.png";
// import MaxWidthWrapper from "../../../components/wrappers/MaxWidthWrapper";
// const Home = () => {
//   return (
//     <MaxWidthWrapper>
//       <div className="min-h-screen flex items-center justify-center relative w-full">
//         <img
//           src={backgroundimage}
//           alt=""
//           className="absolute hidden md:block w-5/12 top-5 left-[50%] -translate-x-[50%]"
//         />
//         <div className="w-full flex flex-col justify-center items-center gap-10 ">
//           {/* file upload */}
//           <div className="  md:w-6/12 w-10/12 rounded-3xl bg-black relative p-10 flex flex-col items-start justify-center gap-6">
//             <img
//               src={homecircle}
//               alt=""
//               className="absolute left-[50%] -translate-x-[50%] -top-7"
//             />
//             <div className="flex items-center gap-5 justify-between">
//               <div className="flex justify-start items-center gap-2 text-white/50">
//                 <img src={uploadicon} alt="" />
//                 Uplaod
//               </div>
//               <div className="flex justify-start items-center gap-2 text-white/50">
//                 <img src={driveicon} alt="" />
//                 Google Drive
//               </div>
//             </div>

//             <div className="rounded-full bg-[#27272A] w-full p-2 text-white/50 flex items-center justify-start gap-4 ">
//               <img src={homelinkicon} alt="" />
//               Drop a Youtube link
//             </div>
//             <div className="rounded-full bg-white w-full p-2 text-black flex items-center justify-center gap-4 ">
//               Get Clips
//             </div>
//           </div>

//           {/* tab and card */}
//           <div className="w-full p-4 flex flex-col gap-5 ">
//             {/* tab */}
//             <div className="flex items-center justify-between w-full text-white">
//               <div className="flex items-center justify-start gap-4">
//                 <button className="py-2 px-4 rounded-xl bg-black text-white">
//                   Recent projects (2)
//                 </button>
//                 <button className="py-2 px-4 rounded-xl bg-black text-white">
//                   Saved projects (0)
//                 </button>
//               </div>
//               <div>
//                 <span>0 GB</span>/ <span>100 GB</span>
//               </div>
//             </div>

//             {/*  card */}
//             <div className="grid grid-cols-1 md:grid-cols-5 items-center justify-between gap-4">
//               <div className="rounded-md relative bg-black flex flex-col overflow-hidden  justify-center gap-2">
//                 <div className="relative w-full">
//                   <img src={cardimage} alt="" className="object-cover w-full" />
//                   <div className="absolute bottom-0 z-50 w-full py-1 left-[50%] -translate-x-[50%] text-white/50 bg-black/35 blur-md">
//                     4 days before expiring
//                   </div>
//                 </div>
//                 <div className=" absolute top-2 right-2 text-white bg-black p-1 px-2 rounded">
//                   New
//                 </div>
//                {/* content */}
//                <div className="p-2 flex flex-col gap-2">
//                  <div className="text-base text-white ">
//                   I my name is shafi miazi...
//                 </div>
//                 <p className="text-white/40">ClipBasic</p>
//                </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </MaxWidthWrapper>
//   );
// };

// export default Home;



import backgroundimage from "../../../assets/images/dashboard/home/dashhomebackphoto.png";
import driveicon from "../../../assets/images/dashboard/home/driveicon.png";
import uploadicon from "../../../assets/images/dashboard/home/uploadicon.png";
import homelinkicon from "../../../assets/images/dashboard/home/homelinkicon.png";
import homecircle from "../../../assets/images/dashboard/home/homecircle.png";
import cardimage from "../../../assets/images/dashboard/home/cardimage.png";
import MaxWidthWrapper from "../../../components/wrappers/MaxWidthWrapper";

const Home = () => {
  return (
    <MaxWidthWrapper>
      <div className="min-h-screen relative w-full py-10 px-4 md:px-0 flex flex-col items-center justify-center">
        {/* Background image (only for md and up) */}
        <img
          src={backgroundimage}
          alt="Background Design"
          className="absolute hidden md:block w-5/12 top-2 left-1/2 -translate-x-1/2 z-0"
        />

        {/* Upload Section */}
        <div className="relative z-10 w-full  md:w-6/12 rounded-3xl bg-black p-8 md:p-10 flex flex-col items-start gap-6">
          {/* Center Circle */}
          <img
            src={homecircle}
            alt="Upload Circle"
            className="absolute top-[-1.75rem] left-1/2 -translate-x-1/2"
          />

          {/* Upload Options */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 text-white/50">
              <img src={uploadicon} alt="Upload" />
              <span>Upload</span>
            </div>
            <div className="flex items-center gap-2 text-white/50">
              <img src={driveicon} alt="Google Drive" />
              <span>Google Drive</span>
            </div>
          </div>

          {/* Input Field */}
          <div className="rounded-full bg-[#27272A] w-full p-2 px-4 text-white/50 flex items-center gap-4">
            <img src={homelinkicon} alt="Link Icon" />
            <span>Drop a YouTube link</span>
          </div>

          {/* CTA Button */}
          <button className="rounded-full bg-white w-full p-2 text-black font-semibold text-center hover:bg-gray-100 transition">
            Get Clips
          </button>
        </div>

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
      </div>
    </MaxWidthWrapper>
  );
};

export default Home;
