/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ['@md/ui'],
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    })

    return config
  },
}
