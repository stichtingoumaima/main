/** @type {import('tailwindcss').Config} */
module.exports = {
  variants: {
    extend: {
      // ...
      backdropFilter: ['responsive'], // enable backdrop-filter
    },
  },

  darkMode: ["class"],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
	],
  theme: {
    cursor: {
      auto: 'url(/assets/cursor.png), pointer ',
      default: 'url(/assets/cursor.png), pointer ',
      pointer: 'url(/assets/cursor.png), pointer ',
     wait: 'url(/assets/cursor.png), pointer ',
      text: 'url(/assets/cursor.png), pointer ',
     move: 'url(/assets/cursor.png), pointer ',
      'not-allowed': 'url(/assets/cursor.png), pointer ',
     crosshair: 'url(/assets/cursor.png), pointer ',
     'zoom-in': 'url(/assets/cursor.png), pointer ',
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      boxShadow: {
        'inner': 'inset -12px -8px 40px #46464620',
        'outer-glow': '0 0 6px rgba(255, 255, 255, 0.5)',
        
      },
      fontFamily: {
        'sans': ['Roboto', 'Helvetica', 'Arial', 'sans-serif']
      },
      cursor: {
        'custom': 'url(/assets/cursor.png), pointer ', // replace with the actual path to your image
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        'move-up-and-down': 'move-up-and-down 2s ease-in-out infinite',
      },
      keyframes: {
        'move-up-and-down': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      }
    },
  },
  plugins: [require("tailwindcss-animate"),
    require('@tailwindcss/aspect-ratio'), // Add this line
    require('tailwindcss-filters')],
}