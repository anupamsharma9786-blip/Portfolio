import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroSocialLinks from './HeroSocialLinks';

export default function HeroPerspectiveText({ heroRef }) {
  // Track scroll progress of the hero section container (0.0 to 1.0)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  });

  // Vertical travel directly bound to user's scroll speed across the entire hero range
  const y = useTransform(
    scrollYProgress,
    [0.25, 1.0],
    [40, -50]
  );

  // Overall container opacity: appears right after ANUPAM title leaves,
  // and STAYS 100% VISIBLE (opacity: 1) all the way through 1.0 (end of hero section).
  // It never vanishes early, allowing it to scroll up naturally with the section!
  const containerOpacity = useTransform(
    scrollYProgress,
    [0.24, 0.27, 1.0],
    [0, 1, 1]
  );

  // Paragraph 1: appears immediately after the ANUPAM title disappears
  const p1Opacity = useTransform(scrollYProgress, [0.25, 0.32], [0, 1]);
  const p1Y = useTransform(scrollYProgress, [0.25, 0.32], [20, 0]);

  // Paragraph 2: appears progressively as user scrolls into the mid-section (0.36 to 0.48)
  const p2Opacity = useTransform(scrollYProgress, [0.36, 0.48], [0, 1]);
  const p2Y = useTransform(scrollYProgress, [0.36, 0.48], [20, 0]);

  // Paragraph 3: appears as user scrolls through the lower hero section (0.54 to 0.68)
  const p3Opacity = useTransform(scrollYProgress, [0.54, 0.68], [0, 1]);
  const p3Y = useTransform(scrollYProgress, [0.54, 0.68], [20, 0]);

  return (
    <div className="hero-perspective-text-wrapper left-aligned">
      <motion.div
        className="hero-perspective-text-3d"
        style={{
          transformStyle: 'preserve-3d',
          rotateX: 0, // Tilt angle 0 from the vertical
          rotateY: '8deg',
          translateZ: '10px',
          y,
          opacity: containerOpacity,
        }}
      >
        {/* Block 1: Full Stack Foundations */}
        <motion.p
          className="hero-perspective-paragraph"
          style={{
            opacity: p1Opacity,
            y: p1Y,
          }}
        >
          I'm a passionate <span className="highlight-text">Full Stack Developer</span> and B.Tech IT student building modern, scalable, and user-centric web applications. I specialize in end-to-end engineering with <span className="highlight-text">React.js, Next.js, Node.js, Express.js, and MongoDB</span>.
        </motion.p>

        {/* Block 2: Generative AI & Cloud Architecture (Appears as you scroll) */}
        <motion.p
          className="hero-perspective-paragraph"
          style={{
            opacity: p2Opacity,
            y: p2Y,
          }}
        >
          I enjoy integrating <span className="highlight-text">Generative AI capabilities & LLM APIs</span> into applications to create intelligent features and automate workflows, alongside exploring <span className="highlight-text">DevOps, Docker, and cloud deployments</span>.
        </motion.p>

        {/* Block 3: Engineering Mindset & Lifecycle (Appears as you scroll completely) */}
        <motion.p
          className="hero-perspective-paragraph"
          style={{
            opacity: p3Opacity,
            y: p3Y,
          }}
        >
          From interactive frontend interfaces to robust backend architectures, I love working across the entire development lifecycle. I believe in <span className="highlight-text">learning by building</span>, solving real-world problems, and turning ideas into resilient digital solutions.
        </motion.p>

        {/* Hero Contact & Social Links appended directly to introduction */}
        <motion.div
          style={{
            opacity: p3Opacity,
            y: p3Y,
          }}
        >
          <HeroSocialLinks className="hero-intro-socials" />
        </motion.div>
      </motion.div>
    </div>
  );
}
