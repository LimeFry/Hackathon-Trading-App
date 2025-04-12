import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				cyber: {
					bg: '#1A1F2C',
					blue: '#1EAEDB',
					pink: '#D946EF',
					purple: '#8B5CF6',
					green: '#10B981',
					red: '#EF4444',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'pulse-glow': {
					'0%, 100%': { 
						opacity: '1',
						boxShadow: '0 0 10px rgba(30, 174, 219, 0.5), 0 0 20px rgba(30, 174, 219, 0.2)'
					},
					'50%': { 
						opacity: '0.8',
						boxShadow: '0 0 14px rgba(30, 174, 219, 0.7), 0 0 30px rgba(30, 174, 219, 0.3)'
					},
				},
				'number-change': {
					'0%': { 
						opacity: '0',
						transform: 'translateY(5px)'
					},
					'100%': { 
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-in': {
					'0%': { 
						opacity: '0'
					},
					'100%': { 
						opacity: '1'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-glow': 'pulse-glow 2s infinite ease-in-out',
				'number-change': 'number-change 0.3s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
			},
			fontFamily: {
				'mono': ['JetBrains Mono', 'monospace'],
				'sans': ['Inter', 'sans-serif'],
			},
			boxShadow: {
				'neon-blue': '0 0 5px rgba(30, 174, 219, 0.5), 0 0 20px rgba(30, 174, 219, 0.3)',
				'neon-pink': '0 0 5px rgba(217, 70, 239, 0.5), 0 0 20px rgba(217, 70, 239, 0.3)',
				'neon-green': '0 0 5px rgba(16, 185, 129, 0.5), 0 0 20px rgba(16, 185, 129, 0.3)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
