import { motion, useReducedMotion } from "framer-motion";
import ExperienceTimeline from "./ExperienceTimeline";

function BranchIcon({ merge = false }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0" aria-hidden="true">
      <circle cx="6" cy="5" r="2" />
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy={merge ? "17" : "5"} r="2" />
      <path d={merge ? "M6 7v10m0-9c0 5 12 1 12 7" : "M6 7v10m0-3c7 0 12-2 12-7"} />
    </svg>
  );
}

export default function ExperienceSection({ experiences }) {
  const reduceMotion = useReducedMotion();

  return (
    <section id="experience" className="mx-auto max-w-7xl px-6 py-16 lg:px-10">

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-fuchsia-300">
              Experience
            </p>
            <h2 className="mt-2 text-2xl font-bold">Professional Background</h2>
          </div>
          <span className="ml-auto inline-flex items-center gap-2 text-sm text-white/60">
            <BranchIcon />
            career/main
          </span>
        </div>
        <div className="relative mt-8 text-white/80">
          <span aria-hidden="true" className="pointer-events-none absolute bottom-0 left-[5.83px] top-7 w-0.5 -translate-x-1/2 rounded-full bg-[#64748b] sm:left-3.5" />
          <ol>
          {experiences.map((experience) => (
            <li key={experience.title} className="relative pb-6 pl-12 last:pb-0 sm:pl-28">
              <ExperienceTimeline experience={experience} />
              <motion.article
                className="rounded-2xl border border-white/10 bg-black/20 p-4 transition-colors hover:border-white/20 motion-reduce:transition-none sm:p-6"
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: reduceMotion ? 0 : 0.55, ease: "easeOut" }}
              >
              {/hackathon/i.test(experience.title) && (
                <p className={`mb-4 flex items-center gap-2 text-sm font-semibold ${/fintech/i.test(experience.title) ? "text-[#f43f5e]" : "text-[#f59e0b]"}`}>
                  <BranchIcon merge />
                  Merge milestone
                </p>
              )}
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="min-w-0 flex-1 basis-56 font-semibold">{experience.title}</h3>
                {/estarta/i.test(experience.title) && (
                  <span className="ml-auto shrink-0 rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-[#22c55e]">
                    Current role
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-white/60">{experience.period}</p>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-white/75">
                {experience.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              </motion.article>
            </li>
          ))}
          </ol>
        </div>
    </section>
  );
}
