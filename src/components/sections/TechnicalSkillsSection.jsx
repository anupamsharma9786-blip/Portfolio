import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Sparkles, 
  ShieldCheck, 
  KeyRound, 
  Network, 
  Database, 
  Workflow, 
  Gauge, 
  Cloud, 
  Terminal, 
  Bot, 
  Smartphone, 
  Atom, 
  Cpu, 
  Star
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Helper for Devicon or Lucide icon
function ToolIcon({ deviconClass, LucideFallback }) {
  if (deviconClass) {
    return <i className={`${deviconClass}`} style={{ fontSize: '20px' }} />;
  }
  if (LucideFallback) {
    return <LucideFallback size={18} color="#34d399" />;
  }
  return <Sparkles size={18} color="#10b981" />;
}

const CATEGORIES_DATA = [
  {
    id: 'languages',
    num: '01',
    title: 'Programming Languages',
    badge: 'Core Syntax',
    desc: 'Foundational typed languages powering modern systems, high-speed algorithms, and AI tooling.',
    width: '420px',
    tools: [
      { name: 'JavaScript', detail: 'ES6+ Syntax', devicon: 'devicon-javascript-plain colored' },
      { name: 'TypeScript', detail: 'Strict Types & Generics', devicon: 'devicon-typescript-plain colored' },
      { name: 'Python', detail: 'Backend & Data / AI', devicon: 'devicon-python-plain colored' },
      { name: 'C++', detail: 'Systems & Performance', devicon: 'devicon-cplusplus-plain colored' },
    ]
  },
  {
    id: 'frontend',
    num: '02',
    title: 'Frontend Development',
    badge: 'Interactive UI',
    desc: 'Declarative component design, state orchestration, server rendering, and fluid responsive styling.',
    width: '490px',
    tools: [
      { name: 'React.js', detail: 'Concurrent & Hooks', devicon: 'devicon-react-original colored' },
      { name: 'Next.js', detail: 'App Router & SSR', devicon: 'devicon-nextjs-plain' },
      { name: 'HTML5', detail: 'Semantic & Canvas API', devicon: 'devicon-html5-plain colored' },
      { name: 'CSS3', detail: 'Grid, Flex & 3D CSS', devicon: 'devicon-css3-plain colored' },
      { name: 'Tailwind CSS', detail: 'Utility Architecture', devicon: 'devicon-tailwindcss-original colored' },
      { name: 'Redux Toolkit', detail: 'Global State Store', devicon: 'devicon-redux-original colored' },
      { name: 'Context API', detail: 'Scoped Prop State', fallbackIcon: Atom },
      { name: 'Responsive Design', detail: 'Fluid Mobile-First UI', fallbackIcon: Smartphone },
    ]
  },
  {
    id: 'backend',
    num: '03',
    title: 'Backend Development',
    badge: 'Scalable APIs',
    desc: 'High-throughput microservices, robust API architecture, JWT / OAuth 2.0 security, and AI integrations.',
    width: '520px',
    tools: [
      { name: 'Node.js', detail: 'Event-Driven Runtime', devicon: 'devicon-nodejs-plain colored' },
      { name: 'Express.js', detail: 'RESTful Middleware', devicon: 'devicon-express-original' },
      { name: 'FastAPI', detail: 'High-Speed Python APIs', devicon: 'devicon-fastapi-plain colored' },
      { name: 'REST APIs', detail: 'Clean Architecture', fallbackIcon: Network },
      { name: 'GraphQL', detail: 'Typed Query Schemas', devicon: 'devicon-graphql-plain colored' },
      { name: 'JWT Auth', detail: 'Token Security', fallbackIcon: ShieldCheck },
      { name: 'OAuth 2.0', detail: 'Delegated Authorization', fallbackIcon: KeyRound },
      { name: 'API Integration', detail: 'Webhooks & SDKs', fallbackIcon: Workflow },
      { name: 'GenAI APIs', detail: 'LLM Streaming', fallbackIcon: Sparkles },
    ]
  },
  {
    id: 'database',
    num: '04',
    title: 'Database & Data',
    badge: 'Data Integrity',
    desc: 'ACID transactions, relational MySQL schemas, NoSQL document stores, indexing, and multi-stage pipelines.',
    width: '490px',
    tools: [
      { name: 'MongoDB', detail: 'NoSQL Document Store', devicon: 'devicon-mongodb-plain colored' },
      { name: 'Mongoose', detail: 'ODM Schema Models', devicon: 'devicon-mongodb-plain' },
      { name: 'MySQL', detail: 'Relational Database', devicon: 'devicon-mysql-plain colored' },
      { name: 'Schema Design', detail: 'Normalized / NoSQL', fallbackIcon: Database },
      { name: 'Aggregation', detail: 'Multi-Stage Analytics', fallbackIcon: Workflow },
      { name: 'Indexing', detail: 'Compound B-Tree Lookups', fallbackIcon: Gauge },
      { name: 'Query Tuning', detail: 'Execution Optimization', fallbackIcon: Cpu },
    ]
  },
  {
    id: 'devops',
    num: '05',
    title: 'DevOps & Cloud Technologies',
    badge: 'Core Specialization',
    isImportant: true,
    desc: 'Containerization, Kubernetes clustering, automated CI/CD pipelines, reverse proxies, and edge cloud hosting.',
    width: '580px',
    tools: [
      { name: 'Docker', detail: 'Containerization', devicon: 'devicon-docker-plain colored', badge: 'Core' },
      { name: 'Kubernetes', detail: 'Orchestration', devicon: 'devicon-kubernetes-plain colored', badge: 'Core' },
      { name: 'Git & GitHub', detail: 'Version Control', devicon: 'devicon-git-plain colored', badge: 'VCS' },
      { name: 'GitHub Actions', detail: 'CI/CD Automation', devicon: 'devicon-githubactions-plain colored', badge: 'Pipeline' },
      { name: 'Linux', detail: 'Server Management', devicon: 'devicon-linux-plain colored', badge: 'OS' },
      { name: 'Nginx', detail: 'Reverse Proxy', devicon: 'devicon-nginx-original colored', badge: 'Network' },
      { name: 'CI/CD Pipelines', detail: 'Automated Builds', fallbackIcon: Workflow, badge: 'DevOps' },
      { name: 'Vercel', detail: 'Frontend Edge Deploy', devicon: 'devicon-vercel-original', badge: 'Cloud' },
      { name: 'Render', detail: 'Backend Deploy', fallbackIcon: Cloud, badge: 'Cloud' },
      { name: 'Postman', detail: 'API Testing', devicon: 'devicon-postman-plain colored', badge: 'Testing' },
    ]
  },
  {
    id: 'ai-tools',
    num: '06',
    title: 'AI & Developer Tools',
    badge: 'Productivity & AI',
    desc: 'Generative AI APIs, prompt engineering, AI pair programming, vector integration, and IDE tooling.',
    width: '450px',
    tools: [
      { name: 'Generative AI APIs', detail: 'OpenAI, Gemini & Claude', fallbackIcon: Sparkles },
      { name: 'Prompt Engineering', detail: 'Structured Context & Few-Shot', fallbackIcon: Terminal },
      { name: 'GitHub Copilot', detail: 'AI Pair Programming', devicon: 'devicon-github-original' },
      { name: 'LLM API Integration', detail: 'Vector Embeddings & RAG', fallbackIcon: Bot },
      { name: 'Postman', detail: 'Test Collections & Mocks', devicon: 'devicon-postman-plain colored' },
      { name: 'VS Code', detail: 'Workspaces & Debugging', devicon: 'devicon-vscode-plain colored' },
    ]
  }
];

export default function TechnicalSkillsSection() {
  const pinSectionRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const pinSection = pinSectionRef.current;
    const track = trackRef.current;
    if (!pinSection || !track) return;

    const mm = gsap.matchMedia();

    // DESKTOP: Smooth Vertical-to-Horizontal Pin Scrubbing
    mm.add('(min-width: 769px)', () => {
      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        return -(trackWidth - window.innerWidth + 120);
      };

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: pinSection,
          start: 'top top',
          end: () => `+=${Math.abs(getScrollAmount()) * 1.1}`,
          pin: true,
          scrub: 1.1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
          }
        }
      });

      return () => {
        tween.kill();
      };
    });

    // MOBILE: Natural Touch Swipe Flow (No vertical pin-trapping)
    mm.add('(max-width: 768px)', () => {
      gsap.set(track, { clearProps: 'x,transform' });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="skills" ref={pinSectionRef} className="horizontal-skills-section-dark">
      {/* Background Spatial Atmosphere */}
      <div className="skills-dark-ambient-bg" />

      {/* Viewport Container */}
      <div className="horizontal-skills-viewport">
        
        {/* Top Header Row with Title & Scroll Indicator */}
        <div className="horizontal-skills-header-row">
          <div>
            <h2 className="tech-dark-title">Technical Skills</h2>
          </div>

          <div className="horizontal-progress-indicator">
            <div className="progress-bar-track">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>
            <span className="progress-pct-num">{Math.round(scrollProgress * 100)}%</span>
          </div>
        </div>

        {/* 3D Perspective Stage Container */}
        <div className="perspective-3d-stage">
          <div ref={trackRef} className="horizontal-cards-track">
            {CATEGORIES_DATA.map((cat) => {
              const isDevOps = cat.isImportant;

              return (
                <div
                  key={cat.id}
                  style={{ '--card-width': cat.width }}
                  className={`spatial-3d-card ${isDevOps ? 'spatial-card-devops' : ''}`}
                >
                  {/* Important Category Banner */}
                  {isDevOps && (
                    <div className="devops-3d-banner">
                      <Star size={12} className="star-bounce" />
                      <span>IMPORTANT CATEGORY — CONTAINERIZATION & DEVOPS</span>
                    </div>
                  )}

                  {/* Card Header */}
                  <div className="spatial-card-header">
                    <div>
                      <div className="spatial-category-num">
                        <span>{cat.num}</span>
                        <span>/</span>
                        <span>06</span>
                        <span className="spatial-badge-dot">•</span>
                        <span className="spatial-cat-badge">{cat.badge}</span>
                      </div>
                      <h3 className="spatial-cat-title">{cat.title}</h3>
                      <p className="spatial-cat-desc">{cat.desc}</p>
                    </div>

                    <div className="spatial-tools-count">
                      <span>{cat.tools.length} Tools</span>
                    </div>
                  </div>

                  {/* Tools Grid with Multi-layer 3D Lift */}
                  <div className={`spatial-tools-grid ${isDevOps ? 'devops-grid-extended' : ''}`}>
                    {cat.tools.map((tool, tIdx) => (
                      <div key={tIdx} className="spatial-tool-item">
                        <div className="spatial-tool-icon-box">
                          <ToolIcon 
                            deviconClass={tool.devicon} 
                            LucideFallback={tool.fallbackIcon} 
                          />
                        </div>

                        <div className="spatial-tool-info">
                          <div className="spatial-tool-top">
                            <span className="spatial-tool-name">{tool.name}</span>
                            {tool.badge && (
                              <span className="spatial-tool-pill">{tool.badge}</span>
                            )}
                          </div>
                          <span className="spatial-tool-detail">{tool.detail}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
