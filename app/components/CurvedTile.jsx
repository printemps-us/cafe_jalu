import React, {useState, useEffect, useRef} from 'react';
import AnimatedButton from './AnimatedButton';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useSpring, animated} from '@react-spring/web';
function CurvedTile({
  num,
  h,
  data,
  animate = true,
  button,
  header,
  content,
  parentRef,
  image,
  width,
  arrows = true,
}) {
  const [isHover, setHover] = useState(false);
  const [hasPassedEnd, setHasPassedEnd] = useState(!animate);
  const boxRef = useRef(null);
  useEffect(() => {
    // Register ScrollTrigger plugin

    gsap.registerPlugin(ScrollTrigger);
    if (animate) {
      // Animation setup
      gsap.fromTo(
        boxRef.current,
        {x: `-${num}00%`},
        {
          x: 0,
          duration: 1,
          scrollTrigger: {
            id: `curved_tile_animation_${header}_trigger`,
            trigger: parentRef.current,
            start: '-100% 90%', // start when the top of the box is 80% down the viewport
            end: '20% 55%', // end when the top of the box reaches 30% down the viewport
            scrub: true, // smooth scrubbing
            toggleActions: 'play none none reverse', // play and reverse on scroll up
            onLeave: () => setHasPassedEnd(true),
            onEnterBack: () => setHasPassedEnd(false),
          },
        },
      );
    }
    // // Refresh ScrollTrigger after the page fully loads
    window.onload = () => {
      ScrollTrigger.refresh();
    };
    return () => {
      // Clean up on component unmount
      ScrollTrigger.killAll();
    };
  }, []);
  const filters = useSpring({
    filter: isHover ? 'brightness(0.6)' : 'brightness(1)',
  });
  const styleHoverText = useSpring({
    overflow: 'hidden',
    transform: isHover ? `translateY(-100%)` : `translateY(0%)`,
  });
  const colorSpring = useSpring({
    color: isHover ? 'white' : 'black',
  });
  const colorSubSpring = useSpring({
    color: isHover ? '#D1D1D1' : 'black',
  });

  const {flex, transform} = useSpring({
    to: {
      flex: isHover ? 3 : 2,
    },
    config: (key) => {
      if (key === 'transform') {
        return {tension: 10, friction: 5, clamp: true};
      }
      return {tension: 50, friction: 10, clamp: true}; // Add different config for transform if needed
    },
  });

  const handleMouseEnter = () => {
    if (hasPassedEnd) {
      setHover(true);
    }
  };

  return (
    <animated.div style={{flex, transform}} ref={boxRef} className="flex-1">
      <animated.div
        className="relative overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setHover(false)}
        style={{height: h}}
      >
        <animated.div
          className="w-full box-border bg-cover bg-center bg-no-repeat"
          style={{
            ...filters,
            height: `calc(100% - 48px)`,
            backgroundImage: `url(${image.url})`,
            borderRadius: '12px 12px 200px 12px',
          }}
        ></animated.div>
        <animated.div
          className="flex flex-col px-6 py-[18px] w-full gap-6"
          style={styleHoverText}
        >
          <animated.span
            style={colorSpring}
            className="p-large-desktop uppercase"
          >
            {header}
          </animated.span>
          <animated.p
            style={colorSubSpring}
            className="p-small-regular-desktop w-4/6"
          >
            {content}
          </animated.p>
          <AnimatedButton
            arrow={arrows}
            h={'42px'}
            w={'60%'}
            text={button.button_text.value}
            bgColor={'white'}
            hoverColor={button.hover_color.value}
            clickURL={button.link?.value}
          />
        </animated.div>
      </animated.div>
    </animated.div>
  );
}

export default CurvedTile;
