/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta "GrüeziGo": rojo suizo, blanco alpino, tonos de montaña, madera/queso
        swiss: {
          red: '#D52B1E',
          'red-dark': '#A82016',
          white: '#FFFFFF',
        },
        alp: {
          50: '#f4f8fb',
          100: '#e3edf5',
          200: '#c3d9e8',
          300: '#93bcd4',
          400: '#5c96b8',
          500: '#3a789e',
          600: '#2c5f81',
          700: '#254c68',
          800: '#213f57',
          900: '#1e364a',
        },
        wood: {
          50: '#fbf6ee',
          100: '#f4e7d1',
          200: '#e8cca2',
          300: '#dcae74',
          400: '#cf9552',
          500: '#bd7d3d',
          600: '#9c6432',
          700: '#7c4f2c',
          800: '#654129',
          900: '#553824',
        },
        cheese: {
          50: '#fffbeb',
          100: '#fff3c4',
          200: '#ffe58a',
          300: '#ffd24d',
          400: '#ffbe24',
          500: '#f9a109',
          600: '#dd7c04',
          700: '#b75908',
          800: '#94450d',
          900: '#7a390f',
        },
      },
      fontFamily: {
        display: ['"Poppins"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      boxShadow: {
        card: '0 8px 24px -8px rgba(30, 54, 74, 0.25)',
      },
      keyframes: {
        'pop-in': {
          '0%': { transform: 'scale(0.85)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'pop-in': 'pop-in 0.25s ease-out',
      },
    },
  },
  plugins: [],
}
