import React, {useRef, useEffect, useState} from 'react';
import Plus from '~/assets/Plus.svg';
import Minus from '~/assets/Minus.svg';
import gsap from 'gsap';
import PlusComponent from './PlusComponent';
import { FormattedText } from './functions/formatText';

function DropDownInfo({header, content, isMobile}) {
  const dropdownRef = useRef();
  const contentRef = useRef();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Initially set content wrapper to invisible but natural height
    gsap.set(dropdownRef.current, {
      height: 0,
      paddingTop: 0,
      overflow: 'hidden'
    });
  }, []);

  useEffect(() => {
    if (open) {
      // First set height to auto to get the true height
      gsap.set(dropdownRef.current, { 
        height: 'auto',
        paddingTop: isMobile ? 16 : 24
      });
      
      // Get the computed height
      const height = dropdownRef.current.offsetHeight;
      
      // Reset height to 0
      gsap.set(dropdownRef.current, { 
        height: 0,
        paddingTop: 0
      });
      
      // Animate to the computed height
      gsap.to(dropdownRef.current, {
        height: height,
        paddingTop: isMobile ? 16 : 24,
        duration: 0.4,
        ease: "power3.out",
        overwrite: true
      });
    } else {
      // Animate closing
      gsap.to(dropdownRef.current, {
        height: 0,
        paddingTop: 0,
        duration: 0.3,
        ease: "power2.inOut",
        overwrite: true
      });
    }
  }, [open, isMobile]);

  function handleOpen() {
    setOpen(!open);
  }

  return (
    <button
      className={`w-full p-4 md:p-6 border-b-1 border-b-white-4 ${
        isMobile ? 'max-w-full px-6' : 'max-w-[924px]'
      }`}
      onClick={handleOpen}
    >
      <div className="flex justify-between items-center text-start gap-6">
        <span
          className={`${open ? 'font-bold' : 'font-normal'} ${
            isMobile ? 'p-small-mobile' : 'p-standard-desktop'
          } transition-all duration-300`}
        >
          {header}
        </span>
        <PlusComponent open={open} />
      </div>
      <div ref={dropdownRef} className="overflow-hidden text-start h-0">
        <div ref={contentRef} className="pb-2">
          <p
            className={`text-black-2 ${
              isMobile ? 'p-small-regular-mobile' : 'p-small-regular-desktop'
            }`}
          >
            <FormattedText text={content} />
          </p>
        </div>
      </div>
    </button>
  );
}

export default DropDownInfo;
