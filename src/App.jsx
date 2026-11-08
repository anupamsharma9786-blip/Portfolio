import React, { useRef } from 'react';
import CanvasScrollAnimation from './components/CanvasScrollAnimation';
import HeroTitleOverlay from './components/HeroTitleOverlay';
import HeroPerspectiveText from './components/HeroPerspectiveText';
import TechnicalSkillsSection from './components/sections/TechnicalSkillsSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ExperienceSection from './components/sections/ExperienceSection';
import ContactSection from './components/sections/ContactSection';

import TopRightNav from './components/TopRightNav';

export default function App() {
  const heroRef = useRef(null);

  return (
    <div className="portfolio-app">
      {/* Permanent Fixed Top-Right Navigation Bar (Visible across all sections) */}
      <TopRightNav />

      {/* =========================================
          HERO SECTION: 
          Pinned scroll track driving the 179-frame
          canvas video animation only for this section.
          Features:
          1. ANUPAM title overlay for 1/4th of scroll
          2. 3D perspective scrolling paragraph for remaining 3/4th
          ========================================= */}
      <div ref={heroRef} className="hero-scroll-track">
        <div className="hero-sticky-viewport">
          <CanvasScrollAnimation heroRef={heroRef} />
          
          {/* Reference Overlay (ANUPAM title, Anupam Sharma on left, AI Engineer on right) */}
          <HeroTitleOverlay heroRef={heroRef} />

          {/* 3D Perspective Scrolling Paragraph in Remaining Space */}
          <HeroPerspectiveText heroRef={heroRef} />
        </div>
      </div>

      {/* =========================================
          TECHNICAL SKILLS SECTION:
          Dark theme, 3D perspective horizontal scrub
          with Devicon brand icons and DevOps spotlight.
          ========================================= */}
      <TechnicalSkillsSection />

      {/* =========================================
          FEATURED PROJECTS SHOWCASE (WHITE THEME):
          Interactive horizontal product showcase
          with large browser UI mockups & editorial layout.
          ========================================= */}
      <ProjectsSection />

      {/* =========================================
          EXPERIENCE SECTION (GIT COMMIT TIMELINE):
          Interactive vertical development history
          with animated Git branch lines & commit nodes.
          ========================================= */}
      <ExperienceSection />

      {/* =========================================
          CONTACT SECTION (WHITE & NEON GREEN THEME):
          Creative editorial contact experience with
          interactive copy email, timezone clock, message terminal,
          and playful hand-drawn SVG doodles.
          ========================================= */}
      <ContactSection />
    </div>
  );
}
