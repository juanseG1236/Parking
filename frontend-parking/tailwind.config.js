// Archivo: tailwind.config.js
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        'vh-minus': 'calc(100vh - 1em)',
        alfull: '48%'
      },
    },
    colors: {
      yellow: '#FFB93C',
      darkBlue: '#2A2C41',
      blue500: '#454860',
      blue300: '#565A77',
      blue100: '#666B93',
      lightBlue: '#666B93',
      white: "#fff",
      white1: "#F4F4F8"
    },
    borderRadius: {
      modules: "50px",
      'none': '0',
      'sm': '0.125rem',
      DEFAULT: '0.25rem',
      'md': '0.375rem',
      'lg': '0.5rem',
      'full': '9999px',
      'large': '12px',
    },
    fontFamily: {
      'Raleway': ["Raleway", 'ui-sans-serif'],
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.h-vh-minus': {
          height: 'var(--vh-minus)',
        },
      };

      addUtilities(newUtilities);
    }),
  ],
};


