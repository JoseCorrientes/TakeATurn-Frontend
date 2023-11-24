/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./app.jsx",
        "./main.jsx",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./src/*.{jsx,css}",
        "./src/components/**/*.{js, jsx}"
    ],    
    theme: {
      extend: {
        fontFamily: {
            'Saira': ['Saira Extra Condensed', 'sans-serif'],
            'Roboto': ['Roboto', ' sans-serif']
        },
        colors: {
            'mayra-dark-blue': '#02395f',
            'mayra-light-blue': '#01466f',
            'mayra-push-red': '#8c1515',
            'mayra-push-green': '#0E6251',
            'mayra-push-green-border':'#0B5345'
        }
      },
    },
    plugins: [],
  }