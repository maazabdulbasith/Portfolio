/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["github.com", "avatars.githubusercontent.com"],
    },
    typescript: {
        ignoreBuildErrors: false,
    },
    eslint: {
        ignoreDuringBuilds: false,
    },
};

module.exports = nextConfig;
