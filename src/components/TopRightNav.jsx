import React, { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { id: 'about', label: 'ABOUT' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'contact', label: 'CONTACT' },
];

export default function TopRightNav() {
  const [activeSection, setActiveSection] = useState('about');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 40);

      // Section detection
      const sections = ['contact', 'experience', 'projects', 'skills'];
      let current = 'about';

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Detect active section when its top reaches near the upper viewport
          if (rect.top <= 280 && rect.bottom >= 150) {
            current = sectionId;
            break;
          }
        }
      }

      setActiveSection(current);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTarget = (id) => {
    if (id === 'about') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (el) {
        const yOffset = -24;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <nav
      className={`fixed-topright-nav ${isScrolled ? 'scrolled-dock' : 'hero-dock'}`}
      aria-label="Permanent Site Navigation"
    >
      {NAV_ITEMS.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollToTarget(item.id)}
            className={`nav-pill-btn ${isActive ? 'active' : ''}`}
            aria-label={`Jump to ${item.label} section`}
          >
            <span>{item.label}</span>
            {isActive && <span className="nav-active-dot" aria-hidden="true" />}
          </button>
        );
      })}
    </nav>
  );
}

