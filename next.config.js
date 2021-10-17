const withPWA = require('next-pwa');
const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = withPWA({
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
  reactStrictMode: true,
  experimental: { esmExternals: true },
});

const SentryWebpackPluginOptions = {};

module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
