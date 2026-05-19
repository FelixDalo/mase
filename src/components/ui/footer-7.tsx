import type { ReactElement } from 'react';
import { Linkedin } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

interface Footer7Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string; serviceSlug?: string }>;
  }>;
  description?: string;
  socialLinks?: Array<{
    icon: ReactElement;
    href: string;
    label: string;
  }>;
  copyright?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}

const defaultSections = [
  {
    title: 'Pages',
    links: [
      { name: 'Home', href: '#' },
      { name: 'About', href: '#about' },
      { name: 'Services', href: '#services' },
      { name: 'Industries', href: '#industries' },
      { name: 'Approach', href: '#approach' },
      { name: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Services',
    links: [
      { name: 'Technology & Digital Transformation', href: '#services/digital-transformation', serviceSlug: 'digital-transformation' },
      { name: 'Data & AI', href: '#services/data-and-ai', serviceSlug: 'data-and-ai' },
      { name: 'Cloud, Platforms & Enterprise Solutions', href: '#services/cloud-solutions', serviceSlug: 'cloud-solutions' },
      { name: 'Cyber Security & Digital Risk', href: '#services/cyber-security', serviceSlug: 'cyber-security' },
      { name: 'Operating Model, People & Change', href: '#services/operational-modelling', serviceSlug: 'operational-modelling' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { name: 'info@maseconsultinggroup.com', href: 'mailto:info@maseconsultinggroup.com' },
      { name: 'Gaborone, Botswana', href: '#contact' },
    ],
  },
];

const activeServiceStorageKey = 'mase-active-service';

const defaultSocialLinks = [
  { icon: <Linkedin className="footer-social-icon" />, href: 'https://www.linkedin.com', label: 'LinkedIn' },
];

const defaultLegalLinks = [
  { name: 'Terms and Conditions', href: '#' },
  { name: 'Privacy Policy', href: '#' },
];

export function Footer7({
  logo = {
    url: '#',
    src: '/Images/mase_logo_v2_inverted.png',
    alt: 'Mase Consulting Group',
    title: 'Mase Consulting Group',
  },
  sections = defaultSections,
  description = 'A boutique advisory partner helping organisations modernise, transform and scale through technology, data and AI.',
  socialLinks = defaultSocialLinks,
  copyright = '\u00a9 2026 Mase Consulting Group. All rights reserved.',
  legalLinks = defaultLegalLinks,
}: Footer7Props) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <footer className="site-footer footer7">
      <motion.div
        className="footer7-shell"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: shouldReduceMotion ? 0.01 : 0.62, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="footer7-main">
          <div className="footer7-brand">
            <div className="footer7-logo-row">
              <a href={logo.url} aria-label={logo.title}>
                <img src={logo.src} alt={logo.alt} title={logo.title} className="footer7-logo" />
              </a>
            </div>
            <p>{description}</p>
            <ul className="footer7-socials" aria-label="Social links">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a href={social.href} aria-label={social.label} target="_blank" rel="noreferrer">
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer7-sections">
            {sections.map((section) => (
              <div className="footer7-section" key={section.title}>
                <h3>{section.title}</h3>
                <ul>
                  {section.links.map((link) => (
                    <li key={`${section.title}-${link.name}`}>
                      <a
                        href={link.href}
                        onClick={(event) => {
                          if (!link.serviceSlug) {
                            return;
                          }

                          event.preventDefault();
                          window.sessionStorage.setItem(activeServiceStorageKey, link.serviceSlug);
                          window.history.replaceState(null, '', link.href);
                          window.dispatchEvent(new Event('mase:service-select'));
                          document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer7-bottom">
          <p>{copyright}</p>
          <ul>
            {legalLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </footer>
  );
}
