/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#2C5530',    // Deep forest green
        'primary-light': '#4A7856', // Lighter green
        'secondary': '#8B4513',  // Saddle brown
        'secondary-light': '#A0522D', // Sienna brown
        'accent': '#DAA520',     // Goldenrod for accents
        'background': '#F5F5DC'  // Beige background
      },
      backgroundImage: {
        'hero-pattern': "linear-gradient(to right bottom, rgba(44, 85, 48, 0.9), rgba(139, 69, 19, 0.85)), url('/images/hero-bg.jpg')",
        'menu-pattern': "linear-gradient(120deg, rgba(44, 85, 48, 0.97), rgba(139, 69, 19, 0.95))",
        'nav-gradient': "linear-gradient(180deg, rgba(245, 245, 220, 0.95) 0%, rgba(245, 245, 220, 0.95) 100%)"
      },
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'fade-in': {
          '0%': {
            opacity: '0'
          },
          '100%': {
            opacity: '1'
          }
        }
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out',
        'fade-in': 'fade-in 0.5s ease-out'
      }
    },
  },
  plugins: [],
}
