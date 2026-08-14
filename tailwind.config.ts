import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Kintsugi reskin — every value here is a var(--sp-*) reference into
        // src/styles/tokens.css, which mirrors secure-pride-design's
        // colors_and_type.css (the confirmed source of truth). Repainting
        // the palette means editing tokens.css once, not this file.
        //
        // Role discipline, per the design repo's own brand table: electric
        // stays cyan/sapphire and accent stays deep indigo — gem accents
        // (violet/hotPink) are used sparingly, never promoted into the
        // everyday CTA/accent roles. status converges to gem tones (a real,
        // new visible change vs. v1 — protected/"ALL CLEAR" shifts cyan to
        // emerald green).
        neon: {
          pink: 'var(--sp-neon-pink)', magenta: 'var(--sp-neon-magenta)',
          purple: 'var(--sp-neon-purple)', violet: 'var(--sp-neon-violet)',
          blue: 'var(--sp-neon-blue)', cyan: 'var(--sp-neon-cyan)',
          teal: 'var(--sp-neon-teal)', green: 'var(--sp-neon-green)',
          yellow: 'var(--sp-neon-yellow)', orange: 'var(--sp-neon-orange)',
          red: 'var(--sp-neon-red)',
        },
        brand: {
          primary: 'var(--sp-teal)', accent: 'var(--sp-deep-purple)',
          electric: 'var(--sp-cyan)', hotPink: 'var(--sp-hot-pink)',
          violet: 'var(--sp-violet)',
        },
        dark: {
          void: 'var(--sp-void)', bg: 'var(--sp-bg)', surface: 'var(--sp-surface)',
          elevated: 'var(--sp-elevated)', border: 'var(--sp-border)',
          borderGlow: 'var(--sp-border-glow)',
        },
        light: {
          bg: 'var(--sp-light-bg)', surface: 'var(--sp-light-surface)',
          elevated: 'var(--sp-light-elevated)', border: 'var(--sp-light-border)',
        },
        status: {
          protected: 'var(--sp-status-protected)', warning: 'var(--sp-status-warning)',
          blocked: 'var(--sp-status-blocked)', info: 'var(--sp-status-info)',
        },
        text: {
          primary: 'var(--sp-text-primary)', secondary: 'var(--sp-text-secondary)',
          muted: 'var(--sp-text-muted)', inverse: 'var(--sp-text-inverse)',
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
        glow: 'var(--glow-cyan)',
        'glow-pink': 'var(--glow-pink)',
        'glow-violet': 'var(--glow-violet)',
        'glow-rainbow': 'var(--glow-rainbow)',
      },
      backgroundImage: {
        'rainbow-gradient': 'var(--grad-rainbow)',
        'neon-gradient': 'var(--grad-neon)',
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
