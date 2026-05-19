import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { revealEase } from '../../lib/animation';

interface RevealBlockProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function RevealBlock({ children, className = '', delay = 0 }: RevealBlockProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22, margin: '0px 0px -12% 0px' }}
      transition={{ duration: shouldReduceMotion ? 0.01 : 0.72, delay: shouldReduceMotion ? 0 : delay, ease: revealEase }}
    >
      {children}
    </motion.div>
  );
}
