export default function ExperienceSection({ experiences }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-fuchsia-300">
          Experience
        </p>
        <h2 className="mt-2 text-2xl font-bold">Professional Background</h2>
        <div className="mt-6 space-y-4 text-white/80">
          {experiences.map((experience) => (
            <div key={experience.title} className="rounded-2xl bg-black/20 p-4">
              <p className="font-semibold">{experience.title}</p>
              <p className="mt-1 text-sm text-white/60">{experience.period}</p>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-white/75">
                {experience.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
