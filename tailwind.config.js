/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
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
          950: '#131f2c',
        },
        // Verde "prado alpino" — usado para vocabulario de naturaleza/animales,
        // estados de éxito y para dar más variedad de color a la app.
        meadow: {
          50: '#f2f9f0',
          100: '#e0f0db',
          200: '#c1e0b8',
          300: '#9ecb8f',
          400: '#7ab568',
          500: '#5b9c48',
          600: '#457a37',
          700: '#375f2c',
          800: '#2d4c26',
          900: '#254020',
        },
        // Azul "cielo alpino" — acento fresco alterno a `alp`, para variar
        // tarjetas/insignias sin salirse de la paleta suiza.
        sky: {
          50: '#eff8ff',
          100: '#dcefff',
          200: '#b9e0ff',
          300: '#8ccdff',
          400: '#57b3ff',
          500: '#2f96f5',
          600: '#1c78d6',
          700: '#1861ad',
          800: '#18508c',
          900: '#1a4573',
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
        'card-lg': '0 16px 40px -12px rgba(30, 54, 74, 0.35)',
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
