import React from 'react';
import SectionFrame from '../SectionFrame';
import { User, Compass } from 'lucide-react';

export default function AboutSection() {
  return (
    <SectionFrame
      id="about"
      badge="About"
      step="SECTION 01 / 05"
      title="Crafting Immersive Digital Realities"
      subtitle="Architecting interactive systems, high-performance web applications, and weightless spatial interfaces."
    >
      <div className="lucid-grid-2">
        <div className="lucid-card">
          <div className="lucid-card-icon">
            <User size={20} />
          </div>
          <h3 className="lucid-card-title">Who I Am</h3>
          <p className="lucid-card-desc">
            Creative technologist and frontend engineer passionate about pushing the boundaries of the browser canvas, motion physics, and user experience.
          </p>
          <div className="lucid-tag-list">
            <span className="lucid-tag">Frontend Engineer</span>
            <span className="lucid-tag">Creative Developer</span>
            <span className="lucid-tag">UI/UX Designer</span>
          </div>
        </div>

        <div className="lucid-card">
          <div className="lucid-card-icon">
            <Compass size={20} />
          </div>
          <h3 className="lucid-card-title">Core Focus</h3>
          <p className="lucid-card-desc">
            Blending cutting-edge WebGL/Canvas graphics with responsive React architectures to create memorable, tactile digital journeys.
          </p>
          <div className="lucid-tag-list">
            <span className="lucid-tag">Interactive 3D</span>
            <span className="lucid-tag">Micro-Interactions</span>
            <span className="lucid-tag">Design Systems</span>
          </div>
        </div>
      </div>

      {/* Customizable Slot for User's Step-by-Step Customization */}
      <div className="lucid-placeholder-box">
        <span className="placeholder-text">// Ready for your personal story & milestones</span>
        <span className="placeholder-action">Step 1 Ready</span>
      </div>
    </SectionFrame>
  );
}

