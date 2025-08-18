import React, {useState, useRef, useEffect} from 'react';
import {Image} from '@shopify/hydrogen';
import {FormattedText} from '../functions/formatText';
import gsap from 'gsap';

function PersonSectionMobile({name, section, mainImg, content}) {
  const [activeSection, setActiveSection] = useState(null);
  const contentRefs = useRef([]);
  const iconRefs = useRef([]);

  // Initialize refs for each section
  useEffect(() => {
    contentRefs.current = contentRefs.current.slice(0, content?.length);
    iconRefs.current = iconRefs.current.slice(0, content?.length);
  }, [content]);

  const toggleSection = (index, e) => {
    e.stopPropagation();

    // Update state immediately
    setActiveSection(activeSection === index ? null : index);

    // Immediately animate the clicked icon
    if (activeSection === index) {
      // Rotate back to plus
      gsap.to(iconRefs.current[index].children[1], {
        rotate: 0,
        duration: 0.3,
        ease: 'power2.inOut',
      });
    } else {
      // Rotate to minus
      gsap.to(iconRefs.current[index].children[1], {
        rotate: 90,
        duration: 0.3,
        ease: 'power2.inOut',
      });
    }

    // Handle previous section if exists
    if (activeSection !== null && activeSection !== index) {
      gsap.to(contentRefs.current[activeSection], {
        height: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      });
      gsap.to(iconRefs.current[activeSection].children[1], {
        rotate: 0,
        duration: 0.3,
        ease: 'power2.inOut',
      });
    }

    // Handle content animation
    if (activeSection === index) {
      // Close current section
      gsap.to(contentRefs.current[index], {
        height: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      });
    } else {
      // Open new section
      gsap.to(contentRefs.current[index], {
        height: 'auto',
        duration: 0.5,
        ease: 'power2.inOut',
      });
    }
  };

  return (
    <div className="flex flex-col gap-2 pb-4 pt-8 px-6 bg-white-2">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-black-op60 uppercase">
          {section}
        </span>
        <h2 className="h4-mobile">{name}</h2>
      </div>

      {/* Main Image */}
      <div className="w-full h-[300px] rounded-[12px] overflow-hidden">
        <Image
          data={mainImg}
          className="w-full h-full object-cover"
          sizes="100vw"
        />
      </div>

      {/* Dropdown Sections */}
      <div className="">
        {content?.map((item, index) => (
          <div
            key={index}
            className={`${
              index !== content.length - 1 ? 'border-b border-[#E7E7E7]' : ''
            }`}
          >
            <button
              onClick={(e) => toggleSection(index, e)}
              className="w-full flex justify-between items-center py-2"
            >
              <span className="p-small-regular-mobile font-medium uppercase">
                {item.header.value}
              </span>
              <div
                ref={(el) => (iconRefs.current[index] = el)}
                className="relative w-5 h-5 flex items-center justify-center"
              >
                <div className="absolute w-4 h-[1px] bg-[#aaaaaa]"></div>
                <div className="absolute w-[1px] h-4 bg-[#aaaaaa]"></div>
              </div>
            </button>
            <div
              ref={(el) => (contentRefs.current[index] = el)}
              className="overflow-hidden h-0"
            >
              <div className="pb-5 p-small-regular-mobile text-black-op60">
                <FormattedText text={item.content.value} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PersonSectionMobile; 