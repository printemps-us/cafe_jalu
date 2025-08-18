import React, {useState, useEffect, useRef} from 'react';
import Arrow from '~/assets/Arrow-right.svg';
import {useNavigate} from '@remix-run/react';
import gsap from 'gsap';
import ButtonLoadingAnimation from './ButtonLoadingAnimation';
function AnimatedButton({
  text,
  arrow = false,
  arrowStart = false,
  tilted = false,
  hoverColor = '#00D072',
  bgColor = 'white',
  border = '#E7E7E7',
  hoverBorder,
  textColor,
  w,
  h,
  clickURL,
  onClick,
  disabled = false,
  borderRadius = '12px',
  textPos = 'center',
  pen = false,
  loading = false,
  noMaxWidth = false,
}) {
  const navigate = useNavigate();
  const [isHover, setHover] = useState(false);
  const textRef = useRef();
  const hoverRef = useRef();
  const ArrowBaseRef = useRef();
  const ArrowHiddenRef = useRef();
  useEffect(() => {
    if (isHover) {
      gsap.to(hoverRef.current, {
        top: 0,
      });
      gsap.to(textRef.current, {marginTop: -15});
      if (ArrowHiddenRef.current) {
        gsap.to(ArrowHiddenRef.current, {marginLeft: 0});
      }
    } else {
      if (ArrowHiddenRef.current) {
        gsap.to(ArrowHiddenRef.current, {marginLeft: '-24px'});
      }
      gsap.to(textRef.current, {marginTop: 0});
      gsap.to(hoverRef.current, {
        top: 50,
      });
    }
  }, [isHover]);
  const handleClick = (e) => {
    if (clickURL) {
      if (clickURL.startsWith('/')) {
        // Internal navigation
        navigate(clickURL);
      } else {
        // External navigation
        window.open(clickURL, '_blank');
      }
    }
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className="overflow-hidden relative z-10"
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      style={{
        height: h,
        width: w,
        borderRadius,
        cursor: disabled ? 'auto' : 'pointer',
        ...(noMaxWidth ? {} : {maxWidth: '339px'}),
      }}
    >
      <div className="relative h-full">
        <div
          className="absolute top-0 left-0 border-1 px-6 h-full w-full z-10"
          style={{
            borderRadius,
            backgroundColor: bgColor,
            borderColor: border,
          }}
        ></div>
        <div className="absolute top-0 right-4 z-30 overflow-hidden h-full flex items-center w-6">
          {arrow && (
            <img
              src={Arrow}
              ref={ArrowHiddenRef}
              alt="Arrow"
              height={10}
              className="ml-[-24px]"
            />
          )}
          {arrowStart && (
            <img src={Arrow} ref={ArrowBaseRef} alt="Arrow" height={10} />
          )}
          {pen && (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.4322 4.80092C15.9006 4.33226 16.6602 4.33194 17.129 4.80021L19.1994 6.86829C19.6684 7.33675 19.6687 8.09674 19.2001 8.56559L9.42645 18.3446C9.25931 18.5119 9.04649 18.626 8.81472 18.6727L4.44873 19.5524L5.33003 15.1916C5.37678 14.9603 5.49068 14.7479 5.65749 14.581L15.4322 4.80092Z"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          {tilted && (
            <>
              <img
                src={Arrow}
                ref={ArrowHiddenRef}
                alt="Arrow"
                height={10}
                className="ml-[-24px] -rotate-45"
              />
              <img
                src={Arrow}
                ref={ArrowBaseRef}
                alt="Arrow"
                height={10}
                className="-rotate-45"
              />
            </>
          )}
        </div>
        <div
          className="absolute top-0 items-center left-0 flex px-6 h-full w-full z-30"
          style={{justifyContent: textPos, borderRadius}}
        >
          <div className="overflow-hidden h-3">
            {loading && <ButtonLoadingAnimation></ButtonLoadingAnimation>}
            {!loading && (
              <p
                ref={textRef}
                className="a-button"
                style={{
                  color: disabled
                    ? '#565656'
                    : (bgColor === 'black') | (bgColor === '#000000')
                    ? 'white'
                    : textColor
                    ? textColor
                    : 'black',
                }}
              >
                {text}
              </p>
            )}
            {!loading && (
              <p
                className="a-button"
                style={{
                  color:
                    (hoverColor === 'black') | (hoverColor === '#000000')
                      ? 'white'
                      : textColor
                      ? textColor
                      : 'black',
                }}
              >
                {text}
              </p>
            )}
          </div>
        </div>
      </div>

      <div
        ref={hoverRef}
        style={{
          borderRadius,
          backgroundColor: hoverColor,
          borderColor: hoverBorder ? hoverBorder : hoverColor,
        }}
        className="absolute border-1 flex items-center px-6 h-full w-full z-20"
      ></div>
    </button>
  );
}

export default AnimatedButton;
