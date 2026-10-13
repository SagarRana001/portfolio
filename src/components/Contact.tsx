import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/sections.css';
import { PROFILE } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const EmailIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="1" y="3" width="14" height="10" rx="1" />
    <path d="M1 4l7 5 7-5" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M2.5 1A1.5 1.5 0 1 0 2.5 4 1.5 1.5 0 0 0 2.5 1zM1 5.5h3v9H1zM6 5.5h2.8v1.3h.04C9.27 5.9 10.4 5 12 5c2.9 0 3.5 1.9 3.5 4.4v5.1h-3V10c0-1.1 0-2.5-1.5-2.5S9 8.8 9 9.9v4.6H6z" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8 1v9M4 7l4 4 4-4M2 13h12" />
  </svg>
);

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([headingRef.current, descRef.current, linksRef.current, resumeRef.current], { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      tl.to(headingRef.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' })
        .to(descRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .to(linksRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
        .to(resumeRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="contact-section section-wrapper" ref={sectionRef}>
      <div className="contact-glow" aria-hidden="true" />
      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
          Let's Connect
        </div>

        <h2 className="contact-heading" ref={headingRef}>
          Let's Build Something Meaningful
        </h2>

        <p className="contact-desc" ref={descRef}>
          Have a product idea, an engineering challenge, or an opportunity to collaborate? Let's connect.
        </p>

        <div className="contact-links" ref={linksRef}>
          <a
            href={`mailto:${PROFILE.email}`}
            className="contact-link-item"
            aria-label={`Email ${PROFILE.email}`}
            id="contact-email-btn"
          >
            <EmailIcon />
            {PROFILE.email}
          </a>
          <a
            href="https://www.linkedin.com/in/sagar-rana-freelancer"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link-item"
            aria-label="Connect on LinkedIn"
            id="contact-linkedin-btn"
          >
            <LinkedInIcon />
            LinkedIn Profile
          </a>
        </div>

        <div className="contact-resume-section" ref={resumeRef}>
          <p className="contact-resume-label">Resume Available</p>
          <a
            href={PROFILE.resumeUrl}
            download={PROFILE.resumeFilename}
            className="btn btn-outline"
            style={{ margin: '0 auto', display: 'inline-flex' }}
            aria-label="Download Sagar Rana's Resume PDF"
            id="contact-resume-btn"
          >
            <DownloadIcon />
            Download My Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
