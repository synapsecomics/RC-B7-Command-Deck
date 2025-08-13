/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'crt-bg': '#0b0b12',
        'crt-panel': '#0f1020',
        'crt-text': '#e7e7ff',
        'crt-muted': '#9aa0b3',
        'crt-accent': '#b293ff',
        'crt-accent-2': '#6be3ff',
      },
      fontFamily: {
        'mono': ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
      },
      backgroundImage: {
        'crt-scanline': 'repeating-linear-gradient(to bottom, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 3px)',
        'galaxy-radial': 'radial-gradient(1200px 800px at 80% -10%, rgba(116,0,255,0.18), transparent 50%), radial-gradient(900px 700px at -10% 120%, rgba(0,209,255,0.14), transparent 50%)',
      },
    },
  },
  plugins: [],
}