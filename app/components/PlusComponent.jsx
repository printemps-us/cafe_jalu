import React, {useEffect, useRef} from 'react';
import gsap from 'gsap';
function PlusComponent({open}) {
  const plusRef = useRef();
  useEffect(() => {
    gsap.to(plusRef.current, {
      rotate: open ? 0 : 90,
      duration: 0.3,
      ease: 'power2.inOut',
    });
  }, [open]);

  return (
    <div>
      <div className="w-6 h-6 flex items-center justify-center relative">
        {/* Horizontal line (always visible) */}
        <div className="absolute w-[14px] h-[1px] bg-[#af4145]" />
        {/* Vertical line (rotates) */}
        <div
          ref={plusRef}
          className="vertical-line absolute w-[14px] h-[1px] bg-[#af4145] rotate-90"
          style={{
            transformOrigin: 'center',
          }}
        />
      </div>
    </div>
  );
}

export default PlusComponent;
