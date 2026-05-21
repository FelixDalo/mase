import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { industries, industriesContent } from '../content/siteContent';
import { revealEase } from '../lib/animation';

const toSlug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export function IndustriesSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="site-section industries-section" id="industries">
      <div className="industries-shell">
        <motion.div
          className="industries-header"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35, margin: '0px 0px -10% 0px' }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.72, ease: revealEase }}
        >
          <div className="section-rail section-rail-center">
            <div className="section-rail-label">
              <span className="section-rail-dot" />
              {industriesContent.label}
            </div>
            <div className="section-rail-line" />
          </div>
          <h2 className="two-line-heading" aria-label={industriesContent.title}>
            {industriesContent.title.split(',').map((segment, index) => (
              <span key={`${segment}-${index}`}>
                {index === 0 ? `${segment},` : segment.trim()}
              </span>
            ))}
          </h2>
          <p>{industriesContent.description}</p>
        </motion.div>
      </div>

      <div className="industry-grid industries-grid-layout">
        {industries.map((industry, index) => (
          <motion.article
            className="industry-item"
            key={industry.title}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18, margin: '0px 0px -10% 0px' }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.68, delay: shouldReduceMotion ? 0 : index * 0.045, ease: revealEase }}
            style={{ '--industry-image': `url(${industry.image})` } as CSSProperties}
          >
            <div className="industry-item-meta">
              <span className="industry-item-index">{String(index + 1).padStart(2, '0')}</span>
              <Link
                to={`/industries#${toSlug(industry.title)}`}
                className="industry-item-kicker"
              >
                {industry.kicker}
              </Link>
            </div>
            <div className="industry-item-body">
              <h3>{industry.title}</h3>
              <p>{industry.text}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
