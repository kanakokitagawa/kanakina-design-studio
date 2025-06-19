/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ここに以前設定したカスタムカラーなどを追加できます
      // 例:
     colors: {
     'light-amber': '#FEF3C7', 
      'dark-stone': '#44403C', 
      },
    },
  },
  plugins: [],
};