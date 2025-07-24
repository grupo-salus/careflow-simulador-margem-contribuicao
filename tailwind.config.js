/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'careflow': {
          'primary': '#8b5cf6', // Roxo principal do Careflow
          'secondary': '#a855f7', // Roxo secundário
          'purple': '#8b5cf6', // Roxo do gradiente
          'orange': '#f97316', // Laranja do gradiente
          'pink': '#ec4899', // Rosa do gradiente
          'accent': '#f59e0b', // Laranja dourado para destaques
          'success': '#10b981', // Verde para sucessos
          'warning': '#f59e0b', // Amarelo para avisos
          'error': '#ef4444', // Vermelho para erros
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
        'gradient-careflow': 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f97316 100%)',
        'gradient-purple': 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
        'gradient-orange': 'linear-gradient(135deg, #f97316 0%, #f59e0b 100%)',
        'gradient-sidebar': 'linear-gradient(180deg, #8b5cf6 0%, #ec4899 50%, #f97316 100%)',
      }
    },
  },
  plugins: [],
};