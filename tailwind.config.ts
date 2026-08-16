import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#030712',
        graphite: '#121722',
        ember: '#f97316',
        mint: '#3ddc97',
        cobalt: '#4f8cff',
        orchid: '#c084fc'
      },
      boxShadow: {
        glow: '0 0 40px rgba(79, 140, 255, 0.22)'
      }
    }
  },
  plugins: []
};

export default config;
