import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Kintsugi reskin — neon/brand/dark/text now resolve to Kintsugi
        // equivalents (same role, new palette). status stays frozen per
        // Kintsugi's own spec ("unchanged from spec v0, kept for
        // continuity"). neon.* uses Kintsugi's own documented back-compat
        // mapping (gem tones standing in for each retired neon color) so
        // any existing neon-* class keeps working without a rename.
        neon: {
          pink: '#c81e6c', magenta: '#b23aa8', purple: '#6a3dcc', violet: '#8b2ecc',
          blue: '#3a6ad9', cyan: '#0fb5c9', teal: '#0a7e74', green: '#10c96a',
          yellow: '#e8a500', orange: '#e8871a', red: '#c8321e',
        },
        brand: {
          primary: '#0a7e74', accent: '#8b2ecc', electric: '#ff5f1f',
          hotPink: '#c81e6c', violet: '#8b2ecc',
        },
        dark: {
          void: '#0a0a1a', bg: '#0a0a1a', surface: '#0f1028', elevated: '#1a1f3e',
          border: '#3a3a6a', borderGlow: '#8a8ad0',
        },
        light: { bg: '#faf8f5', surface: '#ffffff', elevated: '#f0ede8', border: '#d4cfc7' },
        status: { protected: '#06d6e0', warning: '#ffd600', blocked: '#ff2d95', info: '#448aff' },
        text: { primary: '#f4f4fb', secondary: '#cfd0e8', muted: '#8b8db0', inverse: '#0f1028' },
        // Raw Kintsugi palette, for anything that wants a token the roles
        // above don't cover. See src/styles/tokens.css for the CSS-custom-
        // property equivalents.
        kintsugi: {
          brass: {
            highlight: '#f5d07a', light: '#e2b25b', hero: '#b48438', mid: '#8a5f1e',
            dark: '#4a341a', deep: '#3a2a12', void: '#2a1c08',
          },
          indigo: {
            light: '#8a8ad0', edge: '#3a3a6a', raised: '#232852', hero: '#2a1f54',
            slate: '#1a1f3e', deep: '#0f1028', void: '#0a0a1a',
          },
          fireOpal: {
            cream: '#ffe8b8', ember: '#ffa94d', base: '#ff5f1f', core: '#d63030', deep: '#7a1f2e',
          },
          gem: {
            garnet: '#c8321e', amber: '#e8871a', citrine: '#e8a500', emerald: '#10c96a',
            malachite: '#0a7e74', sapphire: '#0fb5c9', lapis: '#3a6ad9', amethyst: '#8b2ecc',
            tourmaline: '#c81e6c',
          },
        },
      },
      fontFamily: {
        display: "'Orbitron', 'Rajdhani', sans-serif",
        heading: "'Rajdhani', 'DM Sans', sans-serif",
        body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        mono: "'JetBrains Mono', 'SF Mono', 'Monaco', monospace",
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.625rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.875rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['2rem', { lineHeight: '2.5rem' }],
        '4xl': ['2.75rem', { lineHeight: '3rem' }],
        '5xl': ['3.5rem', { lineHeight: '3.75rem' }],
      },
      spacing: {
        1: '0.25rem', 2: '0.5rem', 3: '0.75rem', 4: '1rem', 5: '1.25rem',
        6: '1.5rem', 8: '2rem', 10: '2.5rem', 12: '3rem', 16: '4rem', 20: '5rem',
      },
      borderRadius: { sm: '6px', md: '8px', lg: '12px', xl: '16px', '2xl': '20px' },
      boxShadow: {
        glow: '0 0 20px rgba(255,95,31,0.4), 0 0 60px rgba(255,95,31,0.15)',
        'glow-pink': '0 0 20px rgba(200,30,108,0.4), 0 0 60px rgba(200,30,108,0.15)',
        'glow-violet': '0 0 20px rgba(139,46,204,0.4), 0 0 60px rgba(139,46,204,0.15)',
        'glow-rainbow': '0 0 20px rgba(200,30,108,0.3), 0 0 40px rgba(139,46,204,0.2), 0 0 60px rgba(255,95,31,0.15)',
      },
      backgroundImage: {
        'rainbow-gradient': 'linear-gradient(135deg, #c8321e, #e8871a, #e8a500, #10c96a, #3a6ad9, #8b2ecc, #c81e6c)',
        'neon-gradient': 'linear-gradient(135deg, #ff5f1f, #8b2ecc, #c81e6c)',
      },
      animation: { glow: 'glow 1.5s ease-in-out infinite alternate' },
      keyframes: {
        glow: {
          from: { textShadow: '0 0 10px currentColor, 0 0 20px currentColor' },
          to: { textShadow: '0 0 20px currentColor, 0 0 40px currentColor' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
