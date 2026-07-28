export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: '#FFFFFF',
        line: '#E3E3E8',
        body: '#5C5C70',
        heading: '#17171C',
        accent: '#00B3A4',
        secondary: '#F4F4F6',
        chip: '#2E2E38',
      },
      fontFamily: {
        sans: ['Caveat', '"Comic Sans MS"', 'cursive'],
        display: ['"Gloria Hallelujah"', 'Caveat', 'cursive'],
        mono: ['"JetBrains Mono"', 'Consolas', 'monospace'],
      },
    },
  },
}
