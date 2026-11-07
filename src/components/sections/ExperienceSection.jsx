import React from 'react';
import SectionFrame from '../SectionFrame';
import { Briefcase, Calendar, ChevronRight } from 'lucide-react';

export default function ExperienceSection() {
  const experiences = [
    {
      role: 'Senior Frontend & Creative Developer',
      company: 'Digital Innovation Lab',
      period: '2023 - Present',
      summary: 'Leading frontend architecture for interactive 3D web applications and next-gen spatial user interfaces.',
      highlights: ['Engineered high-throughput 60fps canvas animations', 'Built reusable lucid glass design system'],
    },
    {
      role: 'UI/UX Engineer',
      company: 'Spatial Design Studio',
      period: '2021 - 2023',
      summary: 'Crafted web experiences with micro-interactions, responsive design patterns, and WebGL integrations.',
      highlights: ['Reduced initial asset bundle sizes by 45%', 'Implemented gesture-driven mobile experiences'],
    },
  ];

  return (
    <SectionFrame
      id="experience"
      badge="Experience"
      step="SECTION 04 / 05"
      title="Career Journey & Roles"
      subtitle="Navigating complex challenges across product design, creative engineering, and frontend systems."
    >
      <div className="lucid-grid-2">
        {experiences.map((exp, idx) => (
          <div key={idx} className="lucid-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div className="lucid-card-icon" style={{ margin: 0 }}>
                <Briefcase size={20} />
              </div>
              <span className="lucid-step-indicator" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={12} />
                {exp.period}
              </span>
            </div>
            <h3 className="lucid-card-title">{exp.role}</h3>
            <p className="lucid-card-desc" style={{ color: 'var(--accent-mint)', marginBottom: '12px', fontWeight: 500 }}>
              {exp.company}
            </p>
            <p className="lucid-card-desc" style={{ marginBottom: '16px' }}>{exp.summary}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {exp.highlights.map((h, hIdx) => (
                <div key={hIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <ChevronRight size={14} color="var(--accent-mint)" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="lucid-placeholder-box">
        <span className="placeholder-text">// Ready for your personal job history & company achievements</span>
        <span className="placeholder-action">Step 4 Ready</span>
      </div>
    </SectionFrame>
  );
}

