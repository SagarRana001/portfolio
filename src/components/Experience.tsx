import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/sections.css';
import { EXPERIENCE } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(timelineRef.current?.querySelectorAll('.timeline-item') ?? [], { opacity: 1, x: 0 });
        gsap.set(progressRef.current, { height: '100%' });
        return;
      }

      // Header reveal
      gsap.from(headerRef.current?.querySelectorAll(':scope > *') ?? [], {
        opacity: 0,
        y: 25,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
        },
      });

      // Timeline items
      const items = timelineRef.current?.querySelectorAll('.timeline-item');
      if (items) {
        items.forEach((item, i) => {
          gsap.to(item, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: i * 0.06,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          });
        });
      }

      // Animated timeline progress line
      if (progressRef.current && timelineRef.current) {
        ScrollTrigger.create({
          trigger: timelineRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
          onUpdate: (self) => {
            gsap.set(progressRef.current, { height: `${self.progress * 100}%` });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="experience-section section-wrapper" ref={sectionRef}>
      <div className="section-container">
        <header ref={headerRef}>
          <div className="section-eyebrow">Career History</div>
          <h2 className="section-heading">Experience That Compounds</h2>
        </header>

        <div className="experience-layout">
          {/* Sticky left */}
          <div className="experience-sticky" aria-hidden="true">
            <p className="experience-sticky-label">Years of Experience</p>
            <div className="experience-sticky-count">8+</div>
          </div>

          {/* Timeline */}
          <div className="timeline" ref={timelineRef} aria-label="Professional timeline">
            {/* Animated progress */}
            <div className="timeline-progress" ref={progressRef} aria-hidden="true" />

            {EXPERIENCE.map((job, i) => (
              <article key={i} className="timeline-item">
                <div className="timeline-dot" aria-hidden="true" />

                <header>
                  <p className="timeline-period">{job.period}</p>
                  <h3 className="timeline-company">
                    {job.company}
                    <span className="timeline-location">{job.location}</span>
                  </h3>
                  <p className="timeline-title-role">{job.title}</p>
                </header>

                <ul className="timeline-responsibilities" aria-label="Responsibilities">
                  {job.responsibilities.map((resp, j) => (
                    <li key={j}>{resp}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
