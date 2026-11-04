import { prefixPath } from './url-utils.mjs';

/** Use for every internal link and public asset; works on GitHub and custom domains. */
export function withBase(path: string): string {
  return prefixPath(path, import.meta.env.BASE_URL);
}
