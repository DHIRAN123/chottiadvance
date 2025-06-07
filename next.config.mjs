/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static HTML export
  images: {
    unoptimized: true, // Disable Next.js image optimization for static exports
  },
  trailingSlash: false, // Ensure trailing slashes for routes

  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for SVG imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...(fileLoaderRule.resourceQuery?.not || []), /url/] }, // Exclude if *.svg?url
        use: ["@svgr/webpack"], // Use @svgr/webpack for SVG as React components
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default nextConfig;
