import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense, useState} from 'react';
import {Image, Money, getSeoMeta} from '@shopify/hydrogen';
import Logo from '~/components/Logo';
import bg from '~/assets/cafejalubackground.png';
import AnimatedButton from '~/components/AnimatedButton';
import HomePageMobile from '~/components/mobile/HomePageMobile';
import useIsMobile from '~/components/functions/isMobile';
import {HOME_QUERY} from '~/components/query/homeQuery';
import {createStaticDataLoader} from '~/components/functions/loadStaticData';
import RoomCard from '~/components/RoomCard';
import FooterComponent from '~/components/FooterComponent';
/**
 * @type {MetaFunction}
 */
export const loader = createStaticDataLoader(HOME_QUERY);

export const meta = ({data}) => {
  return getSeoMeta({
    title: data?.staticData?.seo?.reference?.title?.value,
    description: data?.staticData?.seo?.reference?.description?.value,
    image: data?.staticData?.seo?.reference?.image?.reference?.image?.url,
  });
};

export default function Homepage() {
  const [modalOpen, setModalOpen] = useState(false);

  /** @type {LoaderReturnData} */
  const {staticData, isMobile} = useLoaderData();
  const isMobileActive = useIsMobile(isMobile);

  // If mobile, render the mobile version
  if (isMobileActive) {
    return <HomePageMobile staticData={staticData} />;
  }
  return (
    <div className="background">
      <div className="main-area py-12" style={{backgroundImage: `url(${bg})`}}>
        <div className="responsive-logo" style={{marginBottom: 12}}>
          <Logo></Logo>
        </div>
        <p
          className="moderat-bold"
          style={{fontSize: '1.2rem', color: '#00CF77'}}
        >
          HOURS:
        </p>
        <p
          className="moderat-bold"
          style={{fontSize: '1.2rem', color: '#00CF77'}}
        >
          8:00 AM - 7:00 PM
        </p>
        {/* <p className="moderat-bold" style={{color: '#00CF77'}}>
          One Wall street, NY
        </p>*/}
        <div className="mt-6 h-auto w-full flex max-[835px]:flex-col gap-3 justify-center items-center">
          <AnimatedButton
            text={'View Menu'}
            bgColor={'#00d58d'}
            hoverColor={'#00d58d'}
            textColor={'black'}
            border="#00d58d"
            hoverBorder={'#00d58d'}
            clickURL={'/menu'}
            h="42px"
            w="90%"
            arrow
            arrowStart
          />
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center h-[200px] text-center my-6">
        <p className="w-[450px] p-standard-medium-desktop text-black-2">
          {staticData.about_sub.value}
        </p>
      </div>
      <div className="flex gap-2 w-full overflow-y-hidden hide-scrollbar h-[550px] no-overscroll px-8">
        {staticData.about_options.references.nodes.map((item, index) => (
          <div key={item.id} id={item.header.value} className="flex-1">
            <RoomCard
              header={item.header.value}
              sub={item.sub?.value}
              button_text={item.button_text.value}
              image={item.image.reference.image}
              link={item.link?.value}
            />
          </div>
        ))}
      </div>

      <div className="h-[500px] bg-white-2 border-y-1 border-y-white-4 flex">
        <div
          className="flex-1 rounded-br-[300px]"
          style={{
            backgroundSize: 'cover', // Ensures the image covers the entire container
            backgroundPosition: 'center', // Centers the image within the container
            backgroundRepeat: 'no-repeat', // Prevents the image from repeating
            backgroundImage: `url(${staticData.find_us_image.reference.image.url})`,
          }}
        ></div>
        <div className="flex-1 flex-col flex justify-center items-center gap-6 text-center">
          <h2 className="h2-desktop w-[220px]">
            {staticData.find_us_title.value}
          </h2>
          <p className="w-[450px] p-standard-medium-desktop text-black-2">
            {staticData.find_us_sub.value}
          </p>
          <AnimatedButton
            h={'42px'}
            w={'339px'}
            text={staticData.find_us_button.reference.button_text.value}
            bgColor={staticData.find_us_button.reference.color.value}
            hoverColor={staticData.find_us_button.reference.hover_color.value}
            clickURL={staticData.find_us_button.reference?.link.value}
          />
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center h-[120px] text-center my-12">
        <h2 className="h2-desktop">{staticData.title_header.value}</h2>
        <p className="w-[450px] p-standard-medium-desktop text-black-2">
          {staticData.title_sub.value}
        </p>
      </div>
      <div className="flex gap-4 px-6 mb-10">
        {staticData.title_images.references.nodes.map((item, index) => (
          <div key={index} className="overflow-hidden rounded-xl h-[450px]">
            <Image data={item.image} className="w-full h-full object-cover">
              {/* your content here */}
            </Image>
          </div>
        ))}
      </div>
      {/* <StoreInfo data={staticData.icons} bgColor={'#AF4145'}></StoreInfo> */}

      <div className="overflow-hidden w-full h-[300px]">
        <Image
          data={staticData.filler_image?.reference.image}
          className="w-full h-full object-cover"
        ></Image>
      </div>
      <div className="py-10 border-y-1 border-white-4 my-14 bg-white-2">
        <p className="h2-desktop text-center">
          {staticData.as_seen_header?.value}
        </p>
        <div className="pt-12 flex gap-10 items-center overflow-x-auto py-4 justify-center">
          {staticData.as_seen_images?.references.nodes.map((item, index) => (
            <div key={index} className="h-10 flex-shrink-0">
              <Image
                data={item.image}
                className="h-full w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <FooterComponent></FooterComponent>
    </div>
  );
}

/**
 * @param {{
 *   collection: FeaturedCollectionFragment;
 * }}
 */
function FeaturedCollection({collection}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <Link
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <Image data={image} sizes="100vw" />
        </div>
      )}
      <h1>{collection.title}</h1>
    </Link>
  );
}

/**
 * @param {{
 *   products: Promise<RecommendedProductsQuery | null>;
 * }}
 */
function RecommendedProducts({products}) {
  return (
    <div className="recommended-products">
      <h2>Recommended Products</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="recommended-products-grid">
              {response
                ? response.products.nodes.map((product) => (
                    <Link
                      key={product.id}
                      className="recommended-product"
                      to={`/products/${product.handle}`}
                    >
                      <Image
                        data={product.images.nodes[0]}
                        aspectRatio="1/1"
                        sizes="(min-width: 45em) 20vw, 50vw"
                      />
                      <h4>{product.title}</h4>
                      <small>
                        <Money data={product.priceRange.minVariantPrice} />
                      </small>
                    </Link>
                  ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
