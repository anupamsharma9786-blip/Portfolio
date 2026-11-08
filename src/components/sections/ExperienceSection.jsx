import React, { useState, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  GitCommit,
  GitBranch,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

// =========================================
// REAL PROFESSIONAL EXPERIENCES DATA
// =========================================
const EXPERIENCES = [
  {
    id: 'uptoskills-internship',
    commitNumber: '01',
    branch: 'feat/intern-portal',
    role: 'Web Developer Intern',
    organization: 'UptoSkills',
    category: 'Professional Experience',
    status: 'completed',
    statusLabel: 'Completed',
    author: 'Anupam Sharma',
    tenure: 'Full-Stack Development Internship',
    commitMessage: 'feat: joined full-stack development internship',
    description:
      'Contributed to the development of a full-stack Intern Management Portal, engineering features across frontend interfaces, backend services, and database schemas.',
    bulletTitle: 'Key Deliverables & Contributions',
    bullets: [
      'Contributed to building an Intern Management Portal using the MERN stack.',
      'Worked on dashboards for interns, team leaders and administrators.',
      'Contributed to certificate generation and internship management functionality.',
      'Managed GitHub repository activities and collaborated with the development team.',
      'Worked on API testing, endpoint documentation and backend-database integration.',
    ],
    technologies: [
      { name: 'React.js', devicon: 'devicon-react-original colored' },
      { name: 'Node.js', devicon: 'devicon-nodejs-plain colored' },
      { name: 'Express.js', devicon: 'devicon-express-original' },
      { name: 'MongoDB', devicon: 'devicon-mongodb-plain colored' },
      { name: 'JavaScript', devicon: 'devicon-javascript-plain colored' },
      { name: 'GitHub', devicon: 'devicon-github-original' },
      { name: 'Postman', devicon: 'devicon-postman-plain colored' },
    ],
  },
  {
    id: 'gdg-development-lead',
    commitNumber: '02',
    branch: 'lead/campus-community',
    role: 'Development Lead',
    organization: 'Google Developer Groups on Campus — Dr. AITD',
    category: 'Technical Leadership',
    status: 'active',
    statusLabel: 'Active / Current',
    author: 'Anupam Sharma',
    tenure: 'Present · Leadership Role',
    commitMessage: 'feat: stepped into technical leadership',
    description:
      'Serving as the Development Lead within the campus developer community, guiding technical initiatives, peer mentorship, and practical project-based learning.',
    bulletTitle: 'Leadership & Community Initiatives',
    bullets: [
      'Lead development-focused initiatives within the campus developer community.',
      'Encourage practical software development and project-based learning.',
      'Promote collaboration and knowledge sharing among developers.',
      'Support students exploring modern web development technologies.',
      'Contribute to a community focused on building, learning and innovation.',
    ],
    focusAreas: [
      'Technical Leadership',
      'Web Development',
      'Team Collaboration',
      'Project Development',
      'Community Building',
    ],
  },
];

export default function ExperienceSection() {
  const [activeId, setActiveId] = useState(null);
  const containerRef = useRef(null);

  // Progressive scroll-linked drawing of the Git branch line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 70%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 32,
    restDelta: 0.001,
  });

  const lineScale = useTransform(smoothProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="experience-dark-section" ref={containerRef}>
      {/* Ambient Depth Background Layers */}
      <div className="experience-ambient-glow" />
      <div className="experience-subtle-grid" />

      <div className="experience-dark-container">
        {/* =========================================
            HEADER (Clean, Typographic, Restrained)
            ========================================= */}
        <div className="experience-dark-header">
          <div className="experience-label-chip">
            <GitBranch size={13} className="chip-branch-icon" />
            <span className="chip-label-text">CAREER JOURNEY // GIT TIMELINE</span>
            <span className="chip-branch-name">main</span>
          </div>

          <div className="header-headline-row">
            <h2 className="header-primary-title">
              The Journey of <span className="title-gradient-mint">Commits.</span>
            </h2>
            <p className="header-secondary-paragraph">
              Every milestone represents a commit in my technical evolution — from building production applications to guiding developer communities.
            </p>
          </div>
        </div>

        {/* =========================================
            VERTICAL GIT COMMIT TIMELINE
            ========================================= */}
        <div className="dark-timeline-wrapper">
          {/* Central Git Main Branch Line */}
          <div className="timeline-branch-axis">
            <div className="axis-track-base" />
            <motion.div
              className="axis-track-active"
              style={{ scaleY: lineScale }}
            />
          </div>

          {/* Timeline Milestones */}
          <div className="milestones-stream">
            {EXPERIENCES.map((exp, index) => {
              const isEven = index % 2 === 0;
              const isHovered = activeId === exp.id;
              const isLeadership = exp.category === 'Technical Leadership';

              return (
                <div
                  key={exp.id}
                  className={`milestone-timeline-item ${isEven ? 'item-left' : 'item-right'} ${isHovered ? 'item-active' : ''}`}
                  onMouseEnter={() => setActiveId(exp.id)}
                  onMouseLeave={() => setActiveId(null)}
                >
                  {/* COMMIT NODE (Center Axis) */}
                  <div className="timeline-node-anchor">
                    {isLeadership && (
                      <div className="leadership-branch-fork" aria-hidden="true">
                        <svg viewBox="0 0 32 48" fill="none" className="fork-svg">
                          <path
                            d="M 16 0 C 16 18, 28 24, 28 44"
                            stroke="rgba(52, 211, 153, 0.45)"
                            strokeWidth="1.8"
                            strokeDasharray="3 3"
                          />
                        </svg>
                      </div>
                    )}

                    <motion.div
                      className={`timeline-commit-dot ${isHovered ? 'dot-active' : ''}`}
                      initial={{ scale: 0.7, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="dot-outer-halo" />
                      <div className="dot-glass-disc">
                        <GitCommit size={13} className="dot-git-icon" />
                      </div>
                    </motion.div>

                    {/* Connector line leading to the glass card */}
                    <div className="node-glass-connector" />
                  </div>

                  {/* METADATA FLANK */}
                  <motion.div
                    className="milestone-aside-meta"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.45, delay: 0.1 }}
                  >
                    <span className="aside-branch-badge">
                      <GitBranch size={11} />
                      <span>{exp.branch}</span>
                    </span>

                    <span className="aside-commit-index">
                      <span>commit</span>
                      <strong className="commit-num-tag">{exp.commitNumber}</strong>
                    </span>

                    <div className={`aside-status-tag status-${exp.status}`}>
                      <span className="status-indicator-dot" />
                      <span>{exp.statusLabel}</span>
                    </div>
                  </motion.div>

                  {/* TRANSPARENT LIQUID GLASS EXPERIENCE CARD */}
                  <motion.div
                    className={`experience-glass-card ${isHovered ? 'card-glow' : ''}`}
                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Glass Surface Specular Shimmer */}
                    <div className="glass-specular-highlight" />

                    {/* Card Top Metadata Ribbon */}
                    <div className="glass-card-topbar">
                      <div className="topbar-left">
                        <span className="glass-category-pill">{exp.category}</span>
                      </div>
                      <div className="topbar-right">
                        <span className="glass-tenure-text">
                          <Calendar size={11} className="tenure-cal-icon" />
                          <span>{exp.tenure}</span>
                        </span>
                      </div>
                    </div>

                    {/* Card Core Content */}
                    <div className="glass-card-body">
                      {/* Commit Message Terminal Strip */}
                      <div className="glass-commit-banner">
                        <span className="commit-git-prefix">commit</span>
                        <code className="commit-git-msg">"{exp.commitMessage}"</code>
                      </div>

                      {/* Role & Organization Headline */}
                      <div className="glass-role-headline">
                        <h3 className="role-main-text">{exp.role}</h3>
                        <p className="org-main-text">{exp.organization}</p>
                      </div>

                      {/* Narrative Description */}
                      <p className="experience-narrative-text">{exp.description}</p>

                      {/* Key Deliverables / Leadership Initiatives */}
                      <div className="glass-bullets-box">
                        <span className="bullets-box-heading">{exp.bulletTitle}</span>
                        <ul className="bullets-clean-list">
                          {exp.bullets.map((bullet, bIdx) => (
                            <li key={bIdx} className="bullet-clean-row">
                              <CheckCircle2 size={14} className="bullet-mint-icon" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech Stack Chips or Focus Badges */}
                      {exp.technologies ? (
                        <div className="glass-tags-wrapper">
                          <span className="tags-section-heading">DEVELOPMENT STACK</span>
                          <div className="glass-chips-cluster">
                            {exp.technologies.map((tech, tIdx) => (
                              <div key={tIdx} className="tech-glass-chip">
                                {tech.devicon && <i className={tech.devicon} style={{ fontSize: '13px' }} />}
                                <span>{tech.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : exp.focusAreas ? (
                        <div className="glass-tags-wrapper">
                          <span className="tags-section-heading">CORE FOCUS DOMAINS</span>
                          <div className="glass-chips-cluster">
                            {exp.focusAreas.map((area, aIdx) => (
                              <div key={aIdx} className="tech-glass-chip focus-glass-chip">
                                <Sparkles size={11} className="focus-star-icon" />
                                <span>{area}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Clean Branch Termination */}
          <div className="timeline-branch-end">
            <span className="branch-end-dot" />
            <span className="branch-end-label">origin/main — tree up to date</span>
          </div>
        </div>

      </div>
    </section>
  );
}
