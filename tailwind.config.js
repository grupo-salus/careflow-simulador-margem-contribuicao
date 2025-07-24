/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'careflow': {
          'primary': '#1e3a8a', // Azul escuro similar ao da sidebar
          'secondary': '#3b82f6', // Azul médio
          'purple': '#a855f7', // Roxo do gradiente
          'orange': '#f97316', // Laranja do gradiente
          'pink': '#ec4899', // Rosa do gradiente
          'gray': {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a'
          }
        }
      },
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'careflow': '0 4px 6px -1px rgba(30, 58, 138, 0.1), 0 2px 4px -1px rgba(30, 58, 138, 0.06)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        'careflow': '0.5rem',
      },
      backgroundImage: {
        'gradient-careflow': 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f97316 100%)',
        'gradient-blue': 'linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%)',
      }
    },
  },
  plugins: [],
};