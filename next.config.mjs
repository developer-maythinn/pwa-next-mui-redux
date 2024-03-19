/** @type {import('next').NextConfig} */

import withPWAPkg from "next-pwa";
const withPWA = withPWAPkg({
  dest: "public",
});
const nextConfig = {
  reactStrictMode: true,
};

export default withPWA(nextConfig);
