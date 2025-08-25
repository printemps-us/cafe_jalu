import React from 'react';
import {useInView} from 'react-intersection-observer';
import {useSpring, animated} from '@react-spring/web';
import {Image} from '@shopify/hydrogen';
import AnimatedButton from './AnimatedButton';
import {FormattedText} from './functions/formatText';

function ImageSection({
  h1,
  sub,
  sub2,
  buttonText,
  hours = '',
  link,
  image,
  sticky = false,
}) {
  //   const [refContent, inView] = useInView({
  //     triggerOnce: false, // Tracks when it enters/leaves the viewport
  //     threshold: 0.5, // How much of the element should be visible before triggering
  //   });
  //   const springStyles = useSpring({
  //     opacity: inView ? 1 : 0,
  //     transform: inView ? 'translateY(0px)' : 'translateY(50px)',
  //     config: {duration: 750, tension: 120, friction: 14},
  //   });
  return (
    <div
      className={`bg-white-2 h-[600px] flex border-t-white-4 border-t-1 overflow-hidden top-0 ${
        sticky ? 'sticky top-20 z-[1]' : 'z-[2] relative'
      }`}
      //   ref={refContent}
    >
      <div className="flex-4 h-full">
        <Image
          data={image}
          sizes="100vw"
          className="h-full w-full object-cover"
        ></Image>
      </div>
      <div className="flex-3 flex flex-col gap-6 items-center justify-center ">
        <div
          className="flex flex-col gap-6 justify-center"
          style={{width: '339px'}}
        >
          <animated.div className="w-48">
            <h2 className="h2-desktop">{h1}</h2>
          </animated.div>
          <div className="flex flex-col text-black-2 w-full justify-between">
            <div className="flex flex-row justify-between">
              <FormattedText text={sub} />
              {hours && (
                <div className="text-right">
                  <FormattedText text={hours} />
                </div>
              )}
            </div>
            {sub2 && (
              <span className="p-standard-medium-desktop text-black-2">
                {sub2}
              </span>
            )}
          </div>
          {buttonText && (
            <AnimatedButton
              h={'42px'}
              w={'339px'}
              text={buttonText}
              bgColor={'white'}
              hoverColor={'#00D072'}
              clickURL={link}
            ></AnimatedButton>
          )}
        </div>
      </div>
    </div>
  );
}

export default ImageSection;
