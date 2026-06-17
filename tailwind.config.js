// =============================================================================
// Configuración de TailwindCSS
// =============================================================================
// Personalizamos Tailwind con la paleta de colores del restaurante y las
// tipografías seleccionadas de Google Fonts.
// =============================================================================

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // =========================================================================
      // Paleta de colores del restaurante
      // =========================================================================
      colors: {
        // Negro elegante - usado para fondos oscuros y textos principales
        primary: {
          DEFAULT: '#1A1A1A',
          light: '#2C2C2C',
          dark: '#0D0D0D',
        },
        // Dorado/mostaza - usado para acentos, bordes y detalles premium
        secondary: {
          DEFAULT: '#C9A96E',
          light: '#D4BF8A',
          dark: '#B8944D',
        },
        // Crema/crudo - fondo principal del sitio
        cream: {
          DEFAULT: '#F8F4F0',
          dark: '#EDE8E0',
        },
        // Texto principal
        text: {
          DEFAULT: '#2C2C2C',
          light: '#666666',
          lighter: '#999999',
        },
      },
      // =========================================================================
      // Tipografía - Playfair Display para títulos, Inter para cuerpo
      // =========================================================================
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      // =========================================================================
      // Animaciones personalizadas
      // =========================================================================
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeInUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
