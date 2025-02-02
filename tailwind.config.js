/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* Hides scrollbar in WebKit-based browsers */
          '-webkit-overflow-scrolling': 'touch',
          'scrollbar-width': 'none', /* Hides scrollbar in Firefox */
          '-ms-overflow-style': 'none', /* Hides scrollbar in IE/Edge */
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          display: 'none', /* Hides scrollbar in Chrome/Safari */
        },
      });
    },
    require('tailwind-scrollbar'),
  ],
}
