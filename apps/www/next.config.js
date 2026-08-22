/** @type {import('next').NextConfig} */
module.exports = {
	images: {
		remotePatterns: [{ hostname: "cdn.sanity.io" }],
	},
	turbopack: {
		rules: {
			"*.svg": {
				loaders: ["@svgr/webpack"],
			},
		},
	},
	// webpack(config) {
	//   config.module.rules.push({
	//     test: /\.svg$/i,
	//     use: ["@svgr/webpack"],
	//   });

	//   return config;
	// },
};
