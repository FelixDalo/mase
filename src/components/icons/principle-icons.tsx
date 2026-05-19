import type { SVGProps } from 'react';

export function StrategyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g stroke="#1C1C1E" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="7" pathLength="1" />
        <circle cx="12" cy="12" r="3" pathLength="1" />
        <path d="M12 3V5" pathLength="1" />
        <path d="M12 19V21" pathLength="1" />
        <path d="M3 12H5" pathLength="1" />
        <path d="M19 12H21" pathLength="1" />
      </g>
    </svg>
  );
}

export function DeliveryIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g stroke="#1C1C1E" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="5" width="14" height="14" rx="0" pathLength="1" />
        <path d="M8.4 12.2L11 14.8L15.8 9.6" pathLength="1" />
      </g>
    </svg>
  );
}

export function DataAiIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g stroke="#1C1C1E" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="13.5" width="3" height="5.5" rx="0.5" pathLength="1" />
        <rect x="10.5" y="9.5" width="3" height="9.5" rx="0.5" pathLength="1" />
        <rect x="16" y="11.8" width="3" height="7.2" rx="0.5" pathLength="1" />
        <path d="M12 4.3L13.6 5.9L12 7.5L10.4 5.9L12 4.3Z" pathLength="1" />
      </g>
    </svg>
  );
}

export function CybersecurityIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g stroke="#1C1C1E" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 4.5H18V11.2C18 14.9 15.7 18.2 12 19.5C8.3 18.2 6 14.9 6 11.2V4.5Z" pathLength="1" />
        <rect x="9.2" y="11" width="5.6" height="4.2" rx="0.7" pathLength="1" />
        <path d="M10.5 11V9.6C10.5 8.7 11.2 8 12 8C12.8 8 13.5 8.7 13.5 9.6V11" pathLength="1" />
      </g>
    </svg>
  );
}
