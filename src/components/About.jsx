// =============================================================================
// Componente: About (Sección "Sobre Nosotros")
// =============================================================================
// Historia del restaurante con imagen del interior y sellos de calidad.
// Incluye animaciones de entrada con Framer Motion para una experiencia visual atractiva.
// =============================================================================

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { HiBadgeCheck, HiSparkles, HiHeart } from 'react-icons/hi'

/**
 * Componente About - Historia y valores del restaurante
 */
const About = () => {
  const { t } = useTranslation()

  // Sellos de calidad del restaurante (con keys de traducción)
  const SEALS = [
    {
      icon: HiBadgeCheck,
      titleKey: 'about.sellos.frescos',
      descKey: 'about.sellos.frescosDesc',
    },
    {
      icon: HiSparkles,
      titleKey: 'about.sellos.ambiente',
      descKey: 'about.sellos.ambienteDesc',
    },
    {
      icon: HiHeart,
      titleKey: 'about.sellos.atencion',
      descKey: 'about.sellos.atencionDesc',
    },
  ]

  return (
    <section id="about" className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ======== Grid de dos columnas: texto + imagen ======== */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ======== Columna izquierda: Texto de la historia ======== */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            {/* Etiqueta de sección */}
            <span className="text-secondary text-xs uppercase tracking-[0.2em] font-medium">
              {t('about.etiqueta')}
            </span>

            {/* Título */}
            <h2 className="section-title mt-3 mb-4">
              {t('about.titulo1')}
              <br />
              <span className="text-secondary">{t('about.titulo2')}</span>
            </h2>

            {/* Línea decorativa */}
            <div className="gold-divider !mx-0" />

            {/* Párrafos de la historia */}
            <p className="text-text-light leading-relaxed mb-4">
              {t('about.parrafo1')}
            </p>
            <p className="text-text-light leading-relaxed mb-6">
              {t('about.parrafo2')}
            </p>

            {/* Sellos de calidad */}
            <div className="grid sm:grid-cols-3 gap-6 mt-8">
              {SEALS.map((seal, index) => (
                <motion.div
                  key={seal.titleKey}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <seal.icon className="text-2xl text-secondary mx-auto mb-2" />
                  <h3 className="text-primary font-semibold text-sm mb-1">{t(seal.titleKey)}</h3>
                  <p className="text-text-lighter text-xs leading-relaxed">{t(seal.descKey)}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ======== Columna derecha: Imagen del interior ======== */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format"
                alt="Interior elegante de Delicias & Sabores"
                className="w-full h-[500px] object-cover"
                loading="lazy"
              />
              {/* Overlay sutil en la esquina inferior */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/60 to-transparent p-6">
                <p className="text-cream text-sm font-serif italic">
                  &ldquo;{t('about.cita')}&rdquo;
                </p>
              </div>
            </div>

            {/* Cuadro decorativo (solo visible en escritorio) */}
            <div className="hidden lg:block absolute -bottom-4 -right-4 w-24 h-24 border-2 border-secondary/30 -z-10" />
            <div className="hidden lg:block absolute -top-4 -left-4 w-24 h-24 border-2 border-secondary/30 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
