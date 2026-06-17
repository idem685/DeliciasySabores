// =============================================================================
// Componente: Toast (Notificación Emergente)
// =============================================================================
// Muestra mensajes de notificación temporales en la esquina superior derecha.
// Se usa para confirmar acciones exitosas o mostrar errores.
// =============================================================================

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { HiCheckCircle, HiXCircle, HiX } from 'react-icons/hi'

/**
 * Componente Toast - Notificación emergente animada
 *
 * @param {Object} props
 * @param {string} props.message - Mensaje a mostrar
 * @param {'success' | 'error'} props.type - Tipo de notificación
 * @param {Function} props.onClose - Función para cerrar el toast
 */
const Toast = ({ message, type = 'success', onClose }) => {
  const { t } = useTranslation()
  const isSuccess = type === 'success'

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, y: -20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: 100, y: -20 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className={`
        fixed top-24 right-4 z-[200] max-w-md w-full
        flex items-start gap-3 p-4 rounded-none shadow-2xl
        ${isSuccess ? 'bg-white border-l-4 border-green-500' : 'bg-white border-l-4 border-red-500'}
      `}
    >
      {/* Icono de estado */}
      <div className="flex-shrink-0 mt-0.5">
        {isSuccess ? (
          <HiCheckCircle className="text-green-500 text-xl" />
        ) : (
          <HiXCircle className="text-red-500 text-xl" />
        )}
      </div>

      {/* Mensaje */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-primary font-medium">
          {isSuccess ? t('toast.successTitle') : t('toast.errorTitle')}
        </p>
        <p className="text-xs text-text-light mt-0.5">{message}</p>
      </div>

      {/* Botón de cierre */}
      <button
        onClick={onClose}
        className="flex-shrink-0 text-text-lighter hover:text-primary transition-colors"
      >
        <HiX size={18} />
      </button>
    </motion.div>
  )
}

export default Toast
