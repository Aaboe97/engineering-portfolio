/** Prefix a site-local path, preserving external URLs, anchors and query links. */
export function prefixPath(path, base = '/') {
  if (!path || /^(?:[a-z][a-z\d+.-]*:|\/\/|#|\?)/i.test(path)) return path;
  const prefix = `/${base.split('/').filter(Boolean).join('/')}`;
  if (prefix === '/') return path.startsWith('/') ? path : `/${path}`;
  if (path === prefix || path === `${prefix}/`) return `${prefix}/`;
  if (path.startsWith(`${prefix}/`)) return path;
  return `${prefix}/${path.replace(/^\/+/, '')}`;
}
