/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-yellow': '#ffd300',
        'space-orange': '#ff6f00',
        'deep-space': '#191919',
        'transparent-black': 'rgba(0, 0, 0, 0.2)',
      },
      fontFamily: {
        'exquisite': ['Exquisite', 'sans-serif'],
        'dainty': ['Dainty', 'sans-serif'],
        'creative': ['Creative', 'sans-serif'],
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow': {
          '0%, 100%': { textShadow: '0 0 5px #ffd300' },
          '50%': { textShadow: '0 0 8px #ffd300' },
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}