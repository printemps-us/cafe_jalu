import React, {useRef} from 'react';
import gsap from 'gsap';
import Logo from './Logo';
function FriendTile({
  header,
  sub,
  content_header,
  content_sub,
  is_mobile = false,
}) {
  const containerRef = useRef();
  const handleMouseEnter = () => {
    gsap.to(containerRef.current, {
      height: 'auto',
      marginTop: '16px',
      duration: 0.3,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(containerRef.current, {
      height: '0px',
      marginTop: '0px',
      duration: 0.3,
    });
  };
  return (
    <div className="flex-1 flex justify-end items-end">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={` rounded-xl bg-[#c5e4e4] flex-1 flex p-6 gap-3`}
      >
        <div className='w-[60px]'>
          <Logo></Logo>
        </div>
        <div className={`flex-1 ${is_mobile ? 'pt-0' : 'pt-2'}`}>
          <div className="flex flex-col">
            <span
              className={`${
                is_mobile ? 'p-large-mobile' : 'p-large-desktop'
              } uppercase line-clamp-1`}
            >
              {header}
            </span>
            <p
              className={`${
                is_mobile ? 'p-small-regular-mobile' : 'p-small-regular-desktop'
              } uppercase line-clamp-2`}
            >
              {sub}
            </p>
          </div>
          <div
            ref={containerRef}
            className={`flex flex-col gap-2 ${
              is_mobile ? 'ml-[-40px]' : 'ml-[-55px]'
            } h-0 overflow-hidden`}
          >
            <p
              className={`${
                is_mobile ? 'p-small-regular-mobile' : 'p-small-regular-desktop'
              } text-black`}
            >
              {content_sub}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FriendTile;
