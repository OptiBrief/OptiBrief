/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}','./lib/**/*.{ts,tsx}','./hooks/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['"Inter"','system-ui','sans-serif'],
        display: ['"Cal Sans"','"Inter"','system-ui','sans-serif'],
        mono:    ['"JetBrains Mono"','"Fira Code"','monospace'],
      },
      colors: {
        ink: {
          0:    '#060810',
          50:   '#090c16',
          100:  '#0c101e',
          150:  '#0f1426',
          200:  '#131929',
          300:  '#1a2138',
          400:  '#202844',
          border: '#1e2840',
          subtle: '#243050',
          muted:  '#344060',
          dim:    '#4a5c80',
          sub:    '#6878a0',
          text:   '#8898c0',
          soft:   '#a8b8d8',
          high:   '#c8d8f0',
          bright: '#e8f0ff',
        },
        signal: {
          DEFAULT: '#5b8cf8',
          dim:     '#3a6ae0',
          glow:    'rgba(91,140,248,0.12)',
          border:  'rgba(91,140,248,0.2)',
        },
        up:    { DEFAULT: '#34d399', muted: 'rgba(52,211,153,0.1)',  border: 'rgba(52,211,153,0.2)'  },
        down:  { DEFAULT: '#f87171', muted: 'rgba(248,113,113,0.1)', border: 'rgba(248,113,113,0.2)' },
        warn:  { DEFAULT: '#fbbf24', muted: 'rgba(251,191,36,0.1)',  border: 'rgba(251,191,36,0.2)'  },
        pulse: { DEFAULT: '#a78bfa', muted: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.2)' },
      },
      backgroundImage: {
        'card-gradient': 'linear-gradient(145deg, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0) 100%)',
        'signal-gradient': 'linear-gradient(135deg, rgba(91,140,248,0.08) 0%, rgba(91,140,248,0) 100%)',
        'up-gradient':   'linear-gradient(135deg, rgba(52,211,153,0.06) 0%, rgba(52,211,153,0) 100%)',
        'down-gradient': 'linear-gradient(135deg, rgba(248,113,113,0.06) 0%, rgba(248,113,113,0) 100%)',
      },
      boxShadow: {
        'card':       '0 1px 3px rgba(0,0,0,0.5), 0 8px 40px rgba(0,0,0,0.35)',
        'card-hover': '0 1px 3px rgba(0,0,0,0.5), 0 16px 60px rgba(0,0,0,0.5)',
        'signal':     '0 0 40px rgba(91,140,248,0.08)',
        'inner':      'inset 0 1px 0 rgba(255,255,255,0.04)',
        'glow-sm':    '0 0 20px rgba(91,140,248,0.15)',
      },
      keyframes: {
        fadeUp:   { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:   { from: { opacity: '0' }, to: { opacity: '1' } },
        slideDown:{ from: { opacity: '0', transform: 'translateY(-8px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        shimmer:  { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        breathe:  { '0%,100%': { opacity: '0.6' }, '50%': { opacity: '1' } },
        slideUp:  { from: { transform: 'translateY(100%)' }, to: { transform: 'translateY(0)' } },
        scaleIn:  { from: { opacity: '0', transform: 'scale(0.97)' }, to: { opacity: '1', transform: 'scale(1)' } },
      },
      animation: {
        fadeUp:    'fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) forwards',
        fadeIn:    'fadeIn 0.3s ease-out',
        slideDown: 'slideDown 0.3s ease-out',
        shimmer:   'shimmer 2s linear infinite',
        breathe:   'breathe 3s ease-in-out infinite',
        slideUp:   'slideUp 0.4s cubic-bezier(0.22,1,0.36,1)',
        scaleIn:   'scaleIn 0.25s ease-out',
      },
    }
  },
  plugins: []
}
