/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  // Optimize bundle size
  experimental: {
    optimizePackageImports: [
      'lucide-react', 
      '@radix-ui/react-icons',
      'recharts',
      'three',
      '@react-three/fiber',
      '@react-three/drei',
    ],
  },
  // Enable compression
  compress: true,
  // Webpack configuration for heavy libraries
  webpack: (config, { isServer }) => {
    // Optimize Three.js and related libraries
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'three': 'three',
      }
    }
    
    // Handle GLSL shader files
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader'],
    })
    
    return config
  },
  // Enable React strict mode for better development experience
  reactStrictMode: true,
}

export default nextConfig