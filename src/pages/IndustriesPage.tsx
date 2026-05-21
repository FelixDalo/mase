import { useEffect } from 'react';
import type { CSSProperties } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Navigation } from '../components/Navigation';
import { Footer7 } from '../components/ui/footer-7';
import { ContactSection } from '../sections/ContactSection';
import { industries, industriesContent } from '../content/siteContent';
import { revealEase } from '../lib/animation';

const toSlug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export function IndustriesPage() {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    document.title = 'Industries | Mase Consulting Group';
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) {
      meta.content =
        'Mase Consulting Group supports organisations across Government & Public Sector, Financial Services, Energy & Resources, Telecommunications & Media, Consumer & Retail, and Healthcare & Life Sciences.';
    }
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = 'https://maseconsultinggroup.com/industries';
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
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
            <h1>{industriesContent.title}</h1>
            <p>{industriesContent.description}</p>
          </motion.div>
        </section>

        <section className="ind-stack">
          {industries.map((industry, i) => (
            <article
              key={industry.title}
              id={toSlug(industry.title)}
              className="ind-card"
              style={{ '--i': i } as CSSProperties}
            >
              <div className="ind-card-tab">
                <span className="ind-card-tab-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="ind-card-tab-label">{industry.title}</span>
              </div>

              <div className="ind-card-body">
                <div
                  className="ind-card-image"
                  role="img"
                  aria-label={industry.title}
                  style={{ backgroundImage: `url(${industry.image})` }}
                />
                <div className="ind-card-content">
                  <motion.div
                    className="ind-card-inner"
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: shouldReduceMotion ? 0.01 : 0.68, ease: revealEase }}
                  >
                    <h2 className="ind-card-title">{industry.title}</h2>
                    <p className="ind-card-text">{industry.text}</p>
                    <a href="#contact" className="sp-cta">Contact us</a>
                  </motion.div>
                </div>
              </div>
            </article>
          ))}
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
            <p>
              We support organisations across sectors where technology, operating model and delivery
              decisions carry real weight.
            </p>
            <a href="#contact" className="btn-primary">Contact us</a>
          </motion.div>
        </section>

        <ContactSection />
        <Footer7 />
      </main>
    </div>
  );
}
