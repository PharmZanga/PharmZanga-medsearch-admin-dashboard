import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        medsearch: {
          teal: '#1AA6A6',
          mint: '#EAF8F8',
          orange: '#FF8A00',
          ink: '#0F172A',
        },
      },
      boxShadow: {
        soft: '0 18px 55px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
