import React from 'react';
import '../styles/sections.css';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-copy">
          © {year} Sagar Rana. All rights reserved.
        </p>
        <p className="footer-made">
          Designed & developed with <span>♦</span> precision.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
