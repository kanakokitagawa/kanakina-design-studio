/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme'); // ← この行を追加
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-m-plus-rounded-1c)', 'sans-serif'],
      },
      // ...
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
};