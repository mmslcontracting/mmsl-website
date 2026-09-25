// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel'

// https://astro.build/config
export default defineConfig({
  site: 'https://www.mmslcontracting.com',
  output: 'server',
  adapter: vercel({
    imageService: true,
    imagesConfig: {
      sizes: [150, 300, 480, 600, 640, 750, 828, 1080, 1200, 1600, 1920, 2048, 3840],
      formats: ['image/webp'],
      minimumCacheTTL: 2678400,
    },
  }),
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react(),
    sitemap({
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
})
