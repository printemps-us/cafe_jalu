import {defer, json} from '@shopify/remix-oxygen';
import {checkIfMobile} from './isMobile';
/**
 * Generic loader factory that accepts a GraphQL query and optional data processor
 */
export function createStaticDataLoader(query, options = {}) {
  const {useDefer = true, transform = defaultTransform} = options;

  async function loadStaticData({context, request}, useDefer = false) {
    try {
      const data = await context.storefront.query(query);
      const result = transform(data);

      const userAgent = request.headers.get('user-agent');
      const isMobile = checkIfMobile(userAgent);

      const payload = {
        ...result,
        isMobile,
      };

      return useDefer ? defer(payload) : json(payload);
    } catch (error) {
      console.error('Error in static data loader:', error);
      throw new Error('Failed to load static data');
    }
  }

  return async function loader(args) {
    return await loadStaticData(args);
  };
}

function defaultTransform(data) {
  return {
    staticData: data.metaobjects?.nodes?.[0] || data,
  };
}
