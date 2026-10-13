import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/sections.css';
import { EXPERTISE_CATEGORIES } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const Expertise: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(gridRef.current?.querySelectorAll('.expertise-category') ?? [], { opacity: 1, y: 0 });
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
          start: 'top 80%',
        },
      });

      gsap.to(gridRef.current?.querySelectorAll('.expertise-category') ?? [], {
        opacity: 1,
        y: 0,
        stagger: 0.1,
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
    <section id="expertise" className="expertise-section section-wrapper" ref={sectionRef}>
      <div className="section-container">
        <header ref={headerRef}>
          <div className="section-eyebrow">Technical Skills</div>
          <h2 className="section-heading">Technology Is My Craft</h2>
          <p className="section-subheading">
            A practical engineering toolkit for building applications and digital products.
          </p>
        </header>

        <div className="expertise-grid" ref={gridRef}>
          {EXPERTISE_CATEGORIES.map((cat) => (
            <div key={cat.name} className="expertise-category">
              <h3 className="expertise-category-name">{cat.name}</h3>
              <div className="expertise-skills">
                {cat.skills.map((skill) => (
                  <span key={skill} className="skill-badge">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;
