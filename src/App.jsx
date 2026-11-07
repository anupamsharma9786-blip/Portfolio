import React, { useRef } from 'react';
import CanvasScrollAnimation from './components/CanvasScrollAnimation';
import HeroTitleOverlay from './components/HeroTitleOverlay';
import HeroPerspectiveText from './components/HeroPerspectiveText';
import TechnicalSkillsSection from './components/sections/TechnicalSkillsSection';

export default function App() {
  const heroRef = useRef(null);

  return (
    <div className="portfolio-app">
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
    </div>
  );
}
