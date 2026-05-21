import { useEffect } from 'react';
import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { Navigation } from '../components/Navigation';
import { Footer7 } from '../components/ui/footer-7';
import { ContactSection } from '../sections/ContactSection';
import { industries, industriesContent } from '../content/siteContent';
import { revealEase } from '../lib/animation';

export function IndustriesPage() {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    document.title = 'Industries | Mase Consulting Group';
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) {
      meta.content =
        'Mase Consulting Group supports organisations across Government & Public Sector, Financial Services, Energy & Resources, Telecommunications & Media, Consumer & Retail, and Healthcare & Life Sciences.';
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
              <span>Industries</span>
            </div>
            <h1>{industriesContent.title}</h1>
            <p>{industriesContent.description}</p>
          </motion.div>
        </section>

        <section className="industries-detail-section">
          <div className="industry-grid industries-grid-layout">
            {industries.map((industry, index) => (
              <motion.article
                className="industry-item"
                key={industry.title}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{
                  duration: shouldReduceMotion ? 0.01 : 0.68,
                  delay: shouldReduceMotion ? 0 : index * 0.045,
                  ease: revealEase,
                }}
                style={{ '--industry-image': `url(${industry.image})` } as CSSProperties}
              >
                <div className="industry-item-meta">
                  <span className="industry-item-index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="industry-item-kicker">Industry</span>
                </div>
                <div className="industry-item-body">
                  <h2>{industry.title}</h2>
                  <p>{industry.text}</p>
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
            <p>We support organisations across sectors where technology, operating model and delivery decisions carry real weight.</p>
            <a href="/#contact" className="btn-primary">Get in touch</a>
          </motion.div>
        </section>

        <ContactSection />
        <Footer7 />
      </main>
    </div>
  );
}
