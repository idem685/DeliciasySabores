// =============================================================================
// Componente: Reviews (Sección de Reseñas de Clientes)
// =============================================================================
// Muestra reseñas de clientes con valoración de estrellas.
// Los datos se obtienen desde el archivo JSON estático en /data/reviews.json.
// Incluye diseño tipo testimonial cards con avatar, nombre y calificación.
// =============================================================================

import { useState, useMemo, useEffect, useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { HiStar, HiChevronLeft, HiChevronRight, HiPause, HiPlay } from 'react-icons/hi'

import reviewsData from '../data/reviews.json'

/**
 * Renderiza estrellas visuales según una calificación
 * @param {number} rating - Calificación de 1 a 5
 * @param {string} size - Tamaño del icono
 */
const StarRating = ({ rating, size = 'text-lg' }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <HiStar
        key={star}
        className={`${size} ${
          star <= rating ? 'text-yellow-400' : 'text-gray-200'
        }`}
      />
    ))}
  </div>
)

/**
 * Componente Reviews - Sección de reseñas
 */
const Reviews = () => {
  const { t } = useTranslation()
  // Índice de la reseña visible actualmente en el carrusel
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const intervalRef = useRef(null)

  // Promedio de estrellas calculado una sola vez
  const averageRating = useMemo(() => {
    const sum = reviewsData.reduce((acc, r) => acc + r.rating, 0)
    return (sum / reviewsData.length).toFixed(1)
  }, [])

  // Distribución de estrellas para la barra de progreso
  const ratingDistribution = useMemo(() => {
    const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    reviewsData.forEach((r) => dist[r.rating]++)
    return dist
  }, [])

  // Ir a la reseña siguiente (usada por auto-play y botón)
  const goToNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev === reviewsData.length - 1 ? 0 : prev + 1))
  }, [])

  // Ir a la reseña anterior
  const goToPrevious = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev === 0 ? reviewsData.length - 1 : prev - 1))
  }, [])

  // Auto-play: avanza cada 5 segundos. Se reinicia automáticamente al cambiar currentIndex
  useEffect(() => {
    if (autoPlay && !isHovered) {
      intervalRef.current = setInterval(goToNext, 5000)
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [autoPlay, isHovered, goToNext, currentIndex])

  const toggleAutoPlay = () => {
    setAutoPlay((prev) => !prev)
  }

  const currentReview = reviewsData[currentIndex]

  // Variantes de animación para el carrusel
  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  }

  return (
    <section id="reviews" className="py-20 md:py-28 bg-cream scroll-mt-20 md:scroll-mt-24">
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
            {t('reviews.etiqueta')}
          </span>
          <h2 className="section-title mt-3 mb-4">
            {t('reviews.titulo')}{' '}
            <span className="text-secondary">{t('reviews.tituloSpan')}</span>
          </h2>
          <div className="gold-divider" />
          <p className="section-subtitle">
            {t('reviews.subtitulo')}
          </p>
        </motion.div>

        {/* ======== Resumen de calificaciones ======== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16"
        >
          {/* Calificación promedio */}
          <div className="text-center">
            <span className="text-5xl font-serif font-bold text-primary">
              {averageRating}
            </span>
            <div className="flex justify-center mt-1">
              <StarRating rating={Math.round(parseFloat(averageRating))} size="text-xl" />
            </div>
            <p className="text-text-light text-sm mt-1">
              {reviewsData.length} {t('reviews.etiqueta')}
            </p>
          </div>

          {/* Barras de distribución */}
          <div className="space-y-1.5 min-w-[200px]">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-2 text-sm">
                <span className="text-text-light w-3 text-right">{star}</span>
                <HiStar className="text-yellow-400 text-sm" />
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                    style={{
                      width: `${(ratingDistribution[star] / reviewsData.length) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-text-lighter text-xs w-6 text-right">
                  {ratingDistribution[star]}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ======== Carrusel de testimonios ======== */}
        <div
          className="relative max-w-2xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Botón anterior */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 text-text-lighter hover:text-primary transition-colors"
            aria-label="Reseña anterior"
          >
            <HiChevronLeft size={28} />
          </button>

          {/* Testimonio actual */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="text-center px-4"
              >
                {/* Avatar */}
                <img
                  src={currentReview.avatar}
                  alt={currentReview.name}
                  className="w-16 h-16 rounded-full object-cover mx-auto mb-4"
                  loading="lazy"
                />

                {/* Estrellas */}
                <StarRating rating={currentReview.rating} size="text-lg" />
                <div className="flex justify-center mt-1 mb-4">
                  <span className="text-text-lighter text-xs">
                    {new Date(currentReview.date).toLocaleDateString('es-AR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>

                {/* Texto de la reseña */}
                <p className="text-text-light text-base leading-relaxed italic mb-6">
                  &ldquo;{currentReview.text}&rdquo;
                </p>

                {/* Nombre del cliente */}
                <p className="font-serif text-lg font-semibold text-primary">
                  {currentReview.name}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Botón siguiente */}
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 text-text-lighter hover:text-primary transition-colors"
            aria-label="Reseña siguiente"
          >
            <HiChevronRight size={28} />
          </button>

          {/* Controles inferiores: indicadores + auto-play */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {/* Indicadores de posición (puntos) */}
            <div className="flex items-center gap-2">
              {reviewsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection((prev) => (index > prev ? 1 : -1))
                    setCurrentIndex(index)
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-secondary w-6'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Ir a reseña ${index + 1}`}
                />
              ))}
            </div>

            {/* Botón pausa/reproducir auto-play */}
            <button
              onClick={toggleAutoPlay}
              className={`ml-2 p-1.5 rounded-full transition-all duration-300 ${
                autoPlay
                  ? 'text-text-lighter hover:text-primary'
                  : 'text-secondary bg-secondary/10'
              }`}
              aria-label={autoPlay ? 'Pausar auto-play' : 'Activar auto-play'}
            >
              {autoPlay ? <HiPause size={16} /> : <HiPlay size={16} />}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Reviews
