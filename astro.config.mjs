// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel'

const vercelImagesConfig = {
  sizes: [150, 300, 480, 600, 640, 750, 828, 1080, 1200, 1600, 1920, 2048, 3840],
  qualities: [80, 85, 90, 100],
  formats: [/** @type {'image/webp'} */ ('image/webp')],
  minimumCacheTTL: 2678400,
}

// https://astro.build/config
export default defineConfig({
  site: 'https://www.mmslcontracting.com',
  output: 'server',
  adapter: vercel({
    imageService: true,
    imagesConfig: vercelImagesConfig,
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
