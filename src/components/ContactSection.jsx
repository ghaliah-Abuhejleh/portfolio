import { Link } from "react-router-dom";

export default function ContactSection({ links }) {
  return (
    <footer
      id="contact"
      className="scroll-mt-20 border-t border-white/10 bg-gradient-to-r from-cyan-400/15 to-fuchsia-400/15"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Let’s connect
            </h2>

            <p className="mt-2 max-w-xl leading-7 text-white/75">
              Have an opportunity or want to collaborate? Feel free to contact
              me by email or LinkedIn.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={links.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-white px-4 py-2.5 font-semibold text-slate-950 transition hover:bg-white/90"
            >
              GitHub
            </a>

            <a
              href={links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 font-semibold text-white transition hover:bg-white/10"
            >
              LinkedIn
            </a>

            <a
              href={links.email}
              className="rounded-xl border border-cyan-300/30 bg-cyan-400/10 px-4 py-2.5 font-semibold text-cyan-200 transition hover:bg-cyan-400/20"
            >
              Email Me
            </a>

            <a
              href={`${process.env.PUBLIC_URL}/Ghaliah_Abu_Hejleh_CV_026.pdf`}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-cyan-500 px-4 py-2.5 font-semibold text-white shadow-md transition hover:bg-cyan-400"
            >
              Download CV
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 py-3 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Ghaliah Abuhejleh</p>
          <Link
            to="/#home"
            className="transition hover:text-cyan-300"
          >
            Back to top ↑
          </Link>
        </div>
      </div>
    </footer>
  );
}
