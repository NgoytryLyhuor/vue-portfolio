const { defineConfig } = require('@vue/cli-service');
// const { routes } = require('./src/router'); // <-- REMOVE OR COMMENT OUT THIS LINE

// Define the static paths for your sitemap here
const staticPaths = [
  { path: '/', changefreq: 'weekly', priority: 1.0 },
  { path: '/about', changefreq: 'monthly', priority: 0.8 },
  { path: '/projects', changefreq: 'weekly', priority: 0.9 },
  { path: '/weather-app', changefreq: 'monthly', priority: 0.6 },
  { path: '/air-quality', changefreq: 'daily', priority: 0.7 },
  { path: '/khmer-calendar', changefreq: 'monthly', priority: 0.6 },
  { path: '/currency-converter', changefreq: 'daily', priority: 0.7 },
  // Exclude dynamic routes (like /blog/:id) and protected routes (login, dashboard)
];

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: process.env.NODE_ENV !== 'production', // Don't fail build on lint errors in production
  configureWebpack: {
    plugins: [
      new (require('sitemap-webpack-plugin').default)({
        base: 'https://ngoytrylyhuor.vercel.app',
        paths: staticPaths, // <-- USE THE MANUALLY DEFINED PATHS HERE
        options: {
          filename: 'sitemap.xml',
          lastmod: new Date( ).toISOString(),
        }
      })
    ]
  }
  // Note: Vue CLI automatically copies all files from public/ to dist/
  // No need to manually configure service worker copying
});
