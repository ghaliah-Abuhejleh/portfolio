import { useState } from "react";

export default function LinkedInSection({ posts }) {
  const [postIndex, setPostIndex] = useState(0);
  const currentPost = posts[postIndex];

  return (
    <section className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-fuchsia-300">
            LinkedIn Highlights
          </p>
          <h2 className="mt-2 text-3xl font-bold">Beyond the code</h2>
          <p className="mt-4 leading-8 text-white/75">
            A glimpse into professional growth, volunteering, and public activity
            that reflects communication, initiative, and continuous learning.
          </p>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-xl">
          <a
            href={currentPost.url}
            target="_blank"
            rel="noreferrer"
            className="block overflow-hidden rounded-2xl border border-white/10 bg-black/20 transition hover:bg-black/30"
          >
            <img
              src={currentPost.image}
              alt={currentPost.caption}
              className="h-72 w-full object-cover"
            />
            <div className="p-4">
              <p className="text-sm uppercase tracking-[0.25em] text-white/40">
                LinkedIn
              </p>
              <p className="mt-2 text-base text-white/80">{currentPost.caption}</p>
            </div>
          </a>

          <div className="mt-5 flex items-center justify-between">
            <button
              type="button"
              onClick={() =>
                setPostIndex((postIndex - 1 + posts.length) % posts.length)
              }
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10"
            >
              Prev
            </button>
            <div className="text-sm text-white/40">
              {postIndex + 1} / {posts.length}
            </div>
            <button
              type="button"
              onClick={() => setPostIndex((postIndex + 1) % posts.length)}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
