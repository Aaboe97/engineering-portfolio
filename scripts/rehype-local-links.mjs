import { prefixPath } from '../src/lib/url-utils.mjs';

// Markdown may use /images/... or /projects/... without hard-coding /portfolio/.
export default function localContentLinks({ base = '/' } = {}) {
  return function transform(tree) {
    function visit(node) {
      if (node.type === 'element' && node.properties) {
        for (const attribute of ['href', 'src', 'poster']) {
          const value = node.properties[attribute];
          if (typeof value === 'string' && value.startsWith('/') && !value.startsWith('//')) {
            node.properties[attribute] = prefixPath(value, base);
          }
        }
      }
      node.children?.forEach(visit);
    }
    visit(tree);
  };
}
