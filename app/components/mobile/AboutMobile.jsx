import React, {useEffect} from 'react';
import {useLocation} from '@remix-run/react';
import AboutHeroMobile from './AboutHeroMobile';
import TraditionSectionMobile from './TraditionSectionMobile';
import PersonSectionMobile from './PersonSectionMobile';
import QuoteBlockMobile from './QuoteBlockMobile';
import FooterMobile from './FooterMobile';

function AboutMobile({staticData}) {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const scrollToTarget = () => {
        const target = document.querySelector(location.hash);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 130,
            behavior: 'smooth',
          });
        }
      };

      // Ensure the element is available in the DOM
      const timeout = setTimeout(() => {
        requestAnimationFrame(scrollToTarget);
      }, 0);

      return () => clearTimeout(timeout);
    }
  }, [location]);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <AboutHeroMobile image={staticData.hero_image.reference.image} />

      {/* First Tradition Section */}
      <div id="printemp-ny">
        <TraditionSectionMobile
          header={staticData.tradition_header.value}
          content={staticData.tradition_content.value}
          image={staticData.tradition_image.reference.image}
        />
      </div>

      {/* Chef Section */}
      <div id="the-chef">
        <PersonSectionMobile
          name={staticData.chef_section.reference.header.value}
          section={staticData.chef_section.reference.section.value}
          mainImg={staticData.chef_section.reference.filler_image_2.reference.image}
          content={staticData.chef_section.reference.executive_content_options.references.nodes}
        />
      </div>

      {/* Chef Quote */}
      <QuoteBlockMobile data={staticData.chef_quote.reference} />

      {/* Second Tradition Section */}
      <TraditionSectionMobile
        header={staticData.tradition_header.value}
        content={staticData.tradition_content.value}
        image={staticData.tradition_image.reference.image}
        imageFirst={true}
      />

      {/* Architect Section */}
      <div id="the-architect">
        <PersonSectionMobile
          name={staticData.architect_section.reference.header.value}
          section={staticData.architect_section.reference.section.value}
          filler1={staticData.architect_section.reference.filler_image_1.reference.image}
          filler2={staticData.architect_section.reference.filler_image_2.reference.image}
          mainImg={staticData.architect_section.reference.main_image.reference.image}
          content={staticData.architect_section.reference.executive_content_options.references.nodes}
        />
      </div>

      {/* Architect Quote */}
      <QuoteBlockMobile data={staticData.chef_quote.reference} />

      {/* Footer */}
      <FooterMobile />
    </div>
  );
}

export default AboutMobile;
