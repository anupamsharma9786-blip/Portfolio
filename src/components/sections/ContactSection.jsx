import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  ArrowUpRight, 
  MapPin, 
  Clock, 
  FileText,
  Sparkles,
  ArrowUp
} from 'lucide-react';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    projectType: 'Full Stack Web App',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  // Live India Standard Time (IST) Clock
  useEffect(() => {
    function updateClock() {
      try {
        const ist = new Date().toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        });
        setCurrentTime(ist);
      } catch (e) {
        setCurrentTime(new Date().toLocaleTimeString());
      }
    }
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('anupamsharma9786@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;
    
    // Construct mailto link with prefilled details
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${formState.projectType} - from ${formState.name || 'Visitor'}`);
    const body = encodeURIComponent(
      `Hello Anupam,\n\n${formState.message}\n\n---\nFrom: ${formState.name} (${formState.email})\nInterest: ${formState.projectType}`
    );
    window.open(`mailto:anupamsharma9786@gmail.com?subject=${subject}&body=${body}`, '_blank');
    
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const projectTypes = [
    'Full Stack Web App',
    'AI & LLM Integration',
    'Frontend / 3D Experience',
    'Full-Time Opportunity',
    'Just Saying Hi'
  ];

  return (
    <section id="contact" className="contact-creative-section">
      {/* Background Decorative Grid Lines on Pure White */}
      <div className="contact-bg-pattern" aria-hidden="true" />

      <div className="contact-creative-container">
        {/* =========================================
            HEADER BLOCK (EDITORIAL & CREATIVE DOODLES)
            ========================================= */}
        <div className="contact-header-block">
          {/* Eyebrow Status Pill */}
          <div className="contact-eyebrow-row">
            <span className="contact-terminal-tag">~/anupam/contact</span>
            <div className="contact-status-pill">
              <span className="contact-status-dot" />
              <span>OPEN FOR OPPORTUNITIES & FREELANCE</span>
            </div>
          </div>

          {/* Main Headline with Hand-Drawn Doodle Squiggle & Starburst */}
          <div className="contact-headline-wrap">
            <h2 className="contact-main-heading">
              Let's create something{' '}
              <span className="doodle-highlight">
                remarkable
                {/* Hand-drawn neon-green underline squiggle doodle */}
                <svg
                  className="doodle-squiggle"
                  viewBox="0 0 250 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M3 13C35 4 72 15 105 7C140 -2 180 16 215 8C226 5 238 6 247 11"
                    stroke="#10b981"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              .
            </h2>

            {/* Hand-drawn neon-green starburst doodle */}
            <svg
              className="doodle-starburst"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M24 2V46M2 24H46M8 8L40 40M40 8L8 40"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <p className="contact-subheading">
            Whether you have a breakthrough product idea, an engineering role to fill, or want to explore AI & full-stack development, my inbox is always open. Let's talk.
          </p>
        </div>

        {/* =========================================
            INTERACTIVE CONTACT GRID
            Left: Direct Channels & Timezone Hub
            Right: Creative Message Dispatcher
            ========================================= */}
        <div className="contact-interactive-grid">
          {/* -------------------------------------
              LEFT COLUMN: Direct Channels & Presence
              ------------------------------------- */}
          <div className="contact-channels-column">
            {/* Primary Interactive Email Box */}
            <div className="contact-card email-spotlight-card">
              {/* Hand-Drawn Curved Arrow Doodle pointing to Email */}
              <div className="doodle-arrow-container" aria-hidden="true">
                <svg
                  className="doodle-curly-arrow"
                  viewBox="0 0 110 55"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 10 C 45 4, 75 8, 85 30 C 90 42, 75 48, 62 45 C 50 42, 52 28, 68 25 C 85 22, 98 38, 102 48"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M94 45L103 49L105 39"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="doodle-arrow-label">direct channel ✦</span>
              </div>

              <div className="card-top-header">
                <div className="card-icon-bubble">
                  <Mail size={18} className="icon-emerald" />
                </div>
                <span className="card-micro-label">PRIMARY INBOX</span>
              </div>

              <div className="email-address-row">
                <span className="email-text-display">anupamsharma9786@gmail.com</span>
              </div>

              <div className="email-action-buttons">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={`contact-action-btn copy-btn ${copied ? 'copied' : ''}`}
                  aria-label="Copy email address to clipboard"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="btn-icon" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} className="btn-icon" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>

                <a
                  href="mailto:anupamsharma9786@gmail.com"
                  className="contact-action-btn mailto-btn"
                  aria-label="Open default mail client"
                >
                  <span>Open Mail Client</span>
                  <ArrowUpRight size={14} className="btn-icon" />
                </a>
              </div>
            </div>

            {/* Presence & Timezone Card */}
            <div className="contact-card presence-card">
              <div className="card-top-header">
                <div className="card-icon-bubble">
                  <Clock size={18} className="icon-emerald" />
                </div>
                <span className="card-micro-label">LOCATION & LOCAL TIME</span>
              </div>

              <div className="presence-content-row">
                <div className="presence-item">
                  <span className="presence-item-label">
                    <MapPin size={13} className="inline-icon" /> Based in
                  </span>
                  <span className="presence-item-val">India (IST)</span>
                </div>

                <div className="presence-item">
                  <span className="presence-item-label">
                    <Clock size={13} className="inline-icon" /> Current Time
                  </span>
                  <span className="presence-item-val clock-digits">
                    {currentTime || 'Loading...'}
                  </span>
                </div>
              </div>

              <div className="presence-status-bar">
                <span className="status-indicator-dot" />
                <span className="status-text">Average response time: &lt; 24 hours</span>
              </div>
            </div>

            {/* Quick Profiles Grid */}
            <div className="contact-socials-row">
              <a
                href="https://www.linkedin.com/in/anupam-sharma9786"
                target="_blank"
                rel="noopener noreferrer"
                className="social-micro-card"
                aria-label="LinkedIn Profile"
              >
                <div className="social-micro-left">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="social-svg">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28" />
                  </svg>
                  <span>LinkedIn</span>
                </div>
                <ArrowUpRight size={13} className="social-arrow" />
              </a>

              <a
                href="https://github.com/anupamsharma9786-blip"
                target="_blank"
                rel="noopener noreferrer"
                className="social-micro-card"
                aria-label="GitHub Profile"
              >
                <div className="social-micro-left">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="social-svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                  <span>GitHub</span>
                </div>
                <ArrowUpRight size={13} className="social-arrow" />
              </a>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="social-micro-card"
                aria-label="Resume PDF Download"
              >
                <div className="social-micro-left">
                  <FileText size={15} className="social-svg" />
                  <span>Resume</span>
                </div>
                <ArrowUpRight size={13} className="social-arrow" />
              </a>
            </div>
          </div>

          {/* -------------------------------------
              RIGHT COLUMN: Interactive Message Terminal
              ------------------------------------- */}
          <div className="contact-form-column">
            <div className="contact-card message-terminal-card">
              {/* Decorative Sketched Circular Stamp Doodle */}
              <div className="doodle-stamp-container" aria-hidden="true">
                <svg
                  className="doodle-stamp-circle"
                  viewBox="0 0 80 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="#10b981"
                    strokeWidth="1.8"
                    strokeDasharray="4 3"
                  />
                  <path
                    d="M26 40L35 49L54 29"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="doodle-stamp-text">DIRECT DISPATCH</span>
              </div>

              <div className="card-top-header">
                <div className="card-icon-bubble">
                  <Send size={18} className="icon-emerald" />
                </div>
                <span className="card-micro-label">SEND A DIRECT MESSAGE</span>
              </div>

              <form onSubmit={handleSubmit} className="contact-form">
                {/* Topic / Project Type Pills */}
                <div className="form-group">
                  <label className="form-label">WHAT CAN WE BUILD TOGETHER?</label>
                  <div className="project-type-pills">
                    {projectTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormState({ ...formState, projectType: type })}
                        className={`type-pill ${formState.projectType === type ? 'active' : ''}`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Email Row */}
                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="contact-name" className="form-label">YOUR NAME</label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Anupam Sharma"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-email" className="form-label">YOUR EMAIL</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="hello@company.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">MESSAGE</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="Tell me about your vision, project goals, timeline, or open role..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="form-textarea"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="form-submit-btn"
                >
                  <span>Transmit Message</span>
                  <Send size={15} className="submit-icon" />
                </button>

                {submitted && (
                  <div className="form-success-banner" role="status">
                    <Check size={16} className="success-icon" />
                    <span>Your mail client has been opened with your pre-filled inquiry. Talk soon!</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* =========================================
            EDITORIAL FOOTER BAR
            ========================================= */}
        <footer className="contact-footer-bar">
          <div className="footer-left">
            <span className="footer-brand">ANUPAM SHARMA</span>
            <span className="footer-divider">•</span>
            <span className="footer-copyright">© {new Date().getFullYear()} All rights reserved.</span>
          </div>

          <div className="footer-center">
            <span className="footer-tech-note">Designed & Engineered with React, Canvas & Modern Web Standards</span>
          </div>

          <div className="footer-right">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="back-to-top-btn"
              aria-label="Back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp size={13} className="btn-arrow" />
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}
