'use client';
import React, {useEffect, useRef, useState} from 'react';
import AnimatedButton from './AnimatedButton';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/all';
import {Image} from '@shopify/hydrogen';
import {FormattedText} from './functions/formatText';

function ImageCard({
  header,
  position = 'right',
  descriptor,
  lHeader,
  lContent,
  rHeader,
  rContent,
  button,
  services,
  secondary_button,
  images,
  setOpenModal,
  setModalInfo,
}) {
  const [currImage, setCurrImage] = useState(images[0].image);
  const pictureRef = useRef();
  const containerRef = useRef();
  const containerRef2 = useRef();
  const cotentRef = useRef();
  function handleImageChange(image) {
    setCurrImage(image.image);
  }
  function handleClick() {
    if (setOpenModal && secondary_button.api_key.value) {
      setModalInfo({
        api_key: secondary_button.api_key.value,
        link: secondary_button.link.value,
        venue_id: secondary_button.venueId.value,
      });
      setOpenModal(true);
    }
  }
  useEffect(() => {
    if (!services) {
      gsap.registerPlugin(ScrollTrigger);

      const animateElement = (ref, containerRef, scrollTriggerId) => {
        gsap.fromTo(
          ref.current,
          {width: '100%'},
          {
            width: '0%',
            duration: 2,
            scrollTrigger: {
              id: scrollTriggerId,
              trigger: ref.current,
              start: '-35% 90%',
              end: '40% 75%',
              scrub: true,
              toggleActions: 'play none none reverse',
            },
            onComplete: () => {
              if (containerRef.current) {
                containerRef.current.style.display = 'none';
              }
            },
            onUpdate: () => {
              if (
                containerRef.current &&
                containerRef.current.style.display === 'none'
              ) {
                containerRef.current.style.display = 'flex';
              }
            },
          },
        );
      };

      animateElement(cotentRef, containerRef, `imageCard1${header}`);
      animateElement(pictureRef, containerRef2, `imageCard2${header}`);

      // Refresh ScrollTrigger after the page fully loads
      window.onload = () => {
        ScrollTrigger.refresh();
      };

      return () => {
        ScrollTrigger.killAll();
      };
    }
  }, []);
  if (services) {
    return (
      <div className="flex p-6 h-[548px] gap-3 relative">
        {/* <div ref={containerRef} className="absolute flex w-3/5  h-full top-0">
          <div ref={cotentRef} className=" bg-white w-full h-full"></div>
        </div>
        <div
          ref={containerRef2}
          className="absolute flex justify-end w-2/5  h-full top-0 left-3/5"
        >
          <div ref={pictureRef} className=" bg-white w-full h-full z-10"></div>
        </div> */}
        {images.length > 1 && (
          <div className="flex-1 flex gap-2 flex-col h-full max-w-[105px]">
            {images.map((item, index) => (
              <div
                key={`${header}_${item.image.altText}_image_${index}`}
                className="rounded-xl flex-1 cursor-pointer overflow-hidden  max-w-[105px]" // Ensure the container is properly sized
                onClick={() => handleImageChange(item)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleImageChange(item); // Allow "Enter" key to trigger the click
                }}
                role="button" // Provides a button-like role
                tabIndex={0} // Makes it focusable
              >
                <Image
                  className="w-full h-full object-cover" // Add object-cover to maintain aspect ratio
                  data={item.image}
                  sizes="(min-width: 45em) 50vw, 100vw"
                />
              </div>
            ))}
          </div>
        )}

        <div className="flex-5 rounded-xl overflow-hidden">
          <Image
            data={currImage}
            className="object-cover w-full h-full"
            sizes="(min-width: 45em) 50vw, 100vw"
          />
        </div>
        <div className="flex-4 flex flex-col justify-between pl-3 ">
          <div className="flex flex-col">
            {descriptor && (
              <span className="label-desktop text-black-2 pb-1">
                {descriptor}
              </span>
            )}
            <h3 className="h3-desktop pb-3">{header}</h3>
            <p className="p-small-regular-desktop text-black-2">{lHeader}</p>
          </div>
          <div>
            <div className="flex gap-3 pb-6"></div>
            <div className="flex gap-3">
              <div className="w-full">
                {services.references.nodes.map((item, index) => (
                  <div key={index} className={`border-b-white-4 border-b-1 `}>
                    <div className=" flex justify-between py-3">
                      <div className="flex gap-3 items-center">
                        <span className="p-small-regular-desktop uppercase">
                          {item.header.value}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (position === 'right') {
    return (
      <div className="flex p-6 h-[548px] gap-3 relative z-20 bg-white">
        <div ref={containerRef} className="absolute flex w-3/5  h-full top-0">
          <div ref={cotentRef} className=" bg-white w-full h-full"></div>
        </div>
        <div
          ref={containerRef2}
          className="absolute flex justify-end w-2/5  h-full top-0 left-3/5"
        >
          <div ref={pictureRef} className=" bg-white w-full h-full z-10"></div>
        </div>
        {images.length > 1 && (
          <div className="flex-1 flex gap-2 flex-col h-full max-w-[105px]">
            {images.map((item, index) => (
              <div
                key={`${header}_${item.image.altText}_image_${index}`}
                className="rounded-xl flex-1 cursor-pointer overflow-hidden max-w-[105px]" // Ensure the container is properly sized
                onClick={() => handleImageChange(item)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleImageChange(item); // Allow "Enter" key to trigger the click
                }}
                role="button" // Provides a button-like role
                tabIndex={0} // Makes it focusable
              >
                <Image
                  className="w-full h-full object-cover" // Add object-cover to maintain aspect ratio
                  data={item.image}
                  sizes="(min-width: 45em) 50vw, 100vw"
                />
              </div>
            ))}
          </div>
        )}

        <div className="flex-5 rounded-xl overflow-hidden">
          <Image
            data={currImage}
            className="object-cover w-full h-full"
            sizes="(min-width: 45em) 50vw, 100vw"
          />
        </div>
        <div className="flex-4 flex flex-col justify-between pl-3 ">
          <div className="flex flex-col">
            {descriptor && (
              <span className="label-desktop text-black-2 pb-1">
                {descriptor}
              </span>
            )}
            <h3 className="h3-desktop">{header}</h3>
            <div className="flex items-center mt-4">
              <p className="p-small-regular-desktop text-black-2">{lContent}</p>
            </div>
          </div>
          <div className='w-full'>
            <div className="flex gap-3 pb-6">
              <div className="flex-1">
                {/* <div className="border-b-white-4 border-b-1 h-9 py-0.5 flex items-center">
                  <span className="label-desktop uppercase">{lHeader}</span>
                </div> */}
              </div>
              {/* <div className="flex-1">
                <div className="border-b-white-4 border-b-1 h-9 py-0.5 flex items-center">
                  <span className="label-desktop uppercase">{rHeader}</span>
                </div>
                <div className="flex items-center mt-2">
                  <p className="p-small-regular-desktop  text-black-2">
                    <FormattedText text={rContent} />
                  </p>
                </div>
              </div> */}
            </div>
            <div className="flex gap-3 w-full">
              {button && (
                <AnimatedButton
                  text={button?.button_text.value}
                  bgColor={button?.color.value}
                  hoverColor={button?.hover_color.value}
                  clickURL={button?.link?.value}
                  noMaxWidth
                  h={'42px'}
                  w={'100%'}
                ></AnimatedButton>
              )}
              {secondary_button && (
                <AnimatedButton
                  text={secondary_button?.button_text.value}
                  bgColor={secondary_button?.color.value}
                  hoverColor={secondary_button?.hover_color.value}
                  onClick={handleClick}
                  h={'42px'}
                  w={'100%'}
                ></AnimatedButton>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex p-6 h-[548px] gap-3 relative">
        <div ref={containerRef} className="absolute flex w-2/5  h-full top-0">
          <div ref={cotentRef} className=" bg-white w-full h-full"></div>
        </div>
        <div
          ref={containerRef2}
          className="absolute flex justify-end w-3/5  h-full top-0 left-2/5"
        >
          <div ref={pictureRef} className=" bg-white w-full h-full z-10"></div>
        </div>
        <div className="flex-4 flex flex-col justify-between pr-3 ">
          <div className="flex flex-col">
            {descriptor && (
              <span className="label-desktop text-black-2 pb-1">
                {descriptor}
              </span>
            )}
            <h3 className="h3-desktop">{header}</h3>
            <div className="flex items-center mt-4">
                  <p className="p-small-regular-desktop text-black-2">
                    {lContent}
                  </p>
                </div>
          </div>
          <div>
            <div className="flex gap-3 pb-6">
              <div className="flex-1">
                {/* <div className="border-b-white-4 border-b-1 h-9 py-0.5 flex items-center">
                  <span className="label-desktop uppercase">{lHeader}</span>
                </div> */}
                
              </div>
              {/* <div className="flex-1">
                <div className="border-b-white-4 border-b-1 h-9 py-0.5 flex items-center">
                  <span className="label-desktop uppercase">{rHeader}</span>
                </div>
                <div className="flex items-center mt-2">
                  <p className="p-small-regular-desktop  text-black-2">
                    <FormattedText text={rContent} />
                  </p>
                </div>
              </div> */}
            </div>
            <div className="flex gap-3">
              {button && (
                <AnimatedButton
                  text={button?.button_text.value}
                  bgColor={button?.color.value}
                  hoverColor={button?.hover_color.value}
                  clickURL={button?.link?.value}
                  noMaxWidth
                  h={'42px'}
                  w={'100%'}
                ></AnimatedButton>
              )}
              {secondary_button && (
                <AnimatedButton
                  text={secondary_button?.button_text.value}
                  bgColor={secondary_button?.color.value}
                  hoverColor={secondary_button?.hover_color.value}
                  onClick={handleClick}
                  h={'42px'}
                  w={'100%'}
                ></AnimatedButton>
              )}
            </div>
          </div>
        </div>
        <div className="flex-5 rounded-xl overflow-hidden">
          <Image
            data={currImage}
            className="object-cover w-full h-full"
            sizes="(min-width: 45em) 50vw, 100vw"
          />
        </div>
        {images.length > 1 && (
          <div className="flex-1 flex gap-2 flex-col h-full max-w-[105px]">
            {images.map((item, index) => (
              <div
                key={`${header}_${item.image.altText}_image${index}`}
                className="rounded-xl flex-1 cursor-pointer overflow-hidden max-w-[105px]" // Ensure the container is properly sized
                onClick={() => handleImageChange(item)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleImageChange(item); // Allow "Enter" key to trigger the click
                }}
                role="button" // Provides a button-like role
                tabIndex={0} // Makes it focusable
              >
                <Image
                  className="w-full h-full object-cover" // Add object-cover to maintain aspect ratio
                  data={item.image}
                  sizes="(min-width: 45em) 50vw, 100vw"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default ImageCard;
