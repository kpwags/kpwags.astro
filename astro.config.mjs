import { defineConfig } from 'astro/config';

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  markdown: {
    drafts: true
  },
  integrations: [mdx({
    drafts: true
  })],
  site: 'https://kpwags.com',
});