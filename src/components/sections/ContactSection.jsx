import React from 'react';
import SectionFrame from '../SectionFrame';
import { Mail, Send, Globe, AtSign, ArrowUpRight } from 'lucide-react';

export default function ContactSection() {
  return (
    <SectionFrame
      id="contact"
      badge="Contact"
      step="SECTION 05 / 05"
      title="Initiate Connection"
      subtitle="Have an ambitious project in mind, a creative inquiry, or looking to collaborate? Let's talk."
    >
      <div className="lucid-grid-2">
        <div className="lucid-card">
          <div className="lucid-card-icon">
            <Mail size={20} />
          </div>
          <h3 className="lucid-card-title">Direct Inquiries</h3>
          <p className="lucid-card-desc">
            Feel free to reach out directly via email for project inquiries, consulting, or tech architecture discussions.
          </p>
          <div style={{ marginTop: '20px' }}>
            <a
              href="mailto:contact@example.com"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--text-main)',
                textDecoration: 'none',
                background: 'rgba(52, 211, 153, 0.12)',
                border: '1px solid rgba(52, 211, 153, 0.28)',
                padding: '10px 18px',
                borderRadius: '12px',
                fontSize: '13.5px',
                fontWeight: 600,
                transition: 'all 0.2s ease',
              }}
            >
              <Send size={14} color="var(--accent-mint)" />
              <span>contact@example.com</span>
            </a>
          </div>
        </div>

        <div className="lucid-card">
          <div className="lucid-card-icon">
            <Globe size={20} />
          </div>
          <h3 className="lucid-card-title">Social Ecosystem</h3>
          <p className="lucid-card-desc">
            Follow my latest experiments, engineering write-ups, and open-source releases across platforms.
          </p>
          <div className="lucid-tag-list" style={{ marginTop: '20px' }}>
            <span className="lucid-tag" style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <AtSign size={12} /> GitHub
              <ArrowUpRight size={10} />
            </span>
            <span className="lucid-tag" style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <AtSign size={12} /> LinkedIn
              <ArrowUpRight size={10} />
            </span>
            <span className="lucid-tag" style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <AtSign size={12} /> X / Twitter
              <ArrowUpRight size={10} />
            </span>
          </div>
        </div>
      </div>

      <div className="lucid-placeholder-box">
        <span className="placeholder-text">// Ready for your personal email, contact form & social links</span>
        <span className="placeholder-action">Step 5 Ready</span>
      </div>
    </SectionFrame>
  );
}
