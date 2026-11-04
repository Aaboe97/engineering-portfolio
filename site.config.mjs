// The only address setting to change when you move to your own domain.
export const website = {
  url: 'https://andersaaboe.dk/',
};

export function getDeployment() {
  const url = new URL(process.env.SITE_URL || website.url);
  if (!['http:', 'https:'].includes(url.protocol) || url.search || url.hash) {
    throw new Error('Set website.url to an HTTP(S) website address without a query or fragment.');
  }
  return {
    site: url.origin,
    base: url.pathname.replace(/\/+$/, '') || '/',
  };
}
