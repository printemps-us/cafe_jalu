import {useEffect} from 'react';
import {useLocation} from '@remix-run/react';

/**
 * Custom scroll restoration that ensures pages always start at the top
 * This works better with our SmoothScroll component than Remix's default ScrollRestoration
 */
export function CustomScrollRestoration() {
  const location = useLocation();

  useEffect(() => {
    // Always scroll to top on route changes
    if (typeof window !== 'undefined') {
      // Disable browser's default scroll restoration
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      
      // Force scroll to top using multiple methods for mobile compatibility
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // Additional mobile scroll reset with delay
      setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 100);
    }
  }, [location.pathname]);

  return null;
}
