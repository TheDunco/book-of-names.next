module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx}',
        // 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
    ],
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
    fontFamily: {
      monsterrat: 'Monsterrat, sans-serif',
      'roboto-slab': 'Roboto Slab, serif',
      inter: 'Inter, sans-serif',
      'theme-font': 'var(--theme-font)',
      fira: 'Fira Sans, sans-serif',
      open: 'Open Sans, sans-serif',
    },
    extend: {
      colors: {
        gray: {
          100: '#f7fafc',
          200: '#edf2f7',
          300: '#e2e8f0',
          400: '#cbd5e0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
          900: '#1a202c',
        },
        blue: {
          100: '#ebf8ff',
          200: '#bee3f8',
          300: '#90cdf4',
          400: '#63b3ed',
          500: '#4299e1',
          600: '#3182ce',
          700: '#2b6cb0',
          800: '#2c5282',
          900: '#2a4365',
        },
        'color-bg': 'var(--color-bg)',
        'color-text': 'var(--color-text)',
        'color-primary': 'var(--color-primary)',
        'color-secondary': 'var(--color-secondary)',
        'color-special': 'var(--color-special)',
      },
      keyframes: {
        wave: {
          '0%': { transform: 'rotate(0.0deg)' },
          '15%': { transform: 'rotate(14.0deg)' },
          '30%': { transform: 'rotate(-8.0deg)' },
          '40%': { transform: 'rotate(14.0deg)' },
          '50%': { transform: 'rotate(-4.0deg)' },
          '60%': { transform: 'rotate(10.0deg)' },
          '70%': { transform: 'rotate(0.0deg)' },
          '100%': { transform: 'rotate(0.0deg)' },
        },
        visibility: {
          '99%': { visibility: 'hidden' },
          '100%': { visibility: 'visible' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        cube: {
          '0%': {
            opacity: 1,
            transform: 'translateY(0) rotateX(0)',
          },
          '50%': {
            '0%': {
              opacity: 1,
              transform: 'translateY(50%) rotateX(90deg)',
            },
          },
        },
      },
      animation: {
        wave: 'wave 1.5s infinite',
        visibility: 'visibility 1s fadeIn',
        cube: 'cube 1s ease-in-out',
        fadeIn: 'fadeIn 1s ease-in-out ',
      },
    },
  },
  // eslint-disable-next-line global-require
//   plugins: [require("flowbite/plugin")],
  plugins: [],
};
