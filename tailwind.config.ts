import {type Config} from 'tailwindcss';
import {fontFamily} from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.tsx'],
  darkMode: ['class', 'class'],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: [
  				'var(--font-geist-sans)',
                    ...fontFamily.sans
                ]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
