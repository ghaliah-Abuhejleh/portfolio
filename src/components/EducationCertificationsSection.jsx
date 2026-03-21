export default function EducationCertificationsSection({
  education,
  certifications,
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-fuchsia-300">
            Certifications
          </p>
          <h2 className="mt-2 text-2xl font-bold">Licenses & Certifications</h2>
          <div className="mt-6 space-y-4 text-white/80">
            {certifications.map((certificate) => (
              <div key={certificate.title} className="rounded-2xl bg-black/20 p-4">
                <p className="font-semibold">{certificate.title}</p>
                <p className="mt-1 text-sm text-white/60">
                  {certificate.issuer} • {certificate.issued}
                </p>
                {certificate.credentialId ? (
                  <p className="mt-2 text-xs text-cyan-300">
                    Credential ID: {certificate.credentialId}
                  </p>
                ) : null}
                <p className="mt-3 text-sm leading-7 text-white/75">
                  {certificate.description}
                </p>
               <div className="mt-4 flex justify-end">
 
{certificate.url && (
  <div className="mt-4 flex justify-end">
    <a
      href={certificate.url}
      target="_blank"
      rel="noreferrer"
      className="text-sm text-cyan-300 hover:underline"
    >
      View Certificate →
    </a>
  </div>
)}
</div>
              </div>
            ))}
          </div>
        </div>
   

    </section>
  );
}
