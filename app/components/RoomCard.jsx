import React, {useRef, useState, useEffect} from 'react';
import AnimatedButton from './AnimatedButton';
import gsap from 'gsap';
import {Link, useNavigate} from '@remix-run/react';
import {FormattedText} from './functions/formatText';
function RoomCard({header, sub, image, button_text, link}) {
    const navigate = useNavigate();
  const containerRef = useRef();
  const backgroundRef = useRef();
  const headerRef = useRef();
  const [height, setHeight] = useState();
  const handleMouseEnter = () => {
    gsap.to(containerRef.current, {y: -height, height, duration: 0.3});
    gsap.to(backgroundRef.current, {
      filter: 'brightness(0.4)',
      // height: 504,
      // marginTop: -42,
      // width: 363,
      duration: 0.3,
    });
    gsap.to(headerRef.current, {color: 'white', duration: 0.3});
  };
  useEffect(() => {
    // Measure heights of all content sections
    const contentHeight = containerRef.current?.scrollHeight || 0;
    setHeight(contentHeight);
  }, [sub]);

  const handleMouseLeave = () => {
    gsap.to(containerRef.current, {y: 0, height: '20px', duration: 0.3});
    gsap.to(backgroundRef.current, {
      filter: 'brightness(1)',
      // height: 420,
      marginTop: 0,
      // width: 294,
      duration: 0.3,
    });

    gsap.to(headerRef.current, {color: 'black', duration: 0.3});
  };

  const isExternal = link && !link.startsWith('/');

  const handleClick = (e) => {
    if (isExternal) {
      e.preventDefault(); // prevent default <a> behavior for control
      window.open(link, '_blank');
    } else {
      e.preventDefault(); // prevent default <Link> behavior
      navigate(link);
    }

    if (onClick) onClick();
  };

  const Wrapper = isExternal ? 'a' : Link;
  const wrapperProps = isExternal
    ? {href: link, target: '_blank', rel: 'noopener noreferrer'}
    : {to: link};
  return (
    <Wrapper
      {...wrapperProps}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{textDecoration: 'none'}}
      className="flex-1"
    >
      <div
        ref={backgroundRef}
        className="h-[420px] bg-cover bg-center bg-no-repeat rounded-xl flex-col flex justify-end"
        style={{backgroundImage: `url(${image.url})`, filter: 'brightness(1)'}}
      ></div>

      <div
        ref={containerRef}
        className="py-4 px-6 gap-6 flex-col flex overflow-hidden h-5"
      >
        <div className="flex flex-col gap-[18px]">
          <span ref={headerRef} className="p-small-bold-desktop uppercase">
            {header}
          </span>
          <p className="text-white p-small-regular-desktop">
            <FormattedText text={sub} />
          </p>
        </div>

        <div>
          <AnimatedButton
            hoverColor="#AF4145"
            h="42px"
            w="100%"
            text={button_text}
            clickURL={link}
          />
        </div>
      </div>
    </Wrapper>
  );
}

export default RoomCard;
