import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { industries } from '../content/siteContent';

const toSlug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const serviceItems = [
  { label: 'Technology & Digital Transformation', slug: 'digital-transformation' },
  { label: 'Data & AI', slug: 'data-and-ai' },
  { label: 'Cloud, Platforms & Enterprise Solutions', slug: 'cloud-solutions' },
  { label: 'Cyber Security & Digital Risk', slug: 'cyber-security' },
  { label: 'Operating Model, People & Change', slug: 'operational-modelling' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [openDropdown, setOpenDropdown] = useState<'services' | 'industries' | null>(null);
  const [mobileOpenSection, setMobileOpenSection] = useState<'services' | 'industries' | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const sectionIds = ['about', 'services', 'industries', 'approach'];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter((s): s is HTMLElement => Boolean(s));
      const probeLine = window.innerHeight * 0.35;

      const visible = sections.find((s) => {
        const r = s.getBoundingClientRect();
        return r.top <= probeLine && r.bottom >= probeLine;
      });
      if (visible) { setActiveSection(visible.id); return; }

      const first = sections[0];
      if (first && first.getBoundingClientRect().top > probeLine) { setActiveSection(''); return; }

      const passed = [...sections].reverse().find((s) => s.getBoundingClientRect().top <= probeLine);
      setActiveSection(passed?.id ?? '');
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    if (!menuOpen) {
      setMobileOpenSection(null);
    }
  }, [menuOpen]);

  const toggle = (key: 'services' | 'industries') =>
    setOpenDropdown((prev) => (prev === key ? null : key));

  const toggleMobileSection = (key: 'services' | 'industries') =>
    setMobileOpenSection((prev) => (prev === key ? null : key));

  const handleServiceSelect = (slug: string) => {
    window.sessionStorage.setItem('mase-active-service', slug);
    window.location.href = `/#services/${slug}`;
    setOpenDropdown(null);
  };

  return (
    <>
      <nav id="nav" ref={navRef} className={scrolled ? 'scrolled' : ''}>
        <Link to="/" className="nav-logo" aria-label="Mase Consulting Group">
          <img src="/Images/mase_logo_v1_header_v2.png" alt="Mase Consulting Group Logo" />
        </Link>

        <div className="nav-links-wrapper">
          <div className="nav-links">
            <a href="/#about" className={activeSection === 'about' ? 'active' : ''}>
              About
            </a>

            <div className="nav-item" onMouseLeave={() => setOpenDropdown(null)}>
              <a href="/#services" className={activeSection === 'services' ? 'active' : ''}>
                Services
              </a>
              <button
                className={`nav-chevron-btn ${openDropdown === 'services' ? 'open' : ''}`}
                onClick={() => toggle('services')}
                aria-label="Toggle services menu"
              >
                <ChevronDown size={12} aria-hidden="true" />
              </button>
              <div className={`nav-dropdown ${openDropdown === 'services' ? 'open' : ''}`} role="menu">
                {serviceItems.map((item) => (
                  <a
                    key={item.slug}
                    href={`/#services/${item.slug}`}
                    role="menuitem"
                    onClick={(e) => { e.preventDefault(); handleServiceSelect(item.slug); }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="nav-item" onMouseLeave={() => setOpenDropdown(null)}>
              <a href="/#industries" className={activeSection === 'industries' ? 'active' : ''}>
                Industries
              </a>
              <button
                className={`nav-chevron-btn ${openDropdown === 'industries' ? 'open' : ''}`}
                onClick={() => toggle('industries')}
                aria-label="Toggle industries menu"
              >
                <ChevronDown size={12} aria-hidden="true" />
              </button>
              <div className={`nav-dropdown ${openDropdown === 'industries' ? 'open' : ''}`} role="menu">
                {industries.map((industry) => (
                  <Link
                    key={industry.title}
                    to={`/industries#${toSlug(industry.title)}`}
                    role="menuitem"
                    onClick={() => setOpenDropdown(null)}
                  >
                    {industry.title}
                  </Link>
                ))}
              </div>
            </div>

            <a href="/#approach" className={activeSection === 'approach' ? 'active' : ''}>
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

        <a href="/#about" className={`mobile-nav-link ${activeSection === 'about' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
          About
        </a>

        <div className={`mobile-nav-item ${mobileOpenSection === 'services' ? 'open' : ''}`}>
          <div className="mobile-nav-parent-row">
            <a href="/#services" className={`mobile-nav-link ${activeSection === 'services' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
              Services
            </a>
            <button
              className={`mobile-nav-toggle ${mobileOpenSection === 'services' ? 'open' : ''}`}
              aria-label="Toggle services links"
              aria-expanded={mobileOpenSection === 'services'}
              onClick={() => toggleMobileSection('services')}
            >
              <ChevronDown size={14} aria-hidden="true" />
            </button>
          </div>
          <div className={`mobile-nav-sub-group ${mobileOpenSection === 'services' ? 'open' : ''}`}>
            {serviceItems.map((item) => (
              <a
                key={item.slug}
                href={`/#services/${item.slug}`}
                className="mobile-nav-sub-link"
                onClick={() => { handleServiceSelect(item.slug); setMenuOpen(false); }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className={`mobile-nav-item ${mobileOpenSection === 'industries' ? 'open' : ''}`}>
          <div className="mobile-nav-parent-row">
            <a href="/#industries" className={`mobile-nav-link ${activeSection === 'industries' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
              Industries
            </a>
            <button
              className={`mobile-nav-toggle ${mobileOpenSection === 'industries' ? 'open' : ''}`}
              aria-label="Toggle industries links"
              aria-expanded={mobileOpenSection === 'industries'}
              onClick={() => toggleMobileSection('industries')}
            >
              <ChevronDown size={14} aria-hidden="true" />
            </button>
          </div>
          <div className={`mobile-nav-sub-group ${mobileOpenSection === 'industries' ? 'open' : ''}`}>
            {industries.map((industry) => (
              <Link
                key={industry.title}
                to={`/industries#${toSlug(industry.title)}`}
                className="mobile-nav-sub-link"
                onClick={() => setMenuOpen(false)}
              >
                {industry.title}
              </Link>
            ))}
          </div>
        </div>

        <a href="/#approach" className={`mobile-nav-link ${activeSection === 'approach' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
          Approach
        </a>

        <a href="/#contact" className="mobile-nav-cta" onClick={() => setMenuOpen(false)}>
          Contact Us
        </a>
      </div>
    </>
  );
}
