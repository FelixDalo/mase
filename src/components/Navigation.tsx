import { useState, useEffect } from 'react';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  return (
    <>
      <nav id="nav" className={scrolled ? 'scrolled' : ''}>
        <a href="#" className="nav-logo" aria-label="Mase Consulting Group">
          <img src="/Images/Logo.png" alt="Mase Consulting Group Logo" />
        </a>

        <div className="nav-links-wrapper">
          <div className="nav-links">
            <a href="#about" className="active">About</a>
            <a href="#services">Services</a>
            <a href="#industries">Industries</a>
            <a href="#insights">Insights</a>
            <a href="#contact">Contact</a>
          </div>
        </div>

        <div className="nav-right">
          <a href="#contact" className="nav-cta">Send an enquiry</a>
        </div>

        <button
          id="hamburger"
          className="hamburger"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>

      <div id="mobile-nav-overlay" className={`mobile-nav-overlay ${menuOpen ? 'active' : ''}`}>
        <button className="close-btn" id="close-btn" onClick={() => setMenuOpen(false)}>Close</button>
        <a href="#about" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>About</a>
        <a href="#services" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Services</a>
        <a href="#industries" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Industries</a>
        <a href="#insights" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Insights</a>
        <a href="#contact" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Contact</a>
      </div>
    </>
  );
}
