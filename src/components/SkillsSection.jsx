export default function SkillsSection({ skills }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Skills</p>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold">Mobile Development</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {skills.mobile.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/80"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Web Development</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {skills.web.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/80"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Core Skills</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {skills.core.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/80"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
