

// import { useEffect, useState } from "react";

// export default function ProjectPreview({ project }) {
//   const [index, setIndex] = useState(0);

//   const images = project?.screenshots || [];

//   useEffect(() => {
//     setIndex(0);
//   }, [project?.title]);

//   const currentImage = images[index];

//   return (
    
//     <div className="sticky top-2
//     ">
//       <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">


//         <div className="flex justify-center">
//           <div className="relative w-[290px] rounded-[3rem] border border-white/15 bg-zinc-950 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
//             <div className="absolute left-1/2 top-3 h-7 w-28 -translate-x-1/2 rounded-b-3xl bg-black" />

//             <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-black">
//               {currentImage ? (
//                 <img
//                   src={currentImage}
//                   alt={`${project.title} screenshot ${index + 1}`}
//                   className="h-[560px] w-full object-cover"
//                 />
//               ) : (
//                 <div className="flex h-[560px] items-center justify-center px-8 text-center">
//                   <div>
//                     <p className="text-2xl font-semibold text-white">
//                       {project.previewText}
//                     </p>
//                     <p className="mt-4 text-xs uppercase tracking-[0.25em] text-white/40">
//                       you have to run it to find out
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {images.length > 1 && (
//               <div className="mt-4 flex items-center justify-between text-sm text-white/60 px-6">
//                 <button
//                   type="button"
//                   onClick={() =>
//                     setIndex((prev) => (prev - 1 + images.length) % images.length)
//                   }
//                   className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 transition hover:bg-white/10"
//                 >
//                   Prev
//                 </button>

//                 <span>
//                   {index + 1} / {images.length}
//                 </span>

//                 <button
//                   type="button"
//                   onClick={() =>
//                     setIndex((prev) => (prev + 1) % images.length)
//                   }
//                   className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 transition hover:bg-white/10"
//                 >
//                   Next
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";

export default function ProjectPreview({ project }) {
  const [index, setIndex] = useState(0);

  const images = project?.screenshots || [];
  const currentImage = images[index];

  const isLaptop =
    project?.device === "laptop" ||
    /web|react|javascript|html|css/i.test(project?.type);

  useEffect(() => {
    setIndex(0);
  }, [project?.title]);

  const changeImage = (direction) => {
    setIndex(
      (current) =>
        (current + direction + images.length) % images.length
    );
  };

  const screen = currentImage ? (
    <img
      src={currentImage}
      alt={`${project.title} screenshot ${index + 1}`}
      className={`w-full ${
        isLaptop
          ? "aspect-video object-contain"
          : "h-[560px] object-cover"
      }`}
    />
  ) : (
    <div
      className={`flex items-center justify-center px-8 text-center ${
        isLaptop ? "aspect-video" : "h-[560px]"
      }`}
    >
      <div>
        <p className="text-2xl font-semibold text-white">
          {project.previewText}
        </p>

        <p className="mt-4 text-xs uppercase tracking-[0.25em] text-white/40">
          Add screenshots to the repository to preview them here
        </p>
      </div>
    </div>
  );

  return (
    <div className="sticky top-24">
      <div className="rounded-[32px] border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-xl sm:p-6">
        <div className="flex justify-center">
          {isLaptop ? (
            // Laptop frame
            <div className="w-full max-w-[680px]">
              <div className="rounded-t-2xl border-[10px] border-zinc-950 bg-black shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
                <div className="overflow-hidden rounded-md border border-white/10 bg-black">
                  {screen}
                </div>
              </div>

              <div className="mx-auto h-3 w-[86%] rounded-b-xl bg-gradient-to-b from-zinc-300 to-zinc-500" />

              <div className="mx-auto h-1.5 w-[28%] rounded-b-full bg-zinc-600" />
            </div>
          ) : (
            // Phone frame
            <div className="relative w-[290px] rounded-[3rem] border border-white/15 bg-zinc-950 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
              <div className="absolute left-1/2 top-3 z-10 h-7 w-28 -translate-x-1/2 rounded-b-3xl bg-black" />

              <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-black">
                {screen}
              </div>
            </div>
          )}
        </div>

        {images.length > 1 && (
          <div className="mt-5 flex items-center justify-center gap-5 text-sm text-white/60">
            <button
              type="button"
              onClick={() => changeImage(-1)}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
            >
              Prev
            </button>

            <span>
              {index + 1} / {images.length}
            </span>

            <button
              type="button"
              onClick={() => changeImage(1)}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
