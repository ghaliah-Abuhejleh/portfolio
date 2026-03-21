import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import LinkedInSection from "./components/LinkedInSection";
import ExperienceSection from "./components/ExperienceSection";
import EducationCertificationsSection from "./components/EducationCertificationsSection";
import SkillsSection from "./components/SkillsSection";
import ContactSection from "./components/ContactSection";
import {
  heroSnapshot,
  aboutParagraphs,
  linkedinPosts,
  experiences,
  education,
  certifications,
  skills,
  contactLinks,
} from "./data/portfolioData";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <HeroSection snapshot={heroSnapshot} />
      <AboutSection paragraphs={aboutParagraphs} />
      <ProjectsSection githubUsername="ghaliah-Abuhejleh" />
      <LinkedInSection posts={linkedinPosts} />
      <ExperienceSection experiences={experiences} />
      <EducationCertificationsSection
        education={education}
        certifications={certifications}
      />
      <SkillsSection skills={skills} />
      <ContactSection links={contactLinks} />
    </div>
  );
}
