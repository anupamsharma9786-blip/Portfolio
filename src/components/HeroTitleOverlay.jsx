import React, { useEffect, useRef } from 'react';

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
      // Full visibility from 0.0 to 0.14
      // Smooth fade out from 0.14 to 0.25
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
      {/* Top Framing Row in Pure White */}
      <div className="hero-ref-top-row">
        <div className="hero-ref-tag">FULL STACK DEVELOPER</div>
        <div className="hero-ref-arrow">
          <svg width="42" height="12" viewBox="0 0 42 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="6" x2="38" y2="6" stroke="#ffffff" strokeWidth="1.5" />
            <path d="M34 1L39 6L34 11" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
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
