

import { useEffect, useState } from "react";

export default function ProjectPreview({ project }) {
  const [index, setIndex] = useState(0);

  const images = project?.screenshots || [];

  useEffect(() => {
    setIndex(0);
  }, [project?.title]);

  const currentImage = images[index];

  return (
    <div className="sticky top-10">
      <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
        <h3 className="mb-5 text-lg text-white/70">App Preview</h3>

        <div className="flex justify-center">
          <div className="relative w-[290px] rounded-[3rem] border border-white/15 bg-zinc-950 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
            <div className="absolute left-1/2 top-3 h-7 w-28 -translate-x-1/2 rounded-b-3xl bg-black" />

            <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-black">
              {currentImage ? (
                <img
                  src={currentImage}
                  alt={`${project.title} screenshot ${index + 1}`}
                  className="h-[560px] w-full object-cover"
                />
              ) : (
                <div className="flex h-[560px] items-center justify-center px-8 text-center">
                  <div>
                    <p className="text-2xl font-semibold text-white">
                      {project.previewText}
                    </p>
                    <p className="mt-4 text-xs uppercase tracking-[0.25em] text-white/40">
                      you have to run it to find out
                    </p>
                  </div>
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="mt-4 flex items-center justify-between text-sm text-white/60">
                <button
                  type="button"
                  onClick={() =>
                    setIndex((prev) => (prev - 1 + images.length) % images.length)
                  }
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 transition hover:bg-white/10"
                >
                  Prev
                </button>

                <span>
                  {index + 1} / {images.length}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setIndex((prev) => (prev + 1) % images.length)
                  }
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 transition hover:bg-white/10"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
