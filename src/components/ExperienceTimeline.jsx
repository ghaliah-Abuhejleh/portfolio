import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const featureBranches = [
  { label: "Flutter Development", color: "#22c55e" },
  { label: "React Development", color: "#0ea5e9" },
  { label: "Technical Mentorship", color: "#a855f7" },
];

export default function ExperienceTimeline({ experience }) {
  const container = useRef(null);
  const [size, setSize] = useState({ width: 96, height: 300 });
  const reduceMotion = useReducedMotion();
  const isEstarta = /estarta/i.test(experience.title);
  const isHackathon = /hackathon/i.test(experience.title);
  const mergeColor = /fintech/i.test(experience.title) ? "#f43f5e" : "#f59e0b";
  const branches = isEstarta ? featureBranches : isHackathon
    ? [{ label: "Hackathon merge", color: mergeColor }]
    : [];

  useEffect(() => {
    const element = container.current;
    const measure = () => setSize({ width: element.clientWidth, height: element.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const mainX = size.width * (14 / 96);
  const startY = 28;
  const mergeY = Math.max(startY + 80, size.height - 36);
  const travel = mergeY - startY;
  const nodeColor = isEstarta ? "#22c55e" : isHackathon ? mergeColor : "#64748b";

  return (
    <div ref={container} className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-24">
      <svg width="100%" height="100%" viewBox={`0 0 ${size.width} ${size.height}`} className="overflow-visible" role="img" aria-label={isEstarta ? "Estarta feature branches: Flutter Development, React Development, and Technical Mentorship" : isHackathon ? `${experience.title}: hackathon branch and merge` : "Career milestone"}>
        {branches.map(({ label, color }, index) => {
          const branchX = size.width * ((42 + index * 20) / 96);
          const curve = Math.min(48, travel * 0.2);
          return (
            <g key={label}>
              <motion.path
                d={`M ${mainX} ${startY} C ${mainX} ${startY + curve / 2}, ${branchX} ${startY + curve / 2}, ${branchX} ${startY + curve} L ${branchX} ${mergeY - curve} C ${branchX} ${mergeY - curve / 2}, ${mainX} ${mergeY - curve / 2}, ${mainX} ${mergeY}`}
                fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"
                initial={reduceMotion ? false : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: reduceMotion ? 0 : 1.4, delay: reduceMotion ? 0 : index * 0.15, ease: "easeInOut" }}
              />
              <motion.circle
                cx={branchX} cy={startY + travel * (0.4 + index * 0.1)} r={size.width < 60 ? 3 : 4.5}
                fill={color}
                initial={reduceMotion ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }} viewport={{ once: true }}
                transition={{ duration: reduceMotion ? 0 : 0.3, delay: reduceMotion ? 0 : 0.6 + index * 0.15 }}
              ><title>{label}</title></motion.circle>
            </g>
          );
        })}
        <circle cx={mainX} cy={startY} r={size.width < 60 ? 5 : 6} fill={nodeColor} stroke="#0f172a" strokeWidth="2" />
        {branches.length > 0 && (
          <motion.circle cx={mainX} cy={mergeY} r={size.width < 60 ? 3.5 : 5} fill={nodeColor}
            initial={reduceMotion ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: reduceMotion ? 0 : 0.3, delay: reduceMotion ? 0 : 1.4 }} />
        )}
      </svg>
    </div>
  );
}
