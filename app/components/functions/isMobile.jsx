import {useState, useEffect} from 'react';

const useIsMobile = (initialValue = false, breakpoint = 950) => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return initialValue;
    return window.innerWidth <= breakpoint;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);


  return isMobile;
};

export function checkIfMobile(userAgent) {
  const regex =
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i;
  return regex.test(userAgent);
}

export default useIsMobile;
