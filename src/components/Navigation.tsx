import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();

  const sectionIds = ['about', 'approach'];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter((section): section is HTMLElement => Boolean(section));
      const probeLine = window.innerHeight * 0.35;

      const visibleSection = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= probeLine && rect.bottom >= probeLine;
      });

      if (visibleSection) {
        setActiveSection(visibleSection.id);
        return;
      }

      const firstSection = sections[0];
      if (firstSection && firstSection.getBoundingClientRect().top > probeLine) {
        setActiveSection('');
        return;
      }

      const passedSection = [...sections]
        .reverse()
        .find((section) => section.getBoundingClientRect().top <= probeLine);

      setActiveSection(passedSection?.id ?? '');
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  const isServicesActive = location.pathname === '/services';
  const isIndustriesActive = location.pathname === '/industries';

  return (
    <>
      <nav id="nav" className={scrolled ? 'scrolled' : ''}>
        <Link to="/" className="nav-logo" aria-label="Mase Consulting Group">
          <img src="/Images/mase_logo_v1_header_v2.png" alt="Mase Consulting Group Logo" />
        </Link>

        <div className="nav-links-wrapper">
          <div className="nav-links">
            <a
              href="/#about"
              className={activeSection === 'about' ? 'active' : ''}
            >
              About
            </a>
            <Link
              to="/services"
              className={isServicesActive ? 'active' : ''}
            >
              Services
            </Link>
            <Link
              to="/industries"
              className={isIndustriesActive ? 'active' : ''}
            >
              Industries
            </Link>
            <a
              href="/#approach"
              className={activeSection === 'approach' ? 'active' : ''}
            >
              Approach
            </a>
          </div>
        </div>

        <div className="nav-right">
          <a href="/#contact" className="nav-cta">Contact Us</a>
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
        <a
          href="/#about"
          className={`mobile-nav-link ${activeSection === 'about' ? 'active' : ''}`}
          onClick={() => setMenuOpen(false)}
        >
          About
        </a>
        <Link
          to="/services"
          className={`mobile-nav-link ${isServicesActive ? 'active' : ''}`}
          onClick={() => setMenuOpen(false)}
        >
          Services
        </Link>
        <Link
          to="/industries"
          className={`mobile-nav-link ${isIndustriesActive ? 'active' : ''}`}
          onClick={() => setMenuOpen(false)}
        >
          Industries
        </Link>
        <a
          href="/#approach"
          className={`mobile-nav-link ${activeSection === 'approach' ? 'active' : ''}`}
          onClick={() => setMenuOpen(false)}
        >
          Approach
        </a>
        <a
          href="/#contact"
          className="mobile-nav-cta"
          onClick={() => setMenuOpen(false)}
        >
          Contact Us
        </a>
      </div>
    </>
  );
}
