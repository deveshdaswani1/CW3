const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: "Radiant Sports Academy ",
    short_name: "Radiant Sports Academy",
    workboxPluginMode: "GenerateSW",
    skipWaiting: true,
    workboxOptions: {
      runtimeCaching: [
        {
          // Routing via a matchCallback function:
          urlPattern: ({ request }) => request.destination === "image",
          handler: 'StaleWhileRevalidate'
        },
        {
          urlPattern: ({ url }) => url.origin === 'https://cw2-backend-brs7.onrender.com' && url.pathname === '/lesson',
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'api-cache'
          }
        }
      ]
    }
  }
});
