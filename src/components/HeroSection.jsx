
export default function HeroSection({ snapshot }) {
  return (
    <section className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-8 py-16">
      

      <div className="mb-8 inline-flex w-fit items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 shadow-lg backdrop-blur">
        {snapshot.badge}
      </div>

      <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_0.7fr]">
    
        <div>
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-cyan-300">
            {snapshot.eyebrow}
          </p>

          <h1 className="text-5xl font-bold sm:text-7xl">
            Ghaliah Abuhejleh
          </h1>

    
          <h2 className="mt-4 max-w-3xl text-2xl font-semibold text-white/80 sm:text-3xl">
            Flutter Engineer building scalable, production-ready mobile experiences.
          </h2>

          {/* DESCRIPTION */}
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
            I specialize in Flutter development, API integration, and creating
            clean, user-focused applications. I turn complex business needs into
            simple, intuitive products that perform reliably in real-world use.
          </p>

          {/* ACTIONS */}
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-2xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 shadow-xl transition hover:scale-[1.03]"
            >
              View Projects
            </a>

            <a
              href="#contact"
              className="rounded-2xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* RIGHT (unchanged, just slightly refined spacing) */}
        <div className="relative">
          <div className="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="absolute -bottom-6 -right-6 h-40 w-40 rounded-full bg-fuchsia-400/20 blur-3xl" />

          <div className="relative rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Quick Snapshot</h2>
              <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-sm text-emerald-300">
                Available for opportunities
              </span>
            </div>

            <div className="space-y-4 text-white/80">
              {snapshot.cards.map((card) => (
                <div key={card.label} className="rounded-2xl bg-black/20 p-4">
                  <p className="text-sm text-white/50">{card.label}</p>
                  <p className="mt-1 font-medium">{card.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}