import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function resolveTargetId(hash: string) {
  if (!hash) {
    return null;
  }

  const decoded = decodeURIComponent(hash.replace(/^#/, ''));

  if (decoded.startsWith('services/')) {
    return 'services';
  }

  return decoded;
}

export function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    const targetId = resolveTargetId(location.hash);

    if (!targetId) {
      return;
    }

    let attempts = 0;

    const scrollToTarget = () => {
      const element = document.getElementById(targetId);

      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      attempts += 1;
      if (attempts < 12) {
        window.setTimeout(scrollToTarget, 80);
      }
    };

    scrollToTarget();
  }, [location.hash, location.pathname]);

  return null;
}
