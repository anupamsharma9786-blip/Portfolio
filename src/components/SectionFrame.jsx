import React from 'react';
import { Sparkles } from 'lucide-react';

export default function SectionFrame({ id, badge, step, title, subtitle, children }) {
  return (
    <section id={id} className="lucid-section-wrapper">
      <div className="lucid-frame">
        {/* Lucid Header */}
        <div className="lucid-frame-header">
          <div className="lucid-badge">
            <Sparkles size={12} />
            <span>{badge}</span>
          </div>
          {step && <span className="lucid-step-indicator">{step}</span>}
        </div>

        {/* Title and Subtitle */}
        {title && <h2 className="lucid-title">{title}</h2>}
        {subtitle && <p className="lucid-subtitle">{subtitle}</p>}

        {/* Content Body */}
        <div className="lucid-frame-body">
          {children}
        </div>
      </div>
    </section>
  );
}

