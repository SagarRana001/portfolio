import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/projects.css';
import { FEATURED_PROJECTS, ADDITIONAL_PROJECTS } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

interface ProjectCardProps {
  project: typeof FEATURED_PROJECTS[0];
  index: number;
  reverse: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, reverse }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(cardRef.current, { opacity: 1, y: 0 });
        return;
      }
      gsap.to(cardRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <article
      ref={cardRef}
      className={`project-card${reverse ? ' reverse' : ''}`}
      aria-labelledby={`project-name-${project.id}`}
    >
      {/* Info */}
      <div className="project-info">
        <header>
          <div className="project-number" aria-hidden="true">{project.id}</div>
          <h3 className="project-name" id={`project-name-${project.id}`}>
            {project.displayLabel || project.name}
          </h3>
          <p className="project-role">{project.role}</p>
        </header>

        <p className="project-description">{project.description}</p>

        <ul className="project-features" aria-label="Key features">
          {project.features.map((feat) => (
            <li key={feat}>{feat}</li>
          ))}
        </ul>

        <div className="project-tags" aria-label="Technologies">
          {project.technologies.map((tech) => (
            <span key={tech} className="tech-tag">{tech}</span>
          ))}
        </div>
      </div>

      {/* Visual */}
      <div className="project-visual" aria-hidden="true">
        <div
          className="project-visual-bg"
          style={{ background: project.gradient } as React.CSSProperties}
        />
        <div className="project-visual-grid" />
        <div className="project-visual-pattern">
          <div
            className="project-visual-name"
            style={{ color: `rgba(245, 241, 232, 0.06)` }}
          >
            {project.name}
          </div>
          <div
            className="project-visual-accent"
            style={{ background: project.accentColor }}
          />
          <div className="tech-tag" style={{ borderColor: `${project.accentColor}33`, color: project.accentColor, opacity: 0.7 }}>
            {project.technologies[0]}
          </div>
        </div>
      </div>
    </article>
  );
};

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const additionalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      // Section header
      gsap.from(headerRef.current?.querySelectorAll('*') ?? [], {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
        },
      });

      // Additional cards
      const additionalCards = additionalRef.current?.querySelectorAll('.additional-card');
      if (additionalCards) {
        gsap.to(additionalCards, {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: additionalRef.current,
            start: 'top 80%',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="projects-section section-wrapper" ref={sectionRef}>
      <div className="section-container">
        {/* Header */}
        <header className="projects-header" ref={headerRef}>
          <div className="section-eyebrow">Selected Work</div>
          <h2 className="section-heading">Featured Projects</h2>
          <p className="section-subheading">
            Products, platforms, and experiences I've helped bring to life.
          </p>
        </header>

        {/* Featured project cards */}
        <div aria-label="Featured projects">
          {FEATURED_PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              reverse={i % 2 !== 0}
            />
          ))}
        </div>

        {/* Additional projects */}
        <div className="additional-projects-section" ref={additionalRef}>
          <div className="section-eyebrow" style={{ marginTop: '5rem' }}>More Work</div>
          <h2 className="section-heading" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}>
            More Things I've Built
          </h2>

          <div className="additional-projects-grid" aria-label="Additional projects">
            {ADDITIONAL_PROJECTS.map((project) => (
              <article key={project.name} className="additional-card">
                <h3 className="additional-card-name">{project.name}</h3>
                <p className="additional-card-role">{project.role}</p>
                <p className="additional-card-desc">{project.description}</p>
                <div className="additional-card-tags" aria-label="Technologies">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
