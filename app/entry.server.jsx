import {RemixServer} from '@remix-run/react';
import isbot from 'isbot';
import {renderToReadableStream} from 'react-dom/server';
import {createContentSecurityPolicy} from '@shopify/hydrogen';

/**
 * @param {Request} request
 * @param {number} responseStatusCode
 * @param {Headers} responseHeaders
 * @param {EntryContext} remixContext
 * @param {AppLoadContext} context
 */
export default async function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext,
  context,
) {
  const {nonce, header, NonceProvider} = createContentSecurityPolicy({
    defaultSrc: [
      'https://gdpr.apps.isenselabs.com/',
      'https://gdprcdn.b-cdn.net/',
    ],
    shop: {
      checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,
      storeDomain: context.env.PUBLIC_STORE_DOMAIN,
    },
    styleSrc: [
      "'self'",
      'https://cdn.shopify.com',
      'https://use.typekit.net',
      'https://some-custom-css.cdn',
      'https://fonts.googleapis.com',
      'https://static-tracking.klaviyo.com',
      'https://p.typekit.net',
      'https://static.klaviyo.com',
      'https://www.googletagmanager.com',
      'https://fonts.gstatic.com',
    ],
    mediaSrc: [
      "'self'",
      'https://cdn.shopify.com', // Shopify-hosted videos
      'https://ff027d-82.myshopify.com', // Add your video URL here
      'checkout.us.printemps.com',
    ],
    fontSrc: [
      "'self'",
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://use.typekit.net',
      'https://p.typekit.net',
      'https://cdn.shopify.com',

      'data:',
    ],
    imgSrc: [
      "'self'",
      'https://cdn.shopify.com',
      'api.gorgias.work',
      'https://assets.gorgias.chat',
      'data:',
      'https://config.gorgias.io',
      'https://d3k81ch9hvuctc.cloudfront.net',
      'https://cdn.sesami.co',
      'https://shopify.com',
      'https://www.google.com',
      'https://www.facebook.com',
      'https://www.googletagmanager.com',
      'https://www.datocms-assets.com', // Add the Datocms domain here
    ],
    scriptSrc: [
      "'self'",
      'https://cdn.shopify.com',
      'https://config.gorgias.io',
      'https://www.googletagmanager.com',
      'https://static-tracking.klaviyo.com',
      'https://api2.amplitude.com',
      'https://static.hotjar.com',
      'https://a.klaviyo.com',
      'https://tools.luckyorange.com',
      "'strict-dynamic'",
      'api.gorgias.work',
      'https://www.google-analytics.com/',
      'https://*.googletagmanager.com',
      'https://cdn.sesami.co',
      'https://app.sesami.co',
      'https://gorgias-convert.com',
      'https://formspree.io/',
      'https://assets.gorgias.chat',
      'https://eu2-api.eng.bloomreach.com',
      "'unsafe-eval'",
      "'unsafe-inline'",
      'https://cdn.amplitude.com',
      'https://widgets.resy.com', // Add this line to allow the Resy script
      'https://config.gorgias.chat', // Gorgias Chat Widget
      'https://client-cdn.gorgias.chat', // Gorgias Chat Widget
      'https://storage.googleapis.com', // Gorgias Chat Widget assets
      'https://bundle.9gtb.com', // Bundle script
      // Include other allowed domains for script loading
    ],
    frameSrc: [
      "'self'",
      'https://cdn.shopify.com',
      'api.gorgias.work',
      'https://www.google.com/',
      'https://td.doubleclick.net/',
      'https://www.googletagmanager.com/',
      'https://cdn.sesami.co',
      'https://app.sesami.co',
      'https://cdn.amplitude.com',
      'https://api2.amplitude.com',
      "'unsafe-eval'",
      'https://config.gorgias.io',
      'https://widgets.resy.com', // Allow framing from Resy
      'https://config.gorgias.chat', // Gorgias Chat Widget iframe
      'https://client-cdn.gorgias.chat', // Gorgias Chat Widget iframe
      // Add any other domains you need to allow framing from
    ],
    connectSrc: [
      'https://gdpr.apps.isenselabs.com/',
      'data:',
      'https://storefront.sesami.co',
      'https://cdn.amplitude.com',
      'https://www.googletagmanager.com/',
      'https://assets.gorgias.chat',
      'https://gdprcdn.b-cdn.net/',
      'https://analytics.google.com',
      'http://a.klaviyo.com',
      'https://api-js.datadome.co',
      'https://config.gorgias.io',
      'https://cdn.acsbapp.com',
      'api.gorgias.work',
      'https://checkout.us.printemps.com/',
      'https://static-forms.klaviyo.com',
      'https://stats.g.doubleclick.net',
      'https://fast.a.klaviyo.com',
      'https://gorgias-convert.com',
      'https://accesswidget-log-receiver.acsbapp.com',
      'https://acsbapp.com',
      'https://cdn.shopify.com',
      'https://z.clarity.ms',
      'https://consentmo-geo.com/users/checkIp',
      "'self'",
      'https://in.hotjar.com',
      'https://b.clarity.ms/collect',
      'https://k.clarity.ms',
      'https://api2.amplitude.com',
      'https://pubsub.googleapis.com',
      'wss://in.visitors.live',
      'wss://realtime.luckyorange.com',
      'https://api-preview.luckyorange.com',
      'https://a.klaviyo.com',
      'https://tools.luckyorange.com/',
      'https://monorail-edge.shopifysvc.com',
      'https://www.google.com',
      'https://www.google-analytics.com/',
      'https://formspree.io/',
      'https://ff027d-82.myshopify.com',
      'http://localhost:*',
      'ws://localhost:*',
      'ws://127.0.0.1:*',
      'ws://*.tryhydrogen.dev:*',
      'https://eu2-api.eng.bloomreach.com',
      'https://settings.luckyorange.com',
      'https://app.sesami.co', // Allow connections to app.sesami.co
      'https://config.gorgias.chat', // Gorgias Chat Widget API
      'https://client-cdn.gorgias.chat', // Gorgias Chat Widget API
      'https://*.gorgias.chat', // Gorgias Chat Widget (wildcard for subdomains)
      'wss://*.gorgias.chat', // Gorgias Chat Widget WebSocket
      'https://storage.googleapis.com', // Gorgias Chat Widget assets
      'https://bundle.9gtb.com', // Bundle API
      // Include other allowed domains for data connections
    ],
  });

  const body = await renderToReadableStream(
    <NonceProvider>
      <RemixServer context={remixContext} url={request.url} />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set('Content-Security-Policy', header);

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}

/** @typedef {import('@shopify/remix-oxygen').EntryContext} EntryContext */
/** @typedef {import('@shopify/remix-oxygen').AppLoadContext} AppLoadContext */
