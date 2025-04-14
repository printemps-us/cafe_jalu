(function () {
  const MEASUREMENT_ID = 'G-62LX5MENCG';

  // Load the Google Analytics script
  const scriptTag = document.createElement('script');
  scriptTag.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  scriptTag.async = true;
  document.head.appendChild(scriptTag);

  // Initialize GA4
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', MEASUREMENT_ID);

  // Track page views on navigation
  window.addEventListener('popstate', () => {
    gtag('config', MEASUREMENT_ID, {page_path: window.location.pathname});
  });
})();
