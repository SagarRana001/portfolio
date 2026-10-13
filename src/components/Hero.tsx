import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/hero.css';
import { PROFILE } from '../data/portfolio';
import { TechVisual } from './TechVisual';

gsap.registerPlugin(ScrollTrigger);

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 7h10M7 2l5 5-5 5" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8 1v9M4 7l4 4 4-4M2 13h12" />
  </svg>
);

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const visualWrapperRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const summaryRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Just show everything without animation
        gsap.set([eyebrowRef.current, titleRef.current, headlineRef.current, summaryRef.current, buttonsRef.current, statRef.current, scrollIndicatorRef.current], { opacity: 1, y: 0 });
        gsap.set(nameRef.current?.querySelectorAll('.word') ?? [], { opacity: 1, y: 0 });
        gsap.set(visualWrapperRef.current, { opacity: 1, x: 0, scale: 1 });
        return;
      }

      // Entrance timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Eyebrow line
      tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.2);

      // Name words stagger
      const words = nameRef.current?.querySelectorAll('.word');
      if (words) {
        tl.to(words, { opacity: 1, y: 0, duration: 1, stagger: 0.08, ease: 'power4.out' }, 0.4);
      }

      // Title
      tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.7);

      // Headline
      tl.to(headlineRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.85);

      // Summary
      tl.to(summaryRef.current, { opacity: 1, y: 0, duration: 0.8 }, 1.0);

      // Buttons
      tl.to(buttonsRef.current, { opacity: 1, y: 0, duration: 0.8 }, 1.15);

      // Stat
      tl.to(statRef.current, { opacity: 1, y: 0, duration: 0.7 }, 1.3);

      // Visual entrance animation
      tl.fromTo(
        visualWrapperRef.current,
        { opacity: 0, scale: 0.9, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 1.3, ease: 'power3.out' },
        0.5
      );

      // Scroll indicator
      tl.to(scrollIndicatorRef.current, { opacity: 1, duration: 0.8 }, 1.8);

      // Scroll-driven subtle visual parallax
      gsap.matchMedia().add('(min-width: 901px)', () => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
          onUpdate: (self) => {
            const progress = self.progress;
            const yOffset = gsap.utils.interpolate(0, -60, progress);
            const scale = gsap.utils.interpolate(1, 0.95, progress);
            gsap.set(visualWrapperRef.current, { y: yOffset, scale });
          },
        });
      });
    }, sectionRef);

    // Cursor tracking for interactive text floating depth
    const isTouchDevice = () => window.matchMedia('(pointer: coarse)').matches;

    let xToName: gsap.QuickToFunc | null = null;
    let yToName: gsap.QuickToFunc | null = null;
    let xToTitle: gsap.QuickToFunc | null = null;
    let yToTitle: gsap.QuickToFunc | null = null;

    if (!prefersReducedMotion && !isTouchDevice()) {
      if (nameRef.current) {
        xToName = gsap.quickTo(nameRef.current, 'x', { duration: 0.6, ease: 'power2.out' });
        yToName = gsap.quickTo(nameRef.current, 'y', { duration: 0.6, ease: 'power2.out' });
      }
      if (titleRef.current) {
        xToTitle = gsap.quickTo(titleRef.current, 'x', { duration: 0.7, ease: 'power2.out' });
        yToTitle = gsap.quickTo(titleRef.current, 'y', { duration: 0.7, ease: 'power2.out' });
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width * 2 - 1;
      const ny = (e.clientY - rect.top) / rect.height * 2 - 1;

      // Name interactive cursor movement
      if (xToName && yToName) {
        const nameMoveX = gsap.utils.clamp(-24, 24, nx * 24);
        const nameMoveY = gsap.utils.clamp(-14, 14, ny * 14);
        xToName(nameMoveX);
        yToName(nameMoveY);
      }

      // Position title interactive movement
      if (xToTitle && yToTitle) {
        const titleMoveX = gsap.utils.clamp(-18, 18, nx * 18);
        const titleMoveY = gsap.utils.clamp(-10, 10, ny * 10);
        xToTitle(titleMoveX);
        yToTitle(titleMoveY);
      }
    };

    const onMouseLeave = () => {
      if (xToName && yToName) {
        xToName(0);
        yToName(0);
      }
      if (xToTitle && yToTitle) {
        xToTitle(0);
        yToTitle(0);
      }
    };

    const section = sectionRef.current;
    if (!isTouchDevice()) {
      section?.addEventListener('mousemove', onMouseMove);
      section?.addEventListener('mouseleave', onMouseLeave);
    }

    return () => {
      ctx.revert();
      section?.removeEventListener('mousemove', onMouseMove);
      section?.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <section id="hero" className="hero" ref={sectionRef} aria-labelledby="hero-name">
      <div className="hero-inner">
        {/* Left content */}
        <div className="hero-content">
          <div className="hero-eyebrow" ref={eyebrowRef} aria-label="Specializations">
            {PROFILE.eyebrow}
          </div>

          <h1 className="hero-name" id="hero-name" ref={nameRef} aria-label={PROFILE.name}>
            {'Sagar Rana'.split(' ').map((word, i) => (
              <span key={i} className="word">
                {word}
              </span>
            ))}
          </h1>

          <p className="hero-title" ref={titleRef}>
            {PROFILE.title}
          </p>

          <h2 className="hero-headline" ref={headlineRef}>
            Building Digital Products.<br />
            Engineering Intelligent Experiences.
          </h2>

          <p className="hero-summary" ref={summaryRef}>
            {PROFILE.summary}
          </p>

          <div className="hero-buttons" ref={buttonsRef}>
            <a
              href="#projects"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              id="hero-explore-btn"
            >
              Explore My Work
              <ArrowIcon />
            </a>
            <a
              href={PROFILE.resumeUrl}
              download={PROFILE.resumeFilename}
              className="btn btn-outline"
              id="hero-resume-btn"
              aria-label="Download Sagar Rana's resume PDF"
            >
              <DownloadIcon />
              Download Resume
            </a>
          </div>

          <div className="hero-stat" ref={statRef} aria-label={PROFILE.achievement}>
            <div className="hero-stat-line" aria-hidden="true" />
            <p className="hero-stat-text">
              <strong>25+</strong> Production Applications Delivered
            </p>
          </div>
        </div>

        {/* Right — Interactive Tech & Engineering Visual */}
        <div className="hero-avatar-col">
          <div className="hero-visual-wrapper" ref={visualWrapperRef}>
            <TechVisual wrapperRef={visualWrapperRef} />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator" ref={scrollIndicatorRef} aria-hidden="true">
        <span>Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
};

export default Hero;

