
import { useEffect, useMemo, useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectPreview from "./ProjectPreview";
import { fetchGithubProjects } from "../services/githubApi";

export default function ProjectsSection({ githubUsername }) {
  const [projects, setProjects] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadProjects() {
      setIsLoading(true);
      const items = await fetchGithubProjects(githubUsername);

      if (!mounted) return;

      setProjects(items);
      setSelectedTitle(items[0]?.title ?? "");
      setIsLoading(false);
    }

    loadProjects();

    return () => {
      mounted = false;
    };
  }, [githubUsername]);

  const displayedProjects = useMemo(() => {
    return showAll ? projects : projects.slice(0, 3);
  }, [projects, showAll]);

  const selectedProject = useMemo(() => {
    const fromDisplayed = displayedProjects.find(
      (project) => project.title === selectedTitle
    );

    if (fromDisplayed) return fromDisplayed;

    return displayedProjects[0] ?? null;
  }, [displayedProjects, selectedTitle]);

  useEffect(() => {
    if (!selectedProject && displayedProjects.length > 0) {
      setSelectedTitle(displayedProjects[0].title);
    }
  }, [displayedProjects, selectedProject]);

  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
            Featured Work
          </p>
          <h2 className="mt-2 text-3xl font-bold">Projects</h2>
        </div>

        <div className="hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60 md:block">
          {isLoading
            ? "Loading repositories and screenshots..."
            : "Select a project to explore the simulator"}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="space-y-6">
          {displayedProjects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              isActive={selectedProject?.title === project.title}
              onSelect={() => setSelectedTitle(project.title)}
            />
          ))}

          {projects.length > 3 && (
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="w-full rounded-[24px] border border-white/10 bg-white/5 px-5 py-4 text-sm font-medium text-white/80 transition hover:bg-white/10"
            >
              {showAll ? "Show Less" : "View More Projects"}
            </button>
          )}
        </div>

        {selectedProject ? <ProjectPreview project={selectedProject} /> : null}
      </div>
    </section>
  );
}