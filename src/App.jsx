import { useEffect } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";

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
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    requestAnimationFrame(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({
        behavior: "smooth",
      });
    });
  }, [hash, pathname]);

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
    <HashRouter>
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
    </HashRouter>
  );
}
