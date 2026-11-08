import React, { useEffect, useRef } from 'react';
import { Mail, FileText, ArrowUpRight } from 'lucide-react';

export default function HeroTitleOverlay({ heroRef }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    function handleScroll() {
      if (!heroRef || !heroRef.current || !overlayRef.current) return;

      const heroEl = heroRef.current;
      const rect = heroEl.getBoundingClientRect();
      const totalScrollable = heroEl.offsetHeight - window.innerHeight;

      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));

      // Active for the 1/4th part (0.0 to 0.25):
      // Full visibility from 0.0 to 0.12
      // Smooth fade out from 0.12 to 0.25
      const FADE_START = 0.12;
      const FADE_END = 0.25;

      let opacity = 1;
      let translateY = 0;
      let scale = 1;

      if (progress <= FADE_START) {
        opacity = 1;
        translateY = 0;
        scale = 1;
      } else if (progress <= FADE_END) {
        const t = (progress - FADE_START) / (FADE_END - FADE_START);
        opacity = Math.max(0, 1 - t);
        translateY = -25 * t;
        scale = 1 - 0.04 * t;
      } else {
        opacity = 0;
        translateY = -30;
        scale = 0.96;
      }

      const el = overlayRef.current;
      el.style.opacity = opacity.toFixed(3);
      el.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
      el.style.pointerEvents = opacity > 0.05 ? 'auto' : 'none';
      el.style.visibility = opacity <= 0 ? 'hidden' : 'visible';
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [heroRef]);

  return (
    <div ref={overlayRef} className="hero-reference-overlay">
      {/* Top Framing Row */}
      <div className="hero-ref-top-row">
        {/* Top Left Cluster: FULL STACK DEVELOPER + All 4 Background-Free Contact Buttons Below */}
        <div className="hero-topleft-cluster">
          <div className="hero-ref-tag">FULL STACK DEVELOPER</div>

          <div className="hero-topleft-links" aria-label="Social and Resume Links">
            {/* 1. LinkedIn */}
            <a
              href="https://www.linkedin.com/in/anupam-sharma9786"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-topleft-btn"
              aria-label="LinkedIn Profile - Anupam Sharma"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="topleft-btn-icon">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28" />
              </svg>
              <span>LINKEDIN</span>
              <ArrowUpRight size={12} className="topleft-btn-arrow" />
            </a>

            {/* 2. GitHub */}
            <a
              href="https://github.com/anupamsharma9786-blip"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-topleft-btn"
              aria-label="GitHub Profile - anupamsharma9786-blip"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="topleft-btn-icon">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span>GITHUB</span>
              <ArrowUpRight size={12} className="topleft-btn-arrow" />
            </a>

            {/* 3. Email */}
            <a
              href="mailto:anupamsharma9786@gmail.com"
              className="hero-topleft-btn"
              aria-label="Send Email to anupamsharma9786@gmail.com"
            >
              <Mail size={12} className="topleft-btn-icon" />
              <span>EMAIL</span>
              <ArrowUpRight size={12} className="topleft-btn-arrow" />
            </a>

            {/* 4. Resume */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-topleft-btn"
              aria-label="View Resume PDF"
            >
              <FileText size={12} className="topleft-btn-icon" />
              <span>RESUME</span>
              <ArrowUpRight size={12} className="topleft-btn-arrow" />
            </a>
          </div>
        </div>

        {/* Top Right Spacer (TopRightNav is permanently fixed at this exact position) */}
        <div className="hero-ref-topright-spacer" aria-hidden="true" />
      </div>

      {/* Center Broad ANUPAM Title with Broad Font and Transparent Center Letters */}
      <div className="hero-ref-center-title" aria-label="ANUPAM">
        <span className="hero-letter solid">A</span>
        <span className="hero-letter outline">N</span>
        <span className="hero-letter outline">U</span>
        <span className="hero-letter outline">P</span>
        <span className="hero-letter outline">A</span>
        <span className="hero-letter solid">M</span>
      </div>

      {/* Bottom Framing Row: B.Tech (2 lines) on Left, AI • DevOps • Web Engineering on Right */}
      <div className="hero-ref-bottom-row">
        <div className="hero-ref-name">
          <span>B.TECH</span>
          <span>INFORMATION TECHNOLOGY</span>
        </div>

        <div className="hero-ref-role">AI • DEVOPS • WEB ENGINEERING</div>
      </div>
    </div>
  );
}
