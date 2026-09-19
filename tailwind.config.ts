import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#FFFFFF',
        'bg-subtle': '#F6F8FB',
        surface: '#FFFFFF',
        border: '#E4E9F0',
        'border-strong': '#CBD5E1',
        text: '#0B1220',
        'text-body': '#24303F',
        'text-muted': '#5B6779',
        'text-faint': '#8494A8',
        brand: '#0E63C4',
        'brand-hover': '#0A4E9E',
        'brand-soft': '#EBF3FD',
        'brand-ink': '#0A3F73',
        raised: '#B42318',
        'raised-bg': '#FEF2F2',
        'raised-bd': '#FBD5D5',
        lowered: '#067647',
        'lowered-bg': '#F0FDF4',
        'lowered-bd': '#BBF0CC',
        suspended: '#8A6100',
        'suspended-bg': '#FFFBEB',
        'suspended-bd': '#FCE8A5',
        struck: '#5B6473',
        'struck-bg': '#F8FAFC',
        'struck-bd': '#D8DEE7',
        live: '#0BA360',
      },
      fontFamily: {
        ui: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
