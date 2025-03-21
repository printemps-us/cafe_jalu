import {useEffect, useRef} from 'react';
import {gsap} from 'gsap';

function ButtonLoadingAnimation() {
  const circlesRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({
      repeat: -1,
      defaults: {duration: 0.5, ease: 'power1.inOut'},
    });

    // Ensure all circles start correctly
    tl.set(circlesRef.current, {fill: '#D1D1D1', attr: {r: 3}});

    // Animate each circle in sequence
    [0, 1, 2].forEach((i) => {
      tl.to(
        circlesRef.current[i],
        {fill: '#00D072', attr: {r: 5}},
        i * 0.5, // Delay each step
      ).to(
        circlesRef.current[i],
        {fill: '#D1D1D1', attr: {r: 3}},
        (i + 1) * 0.5, // Reset after the next step
      );
    });
  }, []);

  return (
    <svg
      width="70"
      height="10"
      viewBox="0 0 70 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {[20, 35, 50].map((cx, i) => (
        <circle
          key={i}
          ref={(el) => (circlesRef.current[i] = el)}
          cx={cx}
          cy="5"
          r="3"
          fill="#D1D1D1"
        />
      ))}
    </svg>
  );
}

export default ButtonLoadingAnimation;
