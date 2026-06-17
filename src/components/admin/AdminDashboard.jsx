// =============================================================================
// Componente: AdminDashboard
// =============================================================================
// Panel principal de administración con dos secciones:
// 1. Gestión del Menú (CRUD de ítems)
// 2. Gestión de Reservas (visor de reservas desde localStorage)
// =============================================================================

import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiMenu, HiCalendar, HiArrowLeft } from 'react-icons/hi'
import { useTranslation } from 'react-i18next'
import MenuEditor from './MenuEditor'
import ReservationsManager from './ReservationsManager'

/**
 * Componente AdminDashboard - Panel de administración
 */
const AdminDashboard = () => {
  const { t } = useTranslation()
  // Tab activa: 'menu' o 'reservas'
  const [activeTab, setActiveTab] = useState('menu')

  return (
    <div className="space-y-6">
      {/* ======== Tabs de navegación ======== */}
      <div className="flex border-b border-primary/10">
        <button
          onClick={() => setActiveTab('menu')}
          className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors border-b-2 ${
            activeTab === 'menu'
              ? 'border-secondary text-primary'
              : 'border-transparent text-text-lighter hover:text-text hover:border-text-lighter/30'
          }`}
        >
          <HiMenu />
          {t('admin.menu')}
        </button>
        <button
          onClick={() => setActiveTab('reservas')}
          className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors border-b-2 ${
            activeTab === 'reservas'
              ? 'border-secondary text-primary'
              : 'border-transparent text-text-lighter hover:text-text hover:border-text-lighter/30'
          }`}
        >
          <HiCalendar />
          {t('admin.reservas')}
        </button>
      </div>

      {/* ======== Contenido según tab activa ======== */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === 'menu' ? <MenuEditor /> : <ReservationsManager />}
      </motion.div>
    </div>
  )
}

export default AdminDashboard
