import React, { useEffect, useRef, useState } from 'react';
import '../styles/nav.css';
import { PROFILE } from '../data/portfolio';

const NAV_ITEMS = [
  { label: 'Home', href: '#hero' },
  { label: 'Projects', href: '#projects' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const DownloadIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8 1v9M4 7l4 4 4-4M2 13h12" />
  </svg>
);

const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`} aria-label="Main navigation">
        <div className="nav-inner">
          {/* Logo */}
          <button
            className="nav-logo"
            onClick={() => handleNavClick('#hero')}
            aria-label="Back to top"
          >
            <span className="nav-logo-name">Sagar Rana</span>
            <span className="nav-logo-title">Senior Developer</span>
          </button>

          {/* Desktop links */}
          <ul className="nav-links" role="list">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <button
                  className="nav-link"
                  onClick={() => handleNavClick(item.href)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Desktop resume button */}
          <a
            href={PROFILE.resumeUrl}
            download={PROFILE.resumeFilename}
            className="nav-resume-btn"
            aria-label="Download Sagar Rana's Resume"
          >
            <DownloadIcon />
            Download Resume
          </a>

          {/* Hamburger */}
          <button
            className={`nav-hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`nav-mobile-menu${menuOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {NAV_ITEMS.map((item) => (
          <button
            key={item.label}
            className="nav-mobile-link"
            onClick={() => handleNavClick(item.href)}
          >
            {item.label}
          </button>
        ))}
        <a
          href={PROFILE.resumeUrl}
          download={PROFILE.resumeFilename}
          className="btn btn-outline nav-mobile-resume-btn"
          onClick={() => setMenuOpen(false)}
          aria-label="Download Resume"
        >
          <DownloadIcon />
          Download Resume
        </a>
      </div>
    </>
  );
};

export default Navigation;
