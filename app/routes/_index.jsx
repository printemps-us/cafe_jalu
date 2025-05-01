import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense, useState} from 'react';
import {Image, Money, getSeoMeta} from '@shopify/hydrogen';
import Logo from '~/components/Logo';
import bg from '~/assets/cafejalubackground.png';
import AnimatedButton from '~/components/AnimatedButton';

/**
 * @type {MetaFunction}
 */
export const meta = ({data}) => {
  // pass your SEO object to getSeoMeta()
  return getSeoMeta({
    title: 'Café Jalu - French Coffee and Pastries',
    description:
      "To stay or to go - a quick café au lait or indulgent pastry created in the classic French preparation.",
    // image: data.staticData.seo?.reference.image?.reference?.image.url,
  });
};

/**
 * @param {LoaderFunctionArgs} args
 */
export async function loader(args) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return defer({...deferredData, ...criticalData});
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {LoaderFunctionArgs}
 */
async function loadCriticalData({context}) {
  const [{collections}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    featuredCollection: collections.nodes[0],
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {LoaderFunctionArgs}
 */
function loadDeferredData({context}) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState({
    isWaiting: false,
    isSubmitted: false,
    isError: false,
  });
  const url = 'https://printempsnewyork.activehosted.com/proc.php?jsonp=true';

  // NOTE • Valid Email checker
  const validEmail = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  );

  // NOTE • Clear Input
  const clearInput = () => {
    setForm({email: ''});
  };

  const handleSubmit = (e) => {
    exponea.identify(
      {email_id: email.toLowerCase()},
      {
        email: email.toLowerCase(),
        data_source: 'restaurant',
      },
    );
    exponea.track('consent', {
      category: 'email',
      valid_until: 'unlimited',
      action: 'accept',
      data_source: 'restaurant',
    });
    setState({
      isWaiting: false,
      isSubmitted: true,
    });
  };

  /** @type {LoaderReturnData} */
  const data = useLoaderData();
  return (
    <div className="background" style={{backgroundImage: `url(${bg})`}}>
      <div className="main-area">
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
        <div className="mt-6">
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
      <div className="footer-container">
        <div className="above-footer">
          <a
            href="https://urlgeni.us/instagram/cafejalu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://cdn.shopify.com/s/files/1/0811/8891/3345/files/F_BLandingPages_IG_Colors-03.png?v=1741378937"
              alt="Instagram Logo"
              width={80}
            />
          </a>
          <p className="moderat-bold sign-up-text" style={{color: '#00CF77'}}>
            Cafe Jalu is part of Printemps new york, For more information sign
            up for our newsletter
          </p>
        </div>

        <div className="footer-area">
          <p
            className="moderat-bold"
            style={{fontSize: '14px', color: 'black', marginRight: '8px'}}
          >
            {state.isSubmitted ? 'Merci!' : 'Sign up for our newsletter'}
          </p>
          {state.isSubmitted ? (
            <p
              className="moderat-bold"
              style={{fontSize: '14px', color: 'black', marginRight: '8px'}}
            >
              Check your email for updates
            </p>
          ) : (
            <input
              value={email}
              placeholder="Enter email address"
              onChange={(e) => setEmail(e.target.value)}
              className="moderat-bold footer-input bg-white"
              style={{fontSize: '12px'}}
            ></input>
          )}
          {state.isSubmitted ? (
            <p></p>
          ) : (
            <button
              className="footer-button"
              onClick={handleSubmit}
              disabled={!validEmail.test(email)}
              style={{cursor: !validEmail.test(email) ? 'auto' : 'pointer'}}
            >
              <p
                className="moderat-bold"
                style={{fontSize: '12px', color: 'white'}}
              >
                Submit
              </p>
            </button>
          )}
        </div>
      </div>
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
