// =============================================================================
// Componente: WhatsAppButton (Botón Flotante de WhatsApp)
// =============================================================================
// Botón fijo en la esquina inferior derecha que abre un chat de WhatsApp.
// Es visible en todas las páginas y se desplaza suavemente con el scroll.
// Incluye animación de "latido" para llamar la atención.
// =============================================================================

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FaWhatsapp } from 'react-icons/fa'

/**
 * Número de teléfono y mensaje predeterminado para WhatsApp
 * Formato internacional: código de país + número sin ceros ni símbolos
 */
const PHONE_NUMBER = '5491112345678'
const DEFAULT_MESSAGE = 'Hola! Quiero hacer una consulta sobre el menú.'

/**
 * Componente WhatsAppButton - Botón flotante de WhatsApp
 * 
 * Abre WhatsApp Web o la app móvil con un mensaje predeterminado
 */
const WhatsAppButton = () => {
  const { t } = useTranslation()

  /**
   * Construye la URL de WhatsApp y abre en una nueva pestaña
   */
  const openWhatsApp = () => {
    const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: 1,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={openWhatsApp}
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-3.5 rounded-full shadow-xl hover:shadow-green-500/30 hover:bg-green-600 transition-all duration-300"
      aria-label={t('whatsapp.ariaLabel')}
    >
      {/* Icono de WhatsApp */}
      <FaWhatsapp size={28} />

      {/* Pequeña notificación de "latido" para llamar la atención */}
      <motion.span
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"
      />
    </motion.button>
  )
}

export default WhatsAppButton
