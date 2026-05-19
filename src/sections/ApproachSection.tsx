import { useRef } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { approachContent, approachSteps } from '../content/siteContent';

function ProcessTimelineStep({
  title,
  text,
  index,
}: {
  key?: string;
  title: string;
  text: string;
  index: number;
}) {
  const stepRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(stepRef, {
    margin: '-24% 0px -32% 0px',
  });
  const shouldReduceMotion = useReducedMotion();

  const revealTransition = {
    duration: shouldReduceMotion ? 0.01 : 0.7,
    ease: [0.16, 1, 0.3, 1] as const,
  };

  return (
    <article ref={stepRef} className="process-step">
      <motion.div
        className="process-step-left"
        initial={false}
        animate={{ opacity: isInView ? 1 : 0.35 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.span
          className="process-step-index"
          initial={false}
          animate={{
            opacity: isInView ? 1 : 0,
            y: isInView || shouldReduceMotion ? 0 : 16,
          }}
          transition={revealTransition}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.span>
        <motion.h3
          initial={false}
          animate={{
            opacity: isInView ? 1 : 0,
            y: isInView || shouldReduceMotion ? 0 : 20,
          }}
          transition={{ ...revealTransition, delay: 0.08 }}
        >
          {title}
        </motion.h3>
      </motion.div>

      <div className="process-step-marker-slot" aria-hidden="true">
        <motion.div
          className="process-step-marker"
          initial={false}
          animate={{
            scale: isInView ? 1.45 : 1,
            backgroundColor: isInView ? 'var(--teal-tint)' : 'var(--charcoal)',
            borderColor: isInView ? 'rgba(29, 106, 90, 0.9)' : 'rgba(28, 28, 30, 0.35)',
          }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          {isInView && <motion.span layoutId="process-marker-pulse" className="process-step-marker-glow" />}
        </motion.div>
      </div>

      <div className="process-step-right">
        <motion.p
          initial={false}
          animate={{
            opacity: isInView ? 1 : 0,
            y: isInView || shouldReduceMotion ? 0 : 20,
          }}
          transition={{ ...revealTransition, delay: 0.16 }}
        >
          {text}
        </motion.p>
      </div>
    </article>
  );
}

export function ApproachSection() {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.82', 'end 0.28'],
  });
  const axisScaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.45,
  });

  return (
    <section className="site-section approach-section" id="approach">
      <div className="process-header">
        <div className="section-rail section-rail-center">
          <div className="section-rail-label">
            <span className="section-rail-dot" />
            {approachContent.label}
          </div>
          <div className="section-rail-line" />
        </div>
        <h2 className="two-line-heading" aria-label={approachContent.ariaLabel}>
          {approachContent.title.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h2>
        <p>{approachContent.description}</p>
      </div>

      <div ref={timelineRef} className="process-timeline">
        <div className="process-axis" aria-hidden="true">
          <motion.div className="process-axis-progress" style={{ scaleY: axisScaleY }} />
        </div>
        {approachSteps.map(([title, text], index) => (
          <ProcessTimelineStep key={title} title={title} text={text} index={index} />
        ))}
      </div>
    </section>
  );
}
