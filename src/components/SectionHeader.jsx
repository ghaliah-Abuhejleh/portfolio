export default function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="mb-8">
      {eyebrow ? (
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 text-3xl font-bold">{title}</h2>
      {description ? (
        <p className="mt-4 max-w-3xl leading-8 text-white/75">{description}</p>
      ) : null}
    </div>
  );
}
