import SectionHeader from "./SectionHeader";

export default function AboutSection({ paragraphs }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
      <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur">
        <SectionHeader title="About Me" />
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="mt-4 max-w-4xl leading-8 text-white/75">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
