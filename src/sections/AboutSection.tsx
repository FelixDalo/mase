import { motion, useReducedMotion } from 'motion/react';
import { aboutContent, homeIntroPoints } from '../content/siteContent';
import { revealEase } from '../lib/animation';
import { PrincipleIcon } from '../components/shared/PrincipleIcon';
import { RevealBlock } from '../components/shared/RevealBlock';

export function AboutSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="site-section intro-section" id="about">
      <RevealBlock className="about-rail">
        <>
          <div className="about-rail-label">
            <span className="about-rail-dot" />
            {aboutContent.railLabel}
          </div>
          <div className="about-rail-line" />
        </>
      </RevealBlock>

      <div className="about-editorial-grid">
        <RevealBlock className="about-editorial-left" delay={0.06}>
          <h2 className="about-editorial-title">{aboutContent.title}</h2>
        </RevealBlock>
        <RevealBlock className="about-editorial-right" delay={0.14}>
          <p className="about-editorial-copy">{aboutContent.copy}</p>
          <a href={aboutContent.ctaHref} className="about-editorial-cta">
            {aboutContent.ctaLabel}
          </a>
        </RevealBlock>
      </div>

      <div className="principles-grid about-principles-grid" aria-labelledby="principles-heading">
        {homeIntroPoints.map((point, index) => (
          <motion.article
            className="principle-item"
            key={point.title}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.28, margin: '0px 0px -10% 0px' }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.68, delay: shouldReduceMotion ? 0 : index * 0.055, ease: revealEase }}
          >
            <PrincipleIcon icon={point.icon} />
            <h3 id={point.title === homeIntroPoints[0].title ? 'principles-heading' : undefined}>
              {point.title.split('\n').map((line, lineIndex, lines) => (
                <span key={`${line}-${lineIndex}`}>
                  {line}
                  {lineIndex < lines.length - 1 && <br />}
                </span>
              ))}
            </h3>
            <p>{point.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
