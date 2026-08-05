import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Soft UI (demo) palette — indigo accent scale (was warm amber)
        teal: {
          50: '#eef0ff',
          100: '#e0e3fd',
          200: '#c4caf9',
          300: '#a3abf3',
          400: '#818dea',
          500: '#5560e3',
          600: '#4550d3',
          700: '#3b45b3',
          800: '#333b8f',
          900: '#2d3470',
          950: '#1b2046',
        },
        // Cool blue-grey neutrals to match the #e0e5ec matte
        slate: {
          50: '#f5f7fa',
          100: '#e9edf3',
          200: '#d5dce8',
          300: '#b6c0d1',
          400: '#8b95a8',
          500: '#5d6678',
          600: '#49515f',
          700: '#3a4150',
          800: '#2a303d',
          900: '#1a1e28',
          950: '#0e1117',
        },
        // Indigo scale (mirrors teal)
        emerald: {
          50: '#eef0ff',
          100: '#e0e3fd',
          200: '#c4caf9',
          300: '#a3abf3',
          400: '#818dea',
          500: '#5560e3',
          600: '#4550d3',
          700: '#3b45b3',
          800: '#333b8f',
          900: '#2d3470',
          950: '#1b2046',
        },
        // Indigo scale (mirrors teal)
        cyan: {
          50: '#eef0ff',
          100: '#e0e3fd',
          200: '#c4caf9',
          300: '#a3abf3',
          400: '#818dea',
          500: '#5560e3',
          600: '#4550d3',
          700: '#3b45b3',
          800: '#333b8f',
          900: '#2d3470',
          950: '#1b2046',
        },
        // Accent palette — indigo unified
        accent: {
          teal: '#5560e3',   // primary indigo accent
          orange: '#7c86e8',
          cyan: '#4550d3',
          gold: '#818dea',
        },
        mclaren: {
          orange: '#ff7f32',
          papaya: '#ff8c42',
          dark: '#1a1a1a',
        },
      },
      fontFamily: {
        sans: ['"Noto Serif JP"', '"Hiragino Mincho ProN"', '"Yu Mincho"', '"MS PMincho"', 'serif'],
        display: ['"Noto Serif JP"', 'serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in-left': 'fadeInLeft 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in-right': 'fadeInRight 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config