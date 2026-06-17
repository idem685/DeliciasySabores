// =============================================================================
// Componente: Gallery (Galería de Fotos)
// =============================================================================
// Muestra una colección de fotos del restaurante en un grid responsivo.
// Incluye:
// - Grid de 2 columnas en móvil, 4 en escritorio
// - Efecto hover con zoom y oscurecimiento
// - Lightbox para ver las fotos en grande al hacer clic
// - Lazy loading para rendimiento
// =============================================================================

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { HiPhotograph } from 'react-icons/hi'
import Lightbox from './Lightbox'

// Array de fotos de la galería (usando Unsplash para placeholders de alta calidad)
const GALLERY_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=600&auto=format',
    alt: 'Plato estrella: Risotto de Hongos Silvestres',
  },
  {
    src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600&auto=format',
    alt: 'Vitrina de pastelería artesanal',
  },
  {
    src: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=600&auto=format',
    alt: 'Cóctel de autor en la barra',
  },
  {
    src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=600&auto=format',
    alt: 'Terraza al atardecer',
  },
  {
    src: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=600&auto=format',
    alt: 'Interior del salón principal',
  },
  {
    src: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=600&auto=format',
    alt: 'Postre decorado con detalles de oro',
  },
  {
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=600&auto=format',
    alt: 'Decoración de la mesa',
  },
  {
    src: 'https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?q=80&w=600&auto=format',
    alt: 'Vista panorámica del restaurante',
  },
]

/**
 * Componente Gallery - Galería de fotos interactiva
 */
const Gallery = () => {
  const { t } = useTranslation()
  // Estado del lightbox: índice de la imagen seleccionada o null si está cerrado
  const [selectedIndex, setSelectedIndex] = useState(null)

  /**
   * Abre el lightbox con la imagen en el índice dado
   * @param {number} index - Índice de la imagen en el array
   */
  const openLightbox = (index) => {
    setSelectedIndex(index)
    document.body.style.overflow = 'hidden' // Prevenir scroll
  }

  /**
   * Cierra el lightbox
   */
  const closeLightbox = () => {
    setSelectedIndex(null)
    document.body.style.overflow = 'auto'
  }

  /**
   * Navega a la imagen anterior
   */
  const goToPrevious = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1
    )
  }

  /**
   * Navega a la imagen siguiente
   */
  const goToNext = () => {
    setSelectedIndex((prev) =>
      prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1
    )
  }

  return (
    <section id="gallery" className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ======== Encabezado de la sección ======== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-secondary text-xs uppercase tracking-[0.2em] font-medium">
            {t('gallery.etiqueta')}
          </span>
          <h2 className="section-title mt-3 mb-4">
            {t('gallery.titulo')}{' '}
            <span className="text-secondary">{t('gallery.tituloSpan')}</span>
          </h2>
          <div className="gold-divider" />
          <p className="section-subtitle">
            {t('gallery.subtitulo')}
          </p>
        </motion.div>

        {/* ======== Grid de imágenes ======== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {GALLERY_IMAGES.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => openLightbox(index)}
              className="group relative overflow-hidden cursor-pointer aspect-square"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              {/* Overlay oscuro en hover */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-all duration-300 flex items-center justify-center">
                <HiPhotograph className="text-cream text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ======== Lightbox (modal de imagen ampliada) ======== */}
      {selectedIndex !== null && (
        <Lightbox
          images={GALLERY_IMAGES}
          currentIndex={selectedIndex}
          onClose={closeLightbox}
          onPrevious={goToPrevious}
          onNext={goToNext}
        />
      )}
    </section>
  )
}

export default Gallery
