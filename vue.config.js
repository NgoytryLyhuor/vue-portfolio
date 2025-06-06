const { defineConfig } = require('@vue/cli-service');
// const { routes } = require('./src/router'); // <-- REMOVE OR COMMENT OUT THIS LINE

// Define the static paths for your sitemap here
const staticPaths = [
  { path: '/', changefreq: 'weekly', priority: 1.0 },
  { path: '/about', changefreq: 'monthly', priority: 0.7 }, // Add other static paths
  { path: '/portfolio', changefreq: 'monthly', priority: 0.7 },
  { path: '/blog', changefreq: 'monthly', priority: 0.7 },
  // Add paths for all your static routes that should be in the sitemap
  // Exclude dynamic routes (like /blog/:id) and the 404 route
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
  }
});
