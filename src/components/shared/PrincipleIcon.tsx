import type { ComponentType, SVGProps } from 'react';
import { useRef } from 'react';
import { useInView } from 'motion/react';

interface PrincipleIconProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export function PrincipleIcon({ icon: Icon }: PrincipleIconProps) {
  const iconRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(iconRef, { margin: '-12% 0px -12% 0px' });

  return (
    <div
      ref={iconRef}
      className={`principle-icon ${isInView ? 'is-visible' : ''}`}
      aria-hidden="true"
    >
      <Icon className="principle-icon-svg" />
    </div>
  );
}
