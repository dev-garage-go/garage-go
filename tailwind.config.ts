import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // azules personalizados
        primaryBlue: {
          50: '#CED4FE',
          100: '#A8B3FB',
          200: '#8392F7',
          300: '#5F73F2',
          400: '#3D55EC',
          500: '#1C37E4', // base
          600: '#152ECB',
          700: '#1025B0',
          800: '#0B1E95',
          900: '#071679',
        },
        // rosados personalizados
        primaryPink: {
          50: '#FFD2DF',
          100: '#FFB0C7',
          200: '#FD8FAF',
          300: '#F96F97',
          400: '#F55080',
          500: '#EF3269', // base
          600: '#D4295B',
          700: '#B8214D',
          800: '#9C193F',
          900: '#7E1232',
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
export default config
