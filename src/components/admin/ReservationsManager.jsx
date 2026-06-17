// =============================================================================
// Componente: ReservationsManager
// =============================================================================
// Visor de reservas almacenadas en localStorage.
// Muestra una tabla con todas las reservas registradas y permite filtrarlas.
// =============================================================================

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiCalendar, HiTrash } from 'react-icons/hi'
import { useTranslation } from 'react-i18next'

/**
 * Componente ReservationsManager - Gestor de reservas
 */
const ReservationsManager = () => {
  const { t } = useTranslation()
  // Reservas cargadas desde localStorage
  const [reservations, setReservations] = useState([])

  /**
   * Carga las reservas desde localStorage
   */
  const loadReservations = () => {
    const data = JSON.parse(localStorage.getItem('delicias_reservations') || '[]')
    setReservations(data)
  }

  // Cargar al montar el componente
  useEffect(() => {
    loadReservations()
  }, [])

  /**
   * Elimina una reserva por su ID
   * @param {string} id - ID de la reserva a eliminar
   */
  const deleteReservation = (id) => {
    const updated = reservations.filter((r) => r.id !== id)
    localStorage.setItem('delicias_reservations', JSON.stringify(updated))
    setReservations(updated)
  }

  /**
   * Formatea una fecha ISO a formato legible
   * @param {string} dateStr - Fecha en formato ISO
   * @returns {string} Fecha formateada
   */
  const formatDate = (dateStr) => {
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div>
      {/* Estado vacío */}
      {reservations.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <HiCalendar className="text-4xl text-text-lighter mx-auto mb-4" />
          <p className="text-text-light">{t('admin.sinReservas')}</p>
        </motion.div>
      ) : (
        /* ======== Tabla de reservas ======== */
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-primary/10">
                <th className="text-left py-3 px-4 text-text-light font-medium uppercase tracking-wider text-xs">Fecha</th>
                <th className="text-left py-3 px-4 text-text-light font-medium uppercase tracking-wider text-xs">Hora</th>
                <th className="text-left py-3 px-4 text-text-light font-medium uppercase tracking-wider text-xs">{t('reservations.nombre')}</th>
                <th className="text-left py-3 px-4 text-text-light font-medium uppercase tracking-wider text-xs">{t('reservations.comensales')}</th>
                <th className="text-left py-3 px-4 text-text-light font-medium uppercase tracking-wider text-xs">{t('reservations.telefono')}</th>
                <th className="text-left py-3 px-4 text-text-light font-medium uppercase tracking-wider text-xs">{t('reservations.email')}</th>
                <th className="text-left py-3 px-4 text-text-light font-medium uppercase tracking-wider text-xs">Notas</th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((res) => (
                <tr key={res.id} className="border-b border-primary/5 hover:bg-white/50 transition-colors">
                  <td className="py-3 px-4 text-primary">{formatDate(res.date)}</td>
                  <td className="py-3 px-4 text-text-light">{res.time} hs</td>
                  <td className="py-3 px-4 text-primary font-medium">{res.name}</td>
                  <td className="py-3 px-4 text-text-light">{res.guests} {t('admin.comensales')}</td>
                  <td className="py-3 px-4 text-text-light">{res.phone}</td>
                  <td className="py-3 px-4 text-text-light">{res.email}</td>
                  <td className="py-3 px-4 text-text-lighter text-xs max-w-[150px] truncate">
                    {res.notes || '—'}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => deleteReservation(res.id)}
                      className="text-text-lighter hover:text-red-500 transition-colors"
                      title="Eliminar reserva"
                    >
                      <HiTrash size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="text-text-lighter text-xs mt-4">
            Total: {reservations.length} reserva{reservations.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  )
}

export default ReservationsManager
