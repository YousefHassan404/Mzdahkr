 /** @type {import('tailwindcss').Config} */
 export default {
  content: ["./src/**/*.{html,jsx,js}"],
  theme: {
    extend: {
      colors: {
        navy: {
          800: '#1B2347',
          900: '#101830',
        },
        orange: {
          500: '#F39200',
          600: '#DA8300',
          700: '#C17400',
        }
      }
    }
  },
  plugins: [],
}

