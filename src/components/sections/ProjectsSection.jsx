import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Cpu,
  Layers,
  Eye,
  Monitor,
  Music,
  ScanSearch
} from 'lucide-react';

// =========================================
// PROJECTS DATA (3 Specific Projects)
// =========================================
const PROJECTS_DATA = [
  {
    id: 'emotion-music',
    number: '01',
    category: 'Full Stack Development',
    title: 'Emotion-Based Music Recommendation System',
    url: 'https://emotion-music.ai',
    image: '/projects/emotion-music-preview.png',
    icon: Music,
    description:
      'A full-stack web application that detects facial expressions in real time and recommends music based on the user\'s emotional state.',
    technologies: [
      { name: 'React.js', devicon: 'devicon-react-original colored' },
      { name: 'Node.js', devicon: 'devicon-nodejs-plain colored' },
      { name: 'Express.js', devicon: 'devicon-express-original' },
      { name: 'MongoDB', devicon: 'devicon-mongodb-plain colored' },
      { name: 'Google MediaPipe' },
    ],
    features: [
      'Real-time webcam integration.',
      'Facial expression detection using Google MediaPipe.',
      'Backend services using Node.js and Express.',
      'MongoDB for storing song metadata and emotion-based mappings.',
      'User authentication with login and signup.',
      'Full MERN stack architecture.',
    ],
    previewFallback: {
      type: 'emotion-music',
      badge: 'LIVE WEBCAM STREAM',
      metric1: 'EMOTION: HAPPY (96%)',
      metric2: 'Now Playing: Midnight City',
    },
  },
  {
    id: 'web-os-portfolio',
    number: '02',
    category: 'Frontend Development',
    title: 'Web-Based OS Portfolio',
    url: 'https://web-os.dev',
    image: '/projects/web-os-preview.png',
    icon: Monitor,
    description:
      'An interactive portfolio designed as a browser-based desktop environment that simulates an operating system experience.',
    technologies: [
      { name: 'React.js', devicon: 'devicon-react-original colored' },
      { name: 'JavaScript', devicon: 'devicon-javascript-plain colored' },
      { name: 'CSS3', devicon: 'devicon-css3-plain colored' },
      { name: 'Window Manager' },
      { name: 'Spatial UI' },
    ],
    features: [
      'Desktop-style interface using React.',
      'Draggable and resizable application windows.',
      'Multi-window application management.',
      'Modular applications for projects, about and contact.',
      'Responsive interface with smooth interactions.',
    ],
    previewFallback: {
      type: 'web-os',
      badge: 'VIRTUAL DESKTOP ENGINE',
      metric1: 'Window Manager: 60 FPS active',
      metric2: 'Subsystems: Projects, Terminal, Skills',
    },
  },
  {
    id: 'ai-image-detector',
    number: '03',
    category: 'AI / Machine Learning',
    title: 'AI-Generated Image Detection System',
    url: 'https://ai-authenticity.vision',
    image: '/projects/ai-image-detector-preview.png',
    icon: ScanSearch,
    description:
      'An AI-powered image analysis platform designed to identify whether an uploaded image may have been generated using artificial intelligence.',
    technologies: [
      { name: 'Computer Vision' },
      { name: 'Deep Learning' },
      { name: 'Image Analysis Pipeline' },
      { name: 'FastAPI Architecture' },
    ],
    features: [
      'Image upload and preview.',
      'AI-based image analysis.',
      'Detection result visualization.',
      'Confidence score presentation.',
      'Image analysis dashboard.',
    ],
    previewFallback: {
      type: 'ai-detector',
      badge: 'IMAGE INTEGRITY SCANNER',
      metric1: 'Verdict: AI Generated (94.2%)',
      metric2: 'Analysis: Frequency & Noise Artifacts',
    },
  },
];

// =========================================
// SLIDE & OPTICAL FOCUS ANIMATION VARIANTS
// =========================================
const previewVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
    scale: 0.96,
    filter: 'blur(7px)',
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      x: { type: 'spring', stiffness: 280, damping: 28 },
      opacity: { duration: 0.38, ease: 'easeOut' },
      scale: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
      filter: { duration: 0.36, ease: 'easeOut' },
    },
  },
  exit: (direction) => ({
    x: direction > 0 ? -50 : 50,
    opacity: 0,
    scale: 0.97,
    filter: 'blur(6px)',
    transition: {
      x: { duration: 0.25, ease: 'easeIn' },
      opacity: { duration: 0.2 },
      scale: { duration: 0.25 },
      filter: { duration: 0.2 },
    },
  }),
};

const infoVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: 'spring', stiffness: 280, damping: 28, delay: 0.05 },
      opacity: { duration: 0.35, delay: 0.05 },
    },
  },
  exit: (direction) => ({
    x: direction > 0 ? -30 : 30,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: 'easeIn'
    },
  }),
};

export default function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [imgErrors, setImgErrors] = useState({});

  const project = PROJECTS_DATA[currentIndex];

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % PROJECTS_DATA.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleImgError = (id) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="projects" className="projects-showcase-section">
      {/* Background Grid Pattern on Pure White */}
      <div className="projects-white-bg-grid" />

      <div className="projects-container">
        {/* =========================================
            SECTION HEADER
            ========================================= */}
        <div className="projects-editorial-header">
          <div className="header-eyebrow-row">
            <span className="eyebrow-dot" />
            <span className="eyebrow-label">SELECTED WORK / 2025–2026</span>
          </div>

          <div className="header-title-row">
            <h2 className="header-main-heading">
              Things I've <span className="heading-highlight">Built.</span>
            </h2>
            <p className="header-supporting-desc">
              Selected web applications, user interfaces, and systems built with React, Node.js, and modern APIs.
            </p>
          </div>
        </div>

        {/* =========================================
            INTERACTIVE PROJECT SHOWCASE STAGE WITH SIDE NAVIGATION
            ========================================= */}
        <div className="project-showcase-stage">
          {/* Previous Project Navigation Button (Left Side) */}
          <button
            type="button"
            onClick={handlePrev}
            className="project-side-nav-btn nav-btn-prev"
            aria-label="Previous project"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="project-showcase-card">
            {/* LEFT COLUMN: Large Browser UI Preview with Cinematic Optical Lens Distortion (55-60%) */}
            <div className="showcase-preview-column">
              <motion.div
                className="optical-lens-wrapper"
                initial={{ opacity: 0, y: 35, rotateX: 2.5, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="browser-window-frame cinematic-curved-lens">
                  {/* Window Chrome Header */}
                  <div className="browser-chrome-bar">
                    <div className="chrome-traffic-lights">
                      <span className="dot dot-red" />
                      <span className="dot dot-yellow" />
                      <span className="dot dot-green" />
                    </div>

                    <div className="chrome-address-box">
                      <span className="address-lock">🔒</span>
                      <span className="address-url">{project.url}</span>
                    </div>

                    <div className="chrome-category-tag">
                      <span className="tag-pulse-dot" />
                      <span>{project.category}</span>
                    </div>
                  </div>

                  {/* Cylindrical Curved Window Body */}
                  <div className="browser-window-body curved-lens-body">
                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.div
                        key={project.id}
                        custom={direction}
                        variants={previewVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="browser-viewport-inner optical-curved-viewport"
                      >
                        {!imgErrors[project.id] ? (
                          <div className="preview-image-wrapper">
                            <img
                              src={project.image}
                              alt={`${project.title} - UI Preview Mockup`}
                              className="project-mockup-image"
                              onError={() => handleImgError(project.id)}
                              loading="eager"
                            />

                            {/* OPTICAL LAYER 1: Progressive Mid-Band Optical Blur (Clear center 35-65%, soft outer band) */}
                            <div className="optical-progressive-blur-mid" aria-hidden="true" />

                            {/* OPTICAL LAYER 2: Progressive Outer-Edge Optical Blur (Cinematic softening at flanks) */}
                            <div className="optical-progressive-blur-edge" aria-hidden="true" />

                            {/* OPTICAL LAYER 3: Lens Vignette (Edge & Corner Luminance Falloff) */}
                            <div className="optical-lens-vignette" aria-hidden="true" />

                            {/* OPTICAL LAYER 4: Cylindrical Coated Glass Glare & Specular Reflection */}
                            <div className="optical-cylindrical-glare" aria-hidden="true" />

                            {/* OPTICAL LAYER 5: Curved Surface Horizon Falloff & Inset Bezel Shadow */}
                            <div className="optical-curvature-depth" aria-hidden="true" />
                          </div>
                        ) : (
                          /* Interactive Fallback Mockup Canvas if image is still generating */
                          <div className={`preview-canvas-fallback fallback-${project.previewFallback.type}`}>
                            <div className="fallback-header">
                              <span className="fallback-badge">{project.previewFallback.badge}</span>
                              <span className="fallback-live">● ONLINE</span>
                            </div>
                            <div className="fallback-center-hud">
                              <div className="hud-circle-scanner" />
                              <project.icon size={44} className="fallback-main-icon" />
                            </div>
                            <div className="fallback-footer">
                              <div className="fallback-metric-chip">{project.previewFallback.metric1}</div>
                              <div className="fallback-metric-chip">{project.previewFallback.metric2}</div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Physical Ambient Ground Shadow Beneath Curved Preview */}
                <div className="lens-ground-shadow" aria-hidden="true" />
              </motion.div>
            </div>

            {/* RIGHT COLUMN: Project Information Details (40-45%) */}
            <div className="showcase-info-column">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={project.id}
                  custom={direction}
                  variants={infoVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="project-info-inner"
                >
                  {/* Project Number & Category Row */}
                  <div className="info-top-row">
                    <div className="project-index-group">
                      <span className="project-index-num">{project.number}</span>
                      <span className="project-index-total">/ 03</span>
                    </div>
                    <div className="project-category-badge">
                      <span className="badge-glow-dot" />
                      <span>{project.category}</span>
                    </div>
                  </div>

                  {/* Project Title */}
                  <h3 className="project-title-heading">{project.title}</h3>

                  {/* Project Description */}
                  <p className="project-description-text">{project.description}</p>

                  {/* Technology Stack Badges */}
                  <div className="project-tech-wrapper">
                    <span className="tech-section-label">TECHNOLOGY STACK</span>
                    <div className="tech-badges-grid">
                      {project.technologies.map((tech, tIdx) => (
                        <div key={tIdx} className="tech-pill-chip">
                          {tech.devicon && <i className={tech.devicon} style={{ fontSize: '14px' }} />}
                          <span>{tech.name}</span>
                          {tech.badge && <span className="tech-badge-sub">{tech.badge}</span>}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Important Key Features */}
                  <div className="project-features-wrapper">
                    <span className="features-section-label">KEY ARCHITECTURAL FEATURES</span>
                    <ul className="features-checklist-ul">
                      {project.features.map((feature, fIdx) => (
                        <li key={fIdx} className="feature-checklist-li">
                          <CheckCircle2 size={16} className="feature-check-icon" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Next Project Navigation Button (Right Side) */}
          <button
            type="button"
            onClick={handleNext}
            className="project-side-nav-btn nav-btn-next"
            aria-label="Next project"
          >
            <ChevronRight size={22} />
          </button>
        </div>

      </div>
    </section>
  );
}
