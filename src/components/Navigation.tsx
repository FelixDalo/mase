import { useState, useEffect } from 'react';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'industries', label: 'Industries' },
    { id: 'approach', label: 'Approach' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      const sections = navItems
        .map(({ id }) => document.getElementById(id))
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
          <img src="/Images/mase_logo_v1_header_v2.png" alt="Mase Consulting Group Logo" />
        </a>

        <div className="nav-links-wrapper">
          <div className="nav-links">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={activeSection === item.id ? 'active' : ''}
                onClick={() => setActiveSection(item.id)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="nav-right">
          <a href="#contact" className="nav-cta">Contact Us</a>
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
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => {
              setActiveSection(item.id);
              setMenuOpen(false);
            }}
          >
            {item.label}
          </a>
        ))}
        <a
          href="#contact"
          className="mobile-nav-cta"
          onClick={() => {
            setActiveSection('contact');
            setMenuOpen(false);
          }}
        >
          Contact Us
        </a>
      </div>
    </>
  );
}
