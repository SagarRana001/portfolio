import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../styles/tech-visual.css';

interface TechVisualProps {
  wrapperRef: React.RefObject<HTMLDivElement | null>;
}

export const TechVisual: React.FC<TechVisualProps> = ({ wrapperRef }) => {
  const visualContainerRef = useRef<HTMLDivElement>(null);
  const cardMainRef = useRef<HTMLDivElement>(null);
  const cardBadge1Ref = useRef<HTMLDivElement>(null);
  const cardBadge2Ref = useRef<HTMLDivElement>(null);
  const cardBadge3Ref = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouchDevice = () => window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice()) return;

    // Subtle 3D tilt reaction on mouse move relative to container
    const visual = visualContainerRef.current;
    if (!visual) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = visual.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(cardMainRef.current, {
        rotateY: x * 18,
        rotateX: -y * 18,
        duration: 0.6,
        ease: 'power2.out',
        transformPerspective: 1000,
      });

      gsap.to(cardBadge1Ref.current, {
        x: x * 26,
        y: y * 26,
        duration: 0.7,
        ease: 'power2.out',
      });

      gsap.to(cardBadge2Ref.current, {
        x: -x * 24,
        y: -y * 24,
        duration: 0.75,
        ease: 'power2.out',
      });

      gsap.to(cardBadge3Ref.current, {
        x: x * 20,
        y: -y * 20,
        duration: 0.8,
        ease: 'power2.out',
      });

      gsap.to(ringRef.current, {
        rotateZ: x * 25,
        duration: 1,
        ease: 'power2.out',
      });
    };

    const onMouseLeave = () => {
      gsap.to(cardMainRef.current, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.9,
        ease: 'elastic.out(1, 0.4)',
      });
      gsap.to([cardBadge1Ref.current, cardBadge2Ref.current, cardBadge3Ref.current], {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      });
      gsap.to(ringRef.current, {
        rotateZ: 0,
        duration: 1,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    visual.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      visual.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div className="tech-visual-container" ref={visualContainerRef}>
      {/* Ambient background glow & rotating technical rings */}
      <div className="tech-glow tech-glow-primary" aria-hidden="true" />
      <div className="tech-glow tech-glow-secondary" aria-hidden="true" />
      <div className="tech-orbit-ring" ref={ringRef} aria-hidden="true">
        <div className="orbit-dot orbit-dot-1" />
        <div className="orbit-dot orbit-dot-2" />
        <div className="orbit-grid-circle" />
      </div>

      {/* Main Terminal / Code Interface Window */}
      <div className="tech-terminal-window" ref={cardMainRef}>
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="dot dot-close" />
            <span className="dot dot-minimize" />
            <span className="dot dot-expand" />
          </div>
          <div className="terminal-title">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
            </svg>
            <span>arch_core.ts</span>
          </div>
          <div className="terminal-badge">
            <span className="live-indicator" /> LIVE
          </div>
        </div>

        <div className="terminal-body">
          <div className="code-line">
            <span className="code-ln">01</span>
            <span className="kw">interface</span> <span className="type">SystemArchitect</span> {'{'}
          </div>
          <div className="code-line">
            <span className="code-ln">02</span>
            &nbsp;&nbsp;<span className="prop">specialization</span>: <span className="str">'Full-Stack & Mobile'</span>;
          </div>
          <div className="code-line">
            <span className="code-ln">03</span>
            &nbsp;&nbsp;<span className="prop">coreStack</span>: [<span className="str">'Next.js'</span>, <span className="str">'React Native'</span>, <span className="str">'Node.js'</span>];
          </div>
          <div className="code-line">
            <span className="code-ln">04</span>
            &nbsp;&nbsp;<span className="prop">standards</span>: <span className="str">'Ultra-Low Latency | 99.9% Uptime'</span>;
          </div>
          <div className="code-line">
            <span className="code-ln">05</span>
            {'}'}
          </div>
          <div className="code-line code-highlight">
            <span className="code-ln">06</span>
            <span className="kw">const</span> <span className="fn">deliverProduction</span> = <span className="kw">async</span> (): <span className="type">Promise</span>&lt;<span className="type">Success</span>&gt; =&gt; {'{'}
          </div>
          <div className="code-line">
            <span className="code-ln">07</span>
            &nbsp;&nbsp;<span className="kw">return await</span> <span className="prop">scale</span>({'{'} apps: <span className="num">25+</span>, status: <span className="str">'shipped'</span> {'}'});
          </div>
          <div className="code-line">
            <span className="code-ln">08</span>
            {'}'};
          </div>
        </div>

        {/* Status Bar */}
        <div className="terminal-footer">
          <span className="footer-item">
            <span className="branch-icon">⎇</span> main
          </span>
          <span className="footer-item">⚡ 0 errors • 0 warnings</span>
          <span className="footer-item highlight-text">UTF-8 • TypeScript</span>
        </div>
      </div>

      {/* Floating Satellites / Micro Cards */}
      {/* Satellite 1: Mobile & React Native */}
      <div className="tech-badge tech-badge-mobile" ref={cardBadge1Ref}>
        <div className="badge-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <path d="M12 18h.01" />
          </svg>
        </div>
        <div className="badge-info">
          <span className="badge-label">CROSS-PLATFORM</span>
          <strong className="badge-val">React Native & Expo</strong>
        </div>
      </div>

      {/* Satellite 2: Cloud / AI / Backend */}
      <div className="tech-badge tech-badge-cloud" ref={cardBadge2Ref}>
        <div className="badge-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
          </svg>
        </div>
        <div className="badge-info">
          <span className="badge-label">INFRASTRUCTURE</span>
          <strong className="badge-val">Cloud & Microservices</strong>
        </div>
      </div>

      {/* Satellite 3: Production Metrics */}
      <div className="tech-badge tech-badge-perf" ref={cardBadge3Ref}>
        <div className="badge-pulse-glow" />
        <div className="badge-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>
        <div className="badge-info">
          <span className="badge-label">SYSTEM HEALTH</span>
          <strong className="badge-val">99.98% Reliability</strong>
        </div>
      </div>
    </div>
  );
};
