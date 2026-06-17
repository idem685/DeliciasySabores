// =============================================================================
// Componente Principal de la Aplicación
// =============================================================================
// Aquí ensamblamos todos los componentes de la landing page.
// Usamos Framer Motion para animar la entrada de cada sección.
// =============================================================================

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'

// Importar páginas y componentes globales
import Home from './pages/Home'
import Header from './components/Header'
import Reservations from './components/Reservations'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import Toast from './components/Toast'

function App() {
  // =============================================================================
  // Estado global de la aplicación
  // =============================================================================

  // Controla si el modal de reservas está abierto
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false)

  // Controla el toast de notificaciones
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' })

  // =============================================================================
  // Funciones de utilidad global
  // =============================================================================

  /**
   * Abre el modal de reservas (llamado desde cualquier parte de la app)
   */
  const openReservationModal = useCallback(() => {
    setIsReservationModalOpen(true)
    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden'
  }, [])

  /**
   * Cierra el modal de reservas
   */
  const closeReservationModal = useCallback(() => {
    setIsReservationModalOpen(false)
    document.body.style.overflow = 'auto'
  }, [])

  /**
   * Muestra un toast de notificación
   * @param {string} message - Mensaje a mostrar
   * @param {'success' | 'error'} type - Tipo de toast
   */
  const showToast = useCallback((message, type = 'success') => {
    setToast({ visible: true, message, type })
    // Auto-ocultar después de 5 segundos
    setTimeout(() => {
      setToast({ visible: false, message: '', type: 'success' })
    }, 5000)
  }, [])

  /**
   * Cierra el toast manualmente
   */
  const closeToast = useCallback(() => {
    setToast({ visible: false, message: '', type: 'success' })
  }, [])

  // Limpiar el overflow del body al desmontar
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <div className="min-h-screen bg-cream">
      {/* =========================================================================
          Header - Navegación principal (siempre visible)
          ========================================================================= */}
      <Header onReserveClick={openReservationModal} />

      {/* =========================================================================
          Página principal (contiene Hero, About, Menu, Gallery, Reviews, Contact)
          ========================================================================= */}
      <main>
        <Home onReserveClick={openReservationModal} />
      </main>

      {/* =========================================================================
          Footer
          ========================================================================= */}
      <Footer />

      {/* =========================================================================
          Botón flotante de WhatsApp (fijo en la esquina inferior derecha)
          ========================================================================= */}
      <WhatsAppButton />

      {/* =========================================================================
          Modal de Reservas (se superpone a todo el contenido)
          ========================================================================= */}
      <AnimatePresence>
        {isReservationModalOpen && (
          <Reservations
            onClose={closeReservationModal}
            onShowToast={showToast}
          />
        )}
      </AnimatePresence>

      {/* =========================================================================
          Toast de notificaciones
          ========================================================================= */}
      <AnimatePresence>
        {toast.visible && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={closeToast}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
