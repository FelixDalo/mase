import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import {
  activeServiceStorageKey,
  serviceSlugMap,
  services,
  servicesContent,
} from '../content/siteContent';
import { revealEase } from '../lib/animation';

export function ServicesSection() {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const handleLearnMore = (slug: string) => {
    window.sessionStorage.setItem(activeServiceStorageKey, slug);
  };

  useEffect(() => {
    const applyActiveServiceFromLocation = () => {
      const hashMatch = window.location.hash.match(/^#services\/([a-z-]+)$/);
      const searchService = new URLSearchParams(window.location.search).get('service');
      const storedService = window.sessionStorage.getItem(activeServiceStorageKey);
      const serviceSlug = hashMatch?.[1] ?? searchService ?? storedService;

      if (!serviceSlug) {
        return;
      }

      const nextIndex = serviceSlugMap[serviceSlug as keyof typeof serviceSlugMap];

      if (nextIndex !== undefined) {
        setActiveServiceIndex(nextIndex);
      }
    };

    applyActiveServiceFromLocation();
    window.addEventListener('hashchange', applyActiveServiceFromLocation);
    window.addEventListener('mase:service-select', applyActiveServiceFromLocation);

    return () => {
      window.removeEventListener('hashchange', applyActiveServiceFromLocation);
      window.removeEventListener('mase:service-select', applyActiveServiceFromLocation);
    };
  }, []);

  return (
    <section className="site-section services-section" id="services">
      <div className="services-shell">
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35, margin: '0px 0px -10% 0px' }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.72, ease: revealEase }}
        >
          <div className="section-rail services-rail">
            <div className="section-rail-label">
              <span className="section-rail-dot" />
              {servicesContent.label}
            </div>
            <div className="section-rail-line" />
          </div>
          <div className="services-header-editorial">
            <div className="services-header-left">
              <h2>{servicesContent.title}</h2>
            </div>
            <div className="services-header-right">
              <p>{servicesContent.description}</p>
              <Link to="/services" className="service-panel-cta">
                Explore all services
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="services-accordion"
          role="tablist"
          aria-label="Service categories"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2, margin: '0px 0px -10% 0px' }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.76, delay: shouldReduceMotion ? 0 : 0.1, ease: revealEase }}
        >
          {services.map((service, index) => {
            const isActive = index === activeServiceIndex;

            return (
              <button
                key={service.title}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`service-panel ${isActive ? 'active' : ''}`}
                onClick={() => setActiveServiceIndex(index)}
              >
                <div className="service-panel-bg" aria-hidden="true" />
                <div className="service-panel-label">
                  <span className="service-panel-index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="service-panel-title-vertical">{service.label}</span>
                </div>

                <div className="service-panel-content-wrap">
                  <div className="service-panel-content">
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                    <div className="service-panel-badges">
                      {service.badges.map((badge) => (
                        <span className="service-panel-badge" key={badge}>
                          {badge}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={`/services#${service.slug}`}
                      className="service-panel-cta"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLearnMore(service.slug);
                      }}
                    >
                      {servicesContent.learnMoreLabel}
                    </Link>
                  </div>
                </div>
              </button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
