import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // azules personalizados
        primaryBlue: {
          50: '#DBE0FA',
          100: '#CFD5FC',
          200: '#8392F7',
          300: '#455FF5',
          400: '#3D55EC',
          500: '#1C37E4', // base
          600: '#152ECB',
          700: '#1025B0',
          800: '#0B1E95',
          900: '#0D1A51',
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
        // verdes personalizados
        secundaryGreen: {
          500: '#72C074',
          600: '#56A758'
        },
        // grises personalizados
        customGray: {
          50: '#F6F6F6',
          100: '#EFEFEF',
          200: '#E8E8E8',
          // 300: '',
          400: '#B6B6B6',
          500: '#808080',
          600: '#656565',
          // 700: '',
          // 800: '',
          // 900: '',
        }
      },
      lineClamp: {
        3: '3',
        4: '4',
        5: '5',
        6: '6'
      },
      keyframes: {
        'dot1': {
          '0%, 20%': { opacity: '0' },
          '30%, 100%': { opacity: '1' },
        },
        'dot2': {
          '0%, 40%': { opacity: '0' },
          '50%, 100%': { opacity: '1' },
        },
        'dot3': {
          '0%, 60%': { opacity: '0' },
          '70%, 100%': { opacity: '1' },
        },
      },
      animation: {
        'bounce-dot1': 'dot1 1.4s infinite',
        'bounce-dot2': 'dot2 1.4s infinite',
        'bounce-dot3': 'dot3 1.4s infinite',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
export default config
