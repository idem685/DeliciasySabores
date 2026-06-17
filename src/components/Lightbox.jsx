// =============================================================================
// Componente: Lightbox (Visor de Imágenes Ampliadas)
// =============================================================================
// Modal que se superpone a toda la pantalla para mostrar una imagen en grande.
// Incluye:
// - Imagen centrada con fondo oscuro
// - Botones de navegación (anterior/siguiente)
// - Botón de cierre
// - Navegación por teclado (Escape para cerrar, flechas para navegar)
// - Animaciones de entrada/salida con Framer Motion
// =============================================================================

import { useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi'

/**
 * Componente Lightbox - Visor de imágenes a pantalla completa
 *
 * @param {Object} props
 * @param {Array} props.images - Array de objetos con { src, alt }
 * @param {number} props.currentIndex - Índice de la imagen actual
 * @param {Function} props.onClose - Función para cerrar el lightbox
 * @param {Function} props.onPrevious - Función para ir a la imagen anterior
 * @param {Function} props.onNext - Función para ir a la imagen siguiente
 */
const Lightbox = ({ images, currentIndex, onClose, onPrevious, onNext }) => {
  const currentImage = images[currentIndex]

  /**
   * Maneja eventos de teclado para navegación accesible
   * Escape: cerrar, Flecha Izquierda: anterior, Flecha Derecha: siguiente
   */
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrevious()
      if (e.key === 'ArrowRight') onNext()
    },
    [onClose, onPrevious, onNext]
  )

  // Registrar y limpiar el event listener de teclado
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] bg-primary/95 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose} // Cerrar al hacer clic en el fondo
    >
      {/* ======== Botón de cierre ======== */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-cream/80 hover:text-cream transition-colors p-2"
        aria-label="Cerrar galería"
      >
        <HiX size={28} />
      </button>

      {/* ======== Botón anterior ======== */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onPrevious()
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-cream/80 hover:text-cream transition-colors p-2"
          aria-label="Imagen anterior"
        >
          <HiChevronLeft size={36} />
        </button>
      )}

      {/* ======== Imagen principal ======== */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-[90vw] max-h-[85vh]"
        onClick={(e) => e.stopPropagation()} // Evitar cerrar al hacer clic en la imagen
      >
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="max-w-full max-h-[85vh] object-contain"
        />
        {/* Título de la imagen */}
        <p className="text-cream/70 text-sm text-center mt-4">
          {currentImage.alt}
        </p>
      </motion.div>

      {/* ======== Botón siguiente ======== */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onNext()
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-cream/80 hover:text-cream transition-colors p-2"
          aria-label="Imagen siguiente"
        >
          <HiChevronRight size={36} />
        </button>
      )}

      {/* ======== Indicador de posición ======== */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-cream/60 text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </motion.div>
  )
}

export default Lightbox
