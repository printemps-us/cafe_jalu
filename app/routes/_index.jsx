import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense, useState} from 'react';
import {Image, Money} from '@shopify/hydrogen';

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: 'Maison Passerelle'}];
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
  const [form, setForm] = useState({email: ''});
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

  console.log(state);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get('email'); // Correct way to get the email field value

    console.log(formData);

    setState({
      isWaiting: true,
    });

    // Validate email before submitting
    if (validEmail.test(email)) {
      fetch(url, {
        headers: {Accept: 'application/json'},
        method: 'POST',
        body: formData,
        // Remove mode: 'no-cors' as it disables response access
      })
        .then((response) => {
          // Check response status
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          setState({
            isWaiting: false,
            isSubmitted: true,
          });

          // Clear form and reset state after a delay
          setTimeout(() => {
            clearInput();
            setState({
              isWaiting: false,
              isSubmitted: false,
            });
          }, 5000);
        })
        .catch((err) => {
          setState({
            error: err,
            isError: true,
          });
          console.error('Submission error:', err); // Optionally log the error for debugging
        });
    } else {
      // If the email is not valid, handle the error
      setState({
        error: 'Invalid email address',
        isError: true,
      });
    }
  };

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const inputProps = {
    onChange: handleChange,
    value: form.email,
    name: 'email',
    id: 'email',
    type: 'email',
    required: true,
    placeholder: 'Enter email address',
    'data-name': 'email',
  };

  /** @type {LoaderReturnData} */
  const data = useLoaderData();
  return (
    <div className="background">
      <div className="main-area">
        <Image
          className="logo"
          src={
            'https://cdn.shopify.com/s/files/1/0581/1011/5943/files/MaisonPasser.svg?v=1737053887'
          }
          width={'60%'}
          sizes="(min-width: 35em) 60vw, 70vw"
          alt="Maison Passerelle Logo"
        ></Image>
        <p
          className="moderat-bold"
          style={{fontSize: '1.5rem', color: '#e8d09b'}}
        >
          Opening March 2025
        </p>
        <p className="moderat-bold" style={{color: '#e8d09b'}}>
          One Wall street, NY
        </p>
      </div>
      <div className="footer-container">
        <div className="above-footer">
          <a
            href="https://urlgeni.us/instagram/maisonpasserellenyc"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://cdn.shopify.com/s/files/1/0581/1011/5943/files/IG_LOGO.png?v=1736792345"
              alt="Instagram Logo"
              width={42}
            />
          </a>
          <p className="moderat-bold sign-up-text" style={{color: '#e8d09b'}}>
            Maison Passerelle is part of Printemps new york, For more
            information sign up for our newsletter
          </p>
        </div>
        <form onSubmit={handleSubmit} style={{width: '100%'}}>
          {/* Hidden Fields */}
          <input type="hidden" name="u" value="1" data-name="u" />
          <input type="hidden" name="f" value="1" data-name="f" />
          <input type="hidden" name="s" data-name="s" />
          <input type="hidden" name="c" value="0" data-name="c" />
          <input type="hidden" name="m" value="0" data-name="m" />
          <input type="hidden" name="act" value="sub" data-name="act" />
          <input type="hidden" name="v" value="2" data-name="v" />
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
                {...inputProps}
                className="moderat-bold footer-input"
                style={{fontSize: '12px'}}
              ></input>
            )}
            {state.isSubmitted ? (
              <p></p>
            ) : (
              <button className="footer-button">
                <p
                  className="moderat-bold"
                  style={{fontSize: '12px', color: 'white'}}
                >
                  Submit
                </p>
              </button>
            )}
          </div>
        </form>
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
