/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        accent: {
          purple: '#a855f7',
          pink: '#ec4899',
          green: '#10b981',
        },
        // Dark mode color palette
        dark: {
          bg: '#0a0a0f',
          'bg-secondary': '#1a1b25',
          card: '#111827',
          text: '#f4f4f4',
          'text-secondary': '#c9c9c9',
          accent1: '#00c6ff',
          accent2: '#7a42ff',
          glow: 'rgba(0, 198, 255, 0.5)',
          border: 'rgba(255, 255, 255, 0.1)',
        },
        // Light mode color palette
        light: {
          bg: '#f9fafb',
          'bg-secondary': '#eaecef',
          card: '#ffffff',
          text: '#1f2937',
          'text-secondary': '#4b5563',
          accent1: '#2563eb',
          accent2: '#8b5cf6',
          glow: 'rgba(37, 99, 235, 0.2)',
          border: 'rgba(0, 0, 0, 0.1)',
        },
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 198, 255, 0.5)',
        'glow-purple': '0 0 20px rgba(122, 66, 255, 0.5)',
        'glow-blue': '0 0 20px rgba(37, 99, 235, 0.3)',
        'light-card': '0 2px 12px rgba(0, 0, 0, 0.08)',
        'light-card-hover': '0 4px 20px rgba(0, 0, 0, 0.12)',
        'soft': '0 2px 8px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in': 'slideIn 0.5s ease-out',
        'spiral': 'spiral 20s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        spiral: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
