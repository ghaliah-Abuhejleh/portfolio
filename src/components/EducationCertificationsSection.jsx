import { useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const focusStyles = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-900";

function ExpandIcon({ expanded }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"
      className={`h-4 w-4 transition-transform motion-reduce:transition-none ${expanded ? "rotate-180" : ""}`} aria-hidden="true">
      <path d="m5 7.5 5 5 5-5" />
    </svg>
  );
}

function Collapsible({ open, id, children }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div id={id} initial={false}
      animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.2 }}
      style={{ visibility: open ? "visible" : "hidden" }}
      aria-hidden={!open} className="overflow-hidden">
      {children}
    </motion.div>
  );
}

function CertificateDetails({ certificate }) {
  return (
    <>
      <p className="mt-2 text-sm text-white/60">
        {certificate.issuer} <span aria-hidden="true">&middot;</span> {certificate.issued}
      </p>
      <p className="mt-4 text-sm leading-7 text-white/75">{certificate.description}</p>
      {certificate.credentialId && (
        <p className="mt-3 break-words text-xs leading-5 text-white/50">
          Credential ID: {certificate.credentialId}
        </p>
      )}
    </>
  );
}

function CredentialLink({ certificate, compact = false }) {
  if (!/^https?:\/\//i.test(certificate.url || "")) return null;
  return (
    <a href={certificate.url} target="_blank" rel="noreferrer"
      aria-label={`View credential for ${certificate.title} (opens in a new tab)`}
      title={`View credential for ${certificate.title}`}
      className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-lg text-sm font-medium text-cyan-300 transition hover:text-cyan-200 motion-reduce:transition-none ${compact ? "h-11 w-11 hover:bg-white/5" : ""} ${focusStyles}`}>
      {!compact && "View Credential"}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden="true">
        <path d="M14 4h6v6m0-6-10 10M10 5H5v14h14v-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

function CertificationCard({ certificate }) {
  const [expanded, setExpanded] = useState(false);
  const coursesId = useId();
  const courses = certificate.courses || [];
  return (
    <article className="flex h-full min-w-0 flex-col rounded-2xl border border-white/10 bg-black/20 p-5 transition-colors hover:border-cyan-300/30 motion-reduce:transition-none sm:p-6">
      <div className="flex flex-1 items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white p-2.5 sm:h-14 sm:w-14">
          <img
            src={`${process.env.PUBLIC_URL}/images/issuers/${certificate.issuer.toLowerCase()}.svg`}
            alt={`${certificate.issuer} logo`}
            width="36"
            height="36"
            className="h-full w-full object-contain"
          />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold leading-7 text-white sm:text-xl">{certificate.title}</h3>
          <CertificateDetails certificate={certificate} />
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-white/60">
            {courses.length > 0 && (
              <span className="rounded-full bg-white/10 px-3 py-1 font-medium text-white/90">
                {courses.length} Courses
              </span>
            )}
            <span>{courses.length ? (certificate.issuer === "Google" ? "Professional Certificate" : "Specialization") : "Individual certificate"}</span>
            <CredentialLink certificate={certificate} />
          </div>
        </div>
      </div>
        {courses.length > 0 && (
          <button type="button" aria-expanded={expanded} aria-controls={coursesId}
            aria-label={`${expanded ? "Hide" : "View"} courses for ${certificate.title}`}
            onClick={() => setExpanded((value) => !value)}
            className={`mt-5 flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-3 text-sm font-semibold text-white/80 transition hover:border-cyan-300/40 hover:bg-white/5 motion-reduce:transition-none ${focusStyles}`}>
            {expanded ? "Hide Courses" : "View Courses"}
            <ExpandIcon expanded={expanded} />
          </button>
        )}
      <Collapsible open={expanded} id={coursesId}>
        <ol className="mt-3 divide-y divide-white/10 px-1 sm:px-4">
          {courses.map((course, index) => (
            <li key={course.id} className="flex items-start gap-3 py-6 sm:gap-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mt-1 h-6 w-6 shrink-0 text-white/60" aria-hidden="true">
                <circle cx="12" cy="8" r="5" />
                <path d="m8.5 12-1 9 4.5-3 4.5 3-1-9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="min-w-0 flex-1">
                <h4 className="font-semibold leading-6 text-white/90 sm:text-lg">{course.title}</h4>
                <p className="mt-1 text-xs text-white/50">Course {index + 1}</p>
                <CertificateDetails certificate={course} />
              </div>
              <CredentialLink certificate={course} compact />
            </li>
          ))}
        </ol>
      </Collapsible>
    </article>
  );
}

export default function EducationCertificationsSection({ certifications }) {
  const [showAll, setShowAll] = useState(false);
  const moreId = useId();
  const remaining = certifications.slice(4);
  return (
    <section id="certificates" aria-labelledby="certifications-heading" className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <p className="text-sm uppercase tracking-[0.3em] text-fuchsia-300">Certifications</p>
        <h2 id="certifications-heading" className="mt-2 text-2xl font-bold">Licenses &amp; Certifications</h2>
        <div className="mt-6 grid items-stretch gap-5 md:grid-cols-2">
          {certifications.slice(0, 4).map((certificate) => (
            <CertificationCard key={certificate.id} certificate={certificate} />
          ))}
        </div>
        {remaining.length > 0 && (
          <>
            <Collapsible open={showAll} id={moreId}>
              <div className="grid items-stretch gap-5 pt-5 md:grid-cols-2">
                {remaining.map((certificate) => (
                  <CertificationCard key={certificate.id} certificate={certificate} />
                ))}
              </div>
            </Collapsible>
            <div className="mt-8 flex justify-center">
              <button type="button" aria-expanded={showAll} aria-controls={moreId}
                onClick={() => setShowAll((value) => !value)}
                className={`inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 transition hover:border-cyan-300/40 hover:bg-white/10 motion-reduce:transition-none ${focusStyles}`}>
                {showAll ? "View Less Certifications" : "View More Certifications"}
                <ExpandIcon expanded={showAll} />
              </button>
            </div>
          </>
        )}
    </section>
  );
}
