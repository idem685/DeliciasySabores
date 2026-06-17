// =============================================================================
// Componente: Hero (Sección de Portada Principal)
// =============================================================================
// Primera sección que ve el usuario al entrar al sitio.
// Incluye:
// - Imagen de fondo de alta resolución con overlay oscuro
// - Título principal con tipografía serif elegante
// - Subtítulo descriptivo
// - Dos llamadas a la acción (CTAs): "Ver Menú" y "Reservar Ahora"
// - Animaciones de entrada con Framer Motion
// =============================================================================

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

/**
 * Componente Hero - Portada principal del restaurante
 * @param {Object} props
 * @param {Function} props.onReserveClick - Función para abrir el modal de reservas
 */
const Hero = ({ onReserveClick }) => {
  const { t } = useTranslation()

  /**
   * Hace scroll suave hacia la sección del menú
   */
  const scrollToMenu = () => {
    const menuSection = document.querySelector('#menu')
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ======== Imagen de fondo con overlay oscuro ======== */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1920&auto=format"
          alt="Interior elegante del restaurante Delicias & Sabores"
          className="w-full h-full object-cover"
          loading="eager" // La imagen del hero debe cargarse inmediatamente (Above the Fold)
        />
        {/* Overlay oscuro para legibilidad del texto */}
        {/* Opacidad uniforme de 0.4 como se especificó en los requerimientos */}
        <div className="absolute inset-0 bg-primary/40" />
      </div>

      {/* ======== Contenido del Hero (sobre el overlay) ======== */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        {/* Línea decorativa superior */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-0.5 bg-secondary mx-auto mb-8"
        />

        {/* Título principal con animación */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-cream font-semibold mb-6 leading-tight"
        >
          {t('hero.titulo')}
          <br />
          <span className="text-secondary">{t('hero.tituloSpan')}</span>
        </motion.h1>

        {/* Línea decorativa separadora */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-16 h-0.5 bg-secondary/60 mx-auto mb-6"
        />

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-cream/80 text-base sm:text-lg md:text-xl font-light max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t('hero.subtitulo')}
        </motion.p>

        {/* ======== Botones de llamada a la acción (CTAs) ======== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* CTA 1: Ver Menú (estilo outline) */}
          <button
            onClick={scrollToMenu}
            className="btn-outline text-sm uppercase tracking-widest px-8 py-3.5 w-full sm:w-auto"
          >
            {t('hero.verMenu')}
          </button>

          {/* CTA 2: Reservar Ahora (estilo dorado destacado) */}
          <button
            onClick={onReserveClick}
            className="btn-gold text-sm uppercase tracking-widest px-8 py-3.5 w-full sm:w-auto"
          >
            {t('hero.reservarAhora')}
          </button>
        </motion.div>

        {/* Indicador de scroll (sutil, solo visible en escritorio) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-cream/30 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-cream/50 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
