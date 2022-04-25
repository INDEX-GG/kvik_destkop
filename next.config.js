/**
 * @type {import("next").NextConfig}
 */
const nextjsConfig = {
  /**
   * https://nextjs.org/docs/api-reference/next.config.js/react-strict-mode
   */
  reactStrictMode: true,
};

module.exports = {
  nextjsConfig,
  images: {
    domains: ["192.168.145.195", "192.168.145.195:6001"],
  },
};
