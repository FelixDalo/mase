import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Navigation } from '../components/Navigation';
import { InteractiveGrid } from '../components/InteractiveGrid';
import { Footer7 } from '../components/ui/footer-7';
import { ContactSection } from '../sections/ContactSection';
import { servicesDetailed } from '../content/siteContent';
import { revealEase } from '../lib/animation';

export function ServicesPage() {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hasScrolled = useRef(false);

  useEffect(() => {
    document.title = 'Technology, Data & AI Advisory Services | Mase Consulting Group';
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) {
      meta.content =
        'Explore Mase Consulting Group services across digital transformation, data & AI, cloud platforms, cyber security and operating model change.';
    }
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = 'https://maseconsultinggroup.com/services';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const onFirstScroll = () => { hasScrolled.current = true; };
    window.addEventListener('scroll', onFirstScroll, { once: true });

    const observers = blockRefs.current.map((block, i) => {
      if (!block) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && hasScrolled.current) setActiveIndex(i);
        },
        { rootMargin: '-20% 0px -30% 0px' }
      );
      obs.observe(block);
      return obs;
    });

    return () => {
      window.removeEventListener('scroll', onFirstScroll);
      observers.forEach((obs) => obs?.disconnect());
    };
  }, []);

const active = activeIndex !== null ? servicesDetailed[activeIndex] : null;

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
            <h1>Our Services</h1>
            <p>
              Specialist advisory and delivery capabilities across technology, digital transformation,
              data &amp; AI, cyber and enterprise change.
            </p>
          </motion.div>
        </section>

        <div className="sp-split">
          {/* Left sticky panel */}
          <div className="sp-left">
            <InteractiveGrid />
            <div className="sp-left-inner">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex ?? 'intro'}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -14 }}
                  transition={{ duration: shouldReduceMotion ? 0.01 : 0.34, ease: revealEase }}
                  className="sp-left-animated"
                >
                  {active ? (
                    <>
                      <span className="sp-left-num" aria-hidden="true">
                        {String(activeIndex! + 1).padStart(2, '0')}
                      </span>
                      <h2 className="sp-left-title">{active.title}</h2>
                      <p className="sp-left-desc">{active.description}</p>
                    </>
                  ) : (
                    <p className="sp-left-intro">
                      Scroll through our capabilities to explore each service area.
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>

            </div>
          </div>

          {/* Right scrolling blocks */}
          <div className="sp-right">
            <div className="sp-mobile-grid" aria-hidden="true">
              <InteractiveGrid variant="section" />
            </div>
            {servicesDetailed.map((svc, i) => (
              <div
                key={svc.slug}
                id={svc.slug}
                ref={(el: HTMLDivElement | null) => { blockRefs.current[i] = el; }}
                className="sp-block"
                onMouseEnter={() => setActiveIndex(i)}
              >
                {/* Mobile only: title + description */}
                <div className="sp-block-header">
                  <span className="sp-block-num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="sp-block-title">{svc.title}</h2>
                  <p className="sp-block-desc">{svc.description}</p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{ duration: shouldReduceMotion ? 0.01 : 0.6, ease: revealEase }}
                >
                  <p className="sp-block-kicker">Capabilities</p>
                  <ul className="sp-capabilities">
                    {svc.capabilities.map((cap) => (
                      <li key={cap} className="sp-capability">
                        <span className="sp-capability-dot" aria-hidden="true" />
                        {cap}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className="sp-cta">Contact us</a>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

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
              Whether you are shaping a new strategy, modernising technology, or exploring data and
              AI — we would welcome a conversation.
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
