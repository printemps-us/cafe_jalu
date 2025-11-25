import React, {useRef, useState, useEffect} from 'react';
import AnimatedButton from './AnimatedButton';
import gsap from 'gsap';
import {Image} from '@shopify/hydrogen';
import {Link} from '@remix-run/react';

function Popup({data, onClose, isMobile}) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const [height, setHeight] = useState(0);
  const validEmail = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  );

  // Optionally, auto-close if form never loads after N seconds
  useEffect(() => {
    sessionStorage.setItem('hasSeenPopup', 'true');
  }, []);
  const [hasOpened, setHasOpened] = useState(false);
  useEffect(() => {
    if (height === 0) {
      if (hasOpened) {
        onClose();
      }
    } else {
      setHasOpened(true);
    }
  }, [height]);

  return (
    <button
      className="fixed inset-0 z-110 flex items-center justify-center"
      style={{
        background: 'rgba(0, 0, 0, 0.7)',
        cursor: 'default',
      }}
      onClick={onClose}
    >
      <div
        className="relative max-w-[900px] w-[70%] mx-auto bg-white rounded-[24px] overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10 p-2 hover:opacity-70 transition-opacity"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="grey"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className={`md:h-[400px] flex ${isMobile ? 'flex-col' : ''}`}>
          <div className="flex-1">
            <Image
              className="w-full h-full object-cover"
              data={data.image.reference.image}
            ></Image>
          </div>

          <div className="flex-1 flex flex-col justify-between p-6">
            <div className="pb-6">
              <h2
                className={`${
                  isMobile ? 'h4-mobile text-center' : 'h3-desktop text-start'
                } uppercase `}
              >
                {data.title.value}
              </h2>
              <p
                className={` ${
                  isMobile
                    ? 'p-xsmall-regular-mobile text-center'
                    : 'p-small-regular-desktop text-start'
                }`}
              >
                {data.content.value}
              </p>
            </div>
            <AnimatedButton
              text={data.button.reference?.button_text.value}
              bgColor={data.button.reference?.color.value}
              hoverColor={data.button.reference?.hover_color.value}
              clickURL={data.button.reference?.link?.value}
              noMaxWidth
              h={'42px'}
              w={'100%'}
            ></AnimatedButton>
          </div>
        </div>
      </div>
    </button>
  );
}

export default Popup;
