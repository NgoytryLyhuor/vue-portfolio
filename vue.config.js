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
  },
  // Copy service worker to dist folder
  chainWebpack: (config) => {
    config.plugin('copy').tap((args) => {
      args[0].patterns.push({
        from: 'public/sw.js',
        to: 'sw.js',
      });
      return args;
    });
  }
});
