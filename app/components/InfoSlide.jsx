import React, {useState, useRef, useEffect} from 'react';
import Plus from '~/assets/Plus.svg';
import Minus from '~/assets/Minus.svg';
import {useSpring, animated} from '@react-spring/web';
import PlusComponent from './PlusComponent';

function InfoSlide({content}) {
  const [open, setOpen] = useState(0);
  const contentRefs = useRef([]);
  const [heights, setHeights] = useState([]);

  // Initialize an array of spring animations for each content section
  const springs = content.map((_, index) =>
    useSpring({
      height: open === index + 1 ? `${heights[index] + 24}px` : '0px',
      paddingTop: open === index + 1 ? '12px' : '0px',
      paddingBottom: open === index + 1 ? '12px' : '0px',
    }),
  );

  useEffect(() => {
    // Measure heights of all content sections
    const newHeights = contentRefs.current.map((ref) => ref?.scrollHeight || 0);
    setHeights(newHeights);
  }, [content]);

  const handleOpen = (num) => {
    setOpen((prevOpen) => (prevOpen === num ? 0 : num));
  };

  return (
    <div>
      {content.map((item, index) => (
        <div key={index}>
          <div
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleOpen(index + 1);
              }
            }}
            onClick={() => {
              handleOpen(index + 1);
            }}
          >
            <div className="border-b-white-4 border-b-1 flex justify-between py-3 items-center">
              <span className="p-small-regular-desktop uppercase ">
                {item.header.value}
              </span>
              <PlusComponent open={open === index + 1} />
            </div>
            <animated.div
              className={`p-small-regular-desktop overflow-hidden ${
                open ? 'overflow-auto' : 'overflow-hidden'
              }`}
              style={springs[index]}
            >
              <div ref={(el) => (contentRefs.current[index] = el)}>
                {item.content.value.split('/n').map((line, lineIndex) => (
                  <React.Fragment key={lineIndex}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </div>
            </animated.div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default InfoSlide;
