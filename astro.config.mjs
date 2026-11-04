import { defineConfig } from 'astro/config';
import { getDeployment } from './site.config.mjs';
import localContentLinks from './scripts/rehype-local-links.mjs';
const { site, base } = getDeployment();

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'always',
  markdown: { rehypePlugins: [[localContentLinks, { base }]] },
  devToolbar: { enabled: false },
  server: { allowedHosts: ['terminal.local'] },
});
