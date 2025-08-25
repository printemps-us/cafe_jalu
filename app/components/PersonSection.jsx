import React, {useRef, useEffect} from 'react';
import InfoSlide from '~/components/InfoSlide';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import {Image} from '@shopify/hydrogen';
function PersonSection({section, name, filler1, filler2, mainImg, content}) {
  const chefImageMain = useRef();
  const chefImageSub1 = useRef();
  const chefImageSub2 = useRef();
  const culinaryContainerRef = useRef();
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(
      chefImageMain.current,
      {width: `10%`, height: `10%`},
      {
        width: `100%`,
        height: `100%`,
        duration: 1,
        scrollTrigger: {
          id: 'chefTrigger',
          trigger: culinaryContainerRef.current,
          start: '-25% 90%', // start when the top of the box is 80% down the viewport
          end: '50% 55%', // end when the top of the box reaches 30% down the viewport
          scrub: true, // smooth scrubbing
          toggleActions: 'play none none reverse', // play and reverse on scroll up
        },
      },
    );
    gsap.set(chefImageSub2.current, {transformOrigin: 'bottom'});

    gsap.fromTo(
      chefImageSub2.current,
      {scale: 0.1},
      {
        scale: 1,
        duration: 1,
        scrollTrigger: {
          id: 'subImageTrigger2',
          trigger: culinaryContainerRef.current,
          start: '-25% 90%', // start when the top of the box is 80% down the viewport
          end: '50% 55%',
          scrub: true,
          toggleActions: 'play none none reverse',
        },
      },
    );

    // gsap.set(chefImageSub1.current, {transformOrigin: 'bottom'});

    // gsap.fromTo(
    //   chefImageSub1.current,
    //   {scale: 0.1},
    //   {
    //     scale: 1,
    //     duration: 1,
    //     scrollTrigger: {
    //       id: 'subImageTrigger1',
    //       trigger: culinaryContainerRef.current,
    //       start: '-25% 90%', // start when the top of the box is 80% down the viewport
    //       end: '50% 55%',
    //       scrub: true,
    //       toggleActions: 'play none none reverse',
    //     },
    //   },
    // );
    window.onload = () => {
      ScrollTrigger.refresh();
    };
    return () => {
      // Clean up on component unmount
      ScrollTrigger.killAll();
    };
  }, []);
  return (
    <div
      ref={culinaryContainerRef}
      className="flex gap-3 py-15 px-6 bg-white-2 h-[700px]"
    >
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <span className="label-desktop text-black-3">{section}</span>
          <h2 className="h2-desktop w-[150px]">{name}</h2>
        </div>
        {/* <div className="overflow-hidden rounded-xl w-1/2" ref={chefImageSub1}>
          <Image
            className="object-cover"
            data={filler2}
            aspectRatio="4/3"
            // sizes="(min-width: 45em) 50vw, 100vw"
          ></Image>
        </div> */}
      </div>
      <div className="flex-1 h-full justify-end flex flex-col ">
        <div className="overflow-hidden rounded-xl" ref={chefImageMain}>
          <Image
            className="rounded-xl object-cover h-full"
            data={mainImg}
            sizes="(min-width: 45em) 50vw, 100vw"
          ></Image>
        </div>
      </div>
      <div className="flex-1 justify-between flex flex-col">
        <div className="overflow-hidden rounded-xl w-1/2" ref={chefImageSub2}>
          <Image
            ref={chefImageSub2}
            className="object-cover"
            data={filler2}
            aspectRatio="3/4"
            // sizes="(min-width: 45em) 50vw, 100vw"
          ></Image>
        </div>
        <div>
          <InfoSlide content={content}></InfoSlide>
        </div>
      </div>
    </div>
  );
}

export default PersonSection;
