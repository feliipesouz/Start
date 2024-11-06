/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['storage.googleapis.com'], // Permitir imagens do Firebase Storage
    },
};

export default nextConfig;
