/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'press-start-2p': ['"Press Start 2P"','system-ui'],
      },
      colors: {
        'basic-blue': '#0000AA',
        'hoverd-blue': '#02023C',
        'clicked-blue': '#AAAAD9'
      },
    },
  },
  plugins: [],
}