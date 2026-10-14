import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header";
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

function ScrollToSection() {
  const { state, pathname, key } = useLocation();
  const section = state?.section;

  useEffect(() => {
    if (!section) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const frame = requestAnimationFrame(() => {
      document.getElementById(section)?.scrollIntoView({
        behavior: "smooth",
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [section, pathname, key]);

  return null;
}

function HomePage() {
  return (
    <>
      <HeroSection snapshot={heroSnapshot} />
      <AboutSection paragraphs={aboutParagraphs} />
      <ProjectsSection githubUsername="ghaliah-Abuhejleh" />
      <LinkedInSection posts={linkedinPosts} />
      <SkillsSection skills={skills} />
    </>
  );
}

function ExperiencePage() {
  return (
    <main className="min-h-screen pt-24">
      <ExperienceSection experiences={experiences} />
    </main>
  );
}

function CertificatesPage() {
  return (
    <main className="min-h-screen pt-24">
      <EducationCertificationsSection
        education={education}
        certifications={certifications}
      />
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={new URL(process.env.PUBLIC_URL || "/", window.location.origin).pathname}>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
        <ScrollToSection />
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/certificates" element={<CertificatesPage />} />
        </Routes>

        <ContactSection links={contactLinks} />
      </div>
    </BrowserRouter>
  );
}
