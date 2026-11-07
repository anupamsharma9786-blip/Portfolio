import React from 'react';
import SectionFrame from '../SectionFrame';
import { FolderGit2 } from 'lucide-react';

export default function ProjectsSection() {
  const projects = [
    {
      title: 'Cinematic Scroll Engine',
      description: 'Zero-latency scroll scrubber synchronizing 180 high-res image sequence frames with physical dampening.',
      tags: ['React', 'HTML5 Canvas', 'RequestAnimationFrame', 'Vite'],
      status: 'Live Demo',
    },
    {
      title: 'Lucid Spatial Dashboard',
      description: 'Glassmorphic analytics suite with real-time telemetry, 3D tilt interactions, and dynamic refraction.',
      tags: ['React', 'CSS 3D', 'Tailwind', 'Lucide'],
      status: 'Case Study',
    },
  ];

  return (
    <SectionFrame
      id="projects"
      badge="Projects"
      step="SECTION 03 / 05"
      title="Featured Works & Experiments"
      subtitle="Selected explorations in weightless UI, spatial computing, and canvas performance."
    >
      <div className="lucid-grid-2">
        {projects.map((proj, idx) => (
          <div key={idx} className="lucid-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div className="lucid-card-icon" style={{ margin: 0 }}>
                <FolderGit2 size={20} />
              </div>
              <span className="lucid-tag" style={{ color: 'var(--accent-mint)', borderColor: 'rgba(52, 211, 153, 0.3)' }}>
                {proj.status}
              </span>
            </div>
            <h3 className="lucid-card-title">{proj.title}</h3>
            <p className="lucid-card-desc">{proj.description}</p>
            <div className="lucid-tag-list">
              {proj.tags.map((tag, tIdx) => (
                <span key={tIdx} className="lucid-tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="lucid-placeholder-box">
        <span className="placeholder-text">// Ready for your personal project case studies & live links</span>
        <span className="placeholder-action">Step 3 Ready</span>
      </div>
    </SectionFrame>
  );
}

