import React, {useEffect, useRef} from 'react';
import {Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import gsap from 'gsap';

function HeaderDropDown({
  isHover,
  handleMouseLeave,
  dropdownRef,
  hoverRef,
  hoverValue,
  headerData,
  handleMouseEnter,
}) {
  const megaRef = useRef(null);
  useEffect(() => {
    gsap.killTweensOf(hoverRef.current, {height: true});
    if (isHover) {
      gsap.to(hoverRef.current, {opacity: 1, duration: 0.5});
      gsap.to(hoverRef.current, {height: '100vh', duration: 0});
      gsap.to(megaRef.current, {
        height: '298px',
        borderBottom: 1,
        duration: 0.5,
      });
    } else {
      gsap.to(hoverRef.current, {height: 0, duration: 0, delay: 0.39});

      gsap.to(hoverRef.current, {opacity: 0, duration: 0.5});
      gsap.to(megaRef.current, {
        height: '0px',
        borderBottom: 0,
        duration: 0.5,
      });
    }
  }, [isHover]);
  return (
    <div
      className="absolute w-full top-[100px]"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
    >
      <div
        className="h-0 bg-black-op40 absolute w-full z-50"
        ref={hoverRef}
      ></div>

      <div
        className="bg-white border-x-1 border-white-4 rounded-b-xl h-0 w-full flex justify-center items-center gap-3 overflow-hidden relative z-60"
        ref={megaRef}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex flex-col gap-2 w-[180px] h-[230px] p-small-regular-desktop">
          <p className="label-desktop">{headerData?.title?.value}</p>
          {headerData?.links?.references.nodes.map((item) => {
            const url = item?.url?.value;
            const isExternal =
              url &&
              !url.startsWith('/')

            return isExternal ? (
              <a
                key={`${item?.text?.value}_header`}
                href={url}
                onClick={handleMouseLeave}
                className="text-black-op70 p-small-regular-desktop hover:![font-weight:600] !no-underline"
                target="_blank" // change to "_self" if you want same-tab navigation
                rel="noopener noreferrer"
              >
                {item?.text?.value}
              </a>
            ) : (
              <Link
                key={`${item?.text?.value}_header`}
                to={url}
                onClick={handleMouseLeave}
                className="text-black-op70 p-small-regular-desktop hover:![font-weight:600] !no-underline"
              >
                {item?.text?.value}
              </Link>
            );
          })}
        </div>

        {headerData?.image_links?.references.nodes.map((item, index) => (
          <Link
            key={`${item?.header?.value}_header_image`}
            className="flex flex-col items-center rounded-xl cursor-pointer"
            to={item?.link?.value}
            onClick={handleMouseLeave}
          >
            <div className="rounded-xl overflow-hidden">
              <Image
                className="h-[192px] object-cover"
                data={item?.image?.reference.image}
                sizes="(min-width: 5em) 15vw, 30vw"
                aspectRatio="1/1"
              ></Image>
            </div>
            <div className="py-2">
              <p className="p-small-semi-bold-desktop uppercase">
                {item?.header?.value}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HeaderDropDown;
