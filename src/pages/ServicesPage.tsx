import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { Navigation } from '../components/Navigation';
import { Footer7 } from '../components/ui/footer-7';
import { ContactSection } from '../sections/ContactSection';
import { services, servicesContent } from '../content/siteContent';
import { revealEase } from '../lib/animation';

export function ServicesPage() {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    document.title = 'Services | Mase Consulting Group';
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) {
      meta.content =
        'Specialist advisory and delivery capabilities across Technology & Digital Transformation, Data & AI, Cloud Platforms, Cyber Security & Digital Risk, and Operating Model, People & Change.';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="version1-page">
      <Navigation />
      <main>
        <section className="page-hero-section">
          <motion.div
            className="page-hero-inner"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.72, ease: revealEase }}
          >
            <div className="page-hero-breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <span>Services</span>
            </div>
            <h1>{servicesContent.title}</h1>
            <p>{servicesContent.description}</p>
          </motion.div>
        </section>

        <section className="services-detail-section">
          <div className="services-detail-grid">
            {services.map((service, index) => (
              <motion.article
                key={service.title}
                className="service-detail-card"
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: shouldReduceMotion ? 0.01 : 0.68,
                  delay: shouldReduceMotion ? 0 : index * 0.06,
                  ease: revealEase,
                }}
              >
                <div className="service-detail-index">{String(index + 1).padStart(2, '0')}</div>
                <div className="service-detail-body">
                  <h2>{service.title}</h2>
                  <p>{service.text}</p>
                  <ul className="service-detail-badges">
                    {service.badges.map((badge) => (
                      <li key={badge} className="service-panel-badge">{badge}</li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="page-cta-section">
          <motion.div
            className="page-cta-inner"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.68, ease: revealEase }}
          >
            <h2>Ready to start a conversation?</h2>
            <p>Whether you are shaping a new strategy, modernising technology, or exploring data and AI — we would welcome a conversation.</p>
            <a href="/#contact" className="btn-primary">Get in touch</a>
          </motion.div>
        </section>

        <ContactSection />
        <Footer7 />
      </main>
    </div>
  );
}
