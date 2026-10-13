import React from 'react';
import './styles/global.css';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Expertise from './components/Expertise';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <Hero />
        <Projects />
        <Expertise />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default App;
