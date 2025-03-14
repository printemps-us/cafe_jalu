import React, {useEffect, useRef} from 'react';
import Lenis from 'lenis';
import {useLocation} from '@remix-run/react';

const SmoothScroll = ({children}) => {
  const lenisRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Add route-change class
    document.documentElement.classList.add('route-change');

    // Destroy existing Lenis instance
    if (lenisRef.current) {
      lenisRef.current.destroy();
    }

    // Force scroll to top
    window.scrollTo(0, 0);

    // Initialize new Lenis instance
    lenisRef.current = new Lenis({
      duration: 1.2,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Remove route-change class after a brief delay
    setTimeout(() => {
      document.documentElement.classList.remove('route-change');
    }, 100);

    function raf(time) {
      if (lenisRef.current) {
        lenisRef.current.raf(time);
        requestAnimationFrame(raf);
      }
    }
    requestAnimationFrame(raf);

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, [location.pathname]);

  return <>{children}</>;
};

export default SmoothScroll;
