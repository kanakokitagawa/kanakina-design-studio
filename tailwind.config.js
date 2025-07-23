/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './.storybook/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ★ ここが、我々の、新しい、魔法の絵の具パレットです！
      colors: {
        'smoky-black': '#11120D',
        'olive-drab': '#565449',
        'bone': '#D8CFBC',
        'floral-white': '#FFFBF4',
        'kanakina-blue': '#8198AA',
      },
      // (もし、ここに、backgroundImage などの設定があれば、それは残しておいてください)
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // proseクラスを機能させるために必要です
  ],
}