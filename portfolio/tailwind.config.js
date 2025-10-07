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
      },
      colors: {
        // Primary brand colors - unified across light and dark modes
        brand: {
          primary: '#0ea5e9',     // Primary blue
          secondary: '#8b5cf6',   // Purple accent
          accent: '#10b981',      // Green accent
        },
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
        // Dark mode color palette - standardized
        dark: {
          bg: '#0a0a0f',
          'bg-secondary': '#1a1b25',
          card: '#111827',
          text: '#f4f4f4',
          'text-secondary': '#c9c9c9',
          accent1: '#00c6ff',
          accent2: '#7a42ff',
          border: 'rgba(255, 255, 255, 0.1)',
        },
        // Light mode color palette - standardized
        light: {
          bg: '#f9fafb',
          'bg-secondary': '#eaecef',
          card: '#ffffff',
          text: '#1f2937',
          'text-secondary': '#4b5563',
          accent1: '#2563eb',
          accent2: '#8b5cf6',
          border: 'rgba(0, 0, 0, 0.1)',
        },
      },
      boxShadow: {
        // Unified shadow system
        'card': '0 2px 12px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 4px 20px rgba(0, 0, 0, 0.12)',
        'card-dark': '0 20px 60px rgba(0, 0, 0, 0.5)',
        'card-dark-hover': '0 30px 80px rgba(0, 0, 0, 0.6)',
        // Glow effects
        'glow': '0 0 20px var(--glow-color, rgba(37, 99, 235, 0.3))',
        'glow-cyan': '0 0 20px rgba(0, 198, 255, 0.5)',
        'glow-purple': '0 0 20px rgba(122, 66, 255, 0.5)',
        'glow-blue': '0 0 20px rgba(37, 99, 235, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in': 'slideIn 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
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
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      // Standardized spacing scale
      spacing: {
        'section': '5rem',      // 80px - standard section padding
        'section-sm': '4rem',   // 64px - compact section padding
        'section-lg': '7rem',   // 112px - large section padding
      },
      // Standardized container max-widths
      maxWidth: {
        'container': '1280px',  // 7xl - standard container
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
