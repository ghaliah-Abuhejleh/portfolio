export default function ProjectCard({ project, isActive, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group w-full rounded-[28px] border p-6 text-left shadow-xl transition hover:-translate-y-1 ${
        isActive
          ? "border-cyan-300/40 bg-white/[0.08] ring-1 ring-cyan-300/30"
          : "border-white/10 bg-white/5 hover:bg-white/[0.07]"
      }`}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs uppercase tracking-widest text-cyan-300">
          {project.type}
        </span>
        <span className="text-white/30">↗</span>
      </div>

      <h3 className="text-xl font-semibold">{project.title}</h3>

      <p className="mt-3 text-sm leading-6 text-white/70">{project.description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <span
            key={item}
            className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/70"
          >
            {item}
          </span>
        ))}
      </div>

      <a
        href={project.github}
        target="_blank"
        rel="noreferrer"
        title={`You will navigate to GitHub: ${project.title}`}
        aria-label={`You will navigate to GitHub: ${project.title}`}
        className="mt-5 inline-block text-sm font-medium text-cyan-300 transition group-hover:underline"
        onClick={(event) => event.stopPropagation()}
      >
        View Code →
      </a>
    </button>
  );
}
