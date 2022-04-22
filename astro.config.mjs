import solid from '@astrojs/solid-js';
import netlify from '@astrojs/netlify/functions';
import { defineConfig } from 'astro/config'

export default defineConfig({
  // your configuration options here...
  // https://docs.astro.build/en/reference/configuration-reference/
  // projectRoot: '.',     // Where to resolve all URLs relative to. Useful if you have a monorepo project.
  // pages: './src/pages', // Path to Astro components, pages, and data
  // dist: './dist',       // When running `astro build`, path to final static output
  // public: './public',   // A folder of static files Astro will copy to the root. Useful for favicons, images, and other files that don’t need processing.

  adapter: netlify(),

  integrations: [
    solid()
  ],  
});