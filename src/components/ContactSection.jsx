import { useEffect, useState } from "react";

export default function ContactSection({ links }) {
  const [visits, setVisits] = useState(0);

  useEffect(() => {
    fetch("https://api.countapi.xyz/hit/ghaliah-portfolio/visits")
      .then((res) => res.json())
      .then((data) => setVisits(data.value))
      .catch(() => {});
  }, []);

  return (
    <section  id="contact"  className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
      <div className="flex flex-col items-start justify-between gap-6 rounded-[32px] border border-white/10 bg-gradient-to-r from-cyan-400/15 to-fuchsia-400/15 p-8 shadow-xl md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold">Let’s connect</h2>
          <p className="mt-2 text-white/75">
            GitHub, LinkedIn, email, and recruiter-friendly contact options.
          </p>

          <p className="mt-6 text-xs text-white/40">
            👀 {visits} visitors
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl bg-white px-4 py-3 font-semibold text-slate-950"
          >
            GitHub
          </a>

          <a
            href={links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-white/20 bg-white/5 px-4 py-3 font-semibold text-white"
          >
            LinkedIn
          </a>

          <a
            href={links.email}
            className="rounded-2xl border border-cyan-300/30 bg-cyan-400/10 px-5 py-3 font-semibold text-cyan-200"
          >
            Email Me
          </a>
         <a
         href={`${process.env.PUBLIC_URL}/Ghaliah_Abu_Hejleh_CV_026.pdf`}
         target="_blank"
         rel="noreferrer"
        className="rounded-2xl bg-cyan-500 px-5 py-3 font-semibold text-white shadow-md hover:bg-cyan-400 transition"
        >
        Download CV
        </a>
        </div>
      </div>
    </section>
  );
}