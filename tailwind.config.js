// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      colors: {
        brand: {
          50:  '#eef2ff',
          500: '#6366F1', // primary
          600: '#4F46E5'
        },
        muted: {
          50: '#f8fafc',
          500: '#6b7280'
        }
      },
      borderRadius: {
        xl: '1rem'
      },
      boxShadow: {
        card: '0 6px 24px rgba(15, 23, 42, 0.08)',
        soft: '0 4px 12px rgba(2,6,23,0.06)'
      }
    }
  },
  plugins: [],
}
