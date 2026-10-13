import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/sections.css';
import { EDUCATION } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const Education: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(gridRef.current?.querySelectorAll('.education-card') ?? [], { opacity: 1, y: 0 });
        return;
      }

      gsap.from(headerRef.current?.querySelectorAll(':scope > *') ?? [], {
        opacity: 0,
        y: 25,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
        },
      });

      gsap.to(gridRef.current?.querySelectorAll('.education-card') ?? [], {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="education" className="education-section section-wrapper" ref={sectionRef}>
      <div className="section-container">
        <header ref={headerRef}>
          <div className="section-eyebrow">Academic Background</div>
          <h2 className="section-heading">Academic Foundation</h2>
        </header>

        <div className="education-grid" ref={gridRef}>
          {EDUCATION.map((item, i) => (
            <article key={i} className="education-card">
              <p className="education-year">{item.year}</p>
              <h3 className="education-qualification">{item.qualification}</h3>
              <p className="education-institution">{item.institution}</p>
              <p className="education-board">{item.board}</p>
              <div className="education-score" aria-label={`Score: ${item.score}`}>
                {item.score}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
