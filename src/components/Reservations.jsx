// =============================================================================
// Componente: Reservations (Modal de Reservas)
// =============================================================================
// Modal a pantalla completa con el formulario de reservas.
// Utiliza React Hook Form para la validación del frontend.
// Los datos se guardan en localStorage del navegador en lugar de
// enviarse a un backend. Ideal para sitios estáticos en Vercel.
// Incluye:
// - Campos: Fecha, Hora, Comensales, Nombre, Teléfono, Email
// - Select de horas con intervalos de 30 minutos
// - Validación en frontend con React Hook Form
// - Guardado en localStorage con feedback visual
// - Animaciones de apertura/cierre con Framer Motion
// =============================================================================

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { HiX } from 'react-icons/hi'

/**
 * Genera los horarios disponibles en intervalos de 30 minutos
 * @returns {Array<string>} Array de horas en formato HH:MM
 */
const generateTimeSlots = () => {
  const slots = []
  // Horario del restaurante: 12:00 a 23:30
  for (let hour = 12; hour <= 23; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      slots.push(time)
    }
  }
  return slots
}

// Array de horarios generado una sola vez (memorizado)
const TIME_SLOTS = generateTimeSlots()

/**
 * Componente Reservations - Modal de formulario de reservas
 *
 * @param {Object} props
 * @param {Function} props.onClose - Función para cerrar el modal
 * @param {Function} props.onShowToast - Función para mostrar notificaciones
 */
const Reservations = ({ onClose, onShowToast }) => {
  const { t } = useTranslation()
  // Estado para controlar el envío y la confirmación
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // =============================================================================
  // Configuración de React Hook Form
  // =============================================================================
  const {
    register,        // Registra inputs para validación
    handleSubmit,    // Envuelve el submit handler
    watch,           // Observa cambios en campos
    setValue,        // Establece valor programáticamente
    formState: { errors }, // Estado de errores de validación
  } = useForm({
    defaultValues: {
      date: '',
      time: '',
      guests: 2,
      name: '',
      phone: '',
      email: '',
      notes: '',
    },
  })

  // Observar el valor de guests para el contador visual
  const guests = watch('guests', 2)

  // Obtener la fecha de hoy en formato YYYY-MM-DD para el min del date picker
  const today = new Date().toISOString().split('T')[0]

  /**
   * Guarda la reserva en localStorage y muestra confirmación
   * @param {Object} data - Datos del formulario ya validados
   */
  const onSubmit = async (data) => {
    setSubmitting(true)

    // Simular un pequeño retardo para mejor experiencia de usuario
    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      // Obtener reservas existentes de localStorage
      const existingReservations = JSON.parse(
        localStorage.getItem('delicias_reservations') || '[]'
      )

      // Crear nueva reserva con ID y timestamp
      const newReservation = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2),
        ...data,
        guests: parseInt(data.guests),
        createdAt: new Date().toISOString(),
      }

      // Guardar en localStorage
      localStorage.setItem(
        'delicias_reservations',
        JSON.stringify([...existingReservations, newReservation])
      )

      setSubmitted(true)
      onShowToast(t('reservations.confirmadoMsg'), 'success')
    } catch (error) {
      onShowToast(
        '❌ Error al procesar la reserva. Intenta nuevamente.',
        'error'
      )
    } finally {
      setSubmitting(false)
    }
  }

  /**
   * Cierra el modal
   */
  const handleClose = () => {
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[150] bg-primary/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-cream w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* ======== Encabezado del modal ======== */}
        <div className="bg-primary px-6 py-5 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl text-cream font-semibold">{t('reservations.titulo')}</h2>
            <p className="text-cream/60 text-xs mt-1">{t('reservations.subtitulo')}</p>
          </div>
          <button
            onClick={handleClose}
            className="text-cream/60 hover:text-cream transition-colors"
          >
            <HiX size={24} />
          </button>
        </div>

        {/* ======== Confirmación de éxito ======== */}
        {submitted ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">✅</span>
            </div>
            <h3 className="font-serif text-2xl text-primary mb-2">{t('reservations.confirmado')}</h3>
            <p className="text-text-light text-sm mb-6">
              {t('reservations.confirmadoMsg')}
            </p>
            <button onClick={handleClose} className="btn-gold">
              {t('reservations.cerrar')}
            </button>
          </div>
        ) : (
          /* ======== Formulario con React Hook Form ======== */
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
            {/* ======== Fila: Fecha y Hora ======== */}
            <div className="grid grid-cols-2 gap-4">
              {/* Fecha */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-text-light font-medium mb-1.5">
                  {t('reservations.fecha')}
                </label>
                <input
                  type="date"
                  min={today}
                  className={`input-elegant ${errors.date ? 'border-red-400' : ''}`}
                  {...register('date', {
                    required: t('reservations.requiredFecha'),
                    validate: (value) =>
                      new Date(value) >= new Date(new Date().toDateString()) ||
                      t('reservations.fechaFutura'),
                  })}
                />
                {errors.date && (
                  <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
                )}
              </div>

              {/* Hora */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-text-light font-medium mb-1.5">
                  {t('reservations.hora')}
                </label>
                <select
                  className={`input-elegant ${errors.time ? 'border-red-400' : ''}`}
                  {...register('time', { required: t('reservations.requiredHora') })}
                >
                  <option value="">{t('reservations.seleccionarHora')}</option>
                  {TIME_SLOTS.map((time) => (
                    <option key={time} value={time}>
                      {time} hs
                    </option>
                  ))}
                </select>
                {errors.time && (
                  <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>
                )}
              </div>
            </div>

            {/* ======== Comensales ======== */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-text-light font-medium mb-1.5">
                {t('reservations.comensales')}
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setValue('guests', Math.max(1, guests - 1), { shouldValidate: true })}
                  className="w-10 h-10 border border-primary/20 flex items-center justify-center hover:bg-primary/5 transition-colors text-lg"
                >
                  −
                </button>
                <span className="text-lg font-semibold text-primary w-8 text-center">
                  {guests}
                </span>
                <button
                  type="button"
                  onClick={() => setValue('guests', Math.min(12, guests + 1), { shouldValidate: true })}
                  className="w-10 h-10 border border-primary/20 flex items-center justify-center hover:bg-primary/5 transition-colors text-lg"
                >
                  +
                </button>
                <span className="text-xs text-text-light ml-2">
                  {guests === 1 ? t('reservations.persona') : t('reservations.personas')}
                </span>
              </div>
              {/* El input oculto registrado con react-hook-form para validación */}
              <input type="hidden" {...register('guests', {
                required: t('reservations.requiredComensales'),
                min: { value: 1, message: t('reservations.minComensales') },
                max: { value: 12, message: t('reservations.maxComensales') },
              })} />
              {errors.guests && (
                <p className="text-red-500 text-xs mt-1">{errors.guests.message}</p>
              )}
            </div>

            {/* ======== Nombre ======== */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-text-light font-medium mb-1.5">
                {t('reservations.nombre')}
              </label>
              <input
                type="text"
                placeholder={t('reservations.nombrePlaceholder')}
                className={`input-elegant ${errors.name ? 'border-red-400' : ''}`}
                {...register('name', {
                  required: t('reservations.requiredNombre'),
                  minLength: { value: 2, message: t('reservations.minNombre') },
                  maxLength: { value: 80, message: t('reservations.maxNombre') },
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* ======== Teléfono ======== */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-text-light font-medium mb-1.5">
                {t('reservations.telefono')}
              </label>
              <input
                type="tel"
                placeholder={t('reservations.telefonoPlaceholder')}
                className={`input-elegant ${errors.phone ? 'border-red-400' : ''}`}
                {...register('phone', {
                  required: t('reservations.requiredTelefono'),
                  pattern: {
                    value: /^[\d\s\-+()]{7,20}$/,
                    message: t('reservations.patternTelefono'),
                  },
                })}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
              )}
            </div>

            {/* ======== Email ======== */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-text-light font-medium mb-1.5">
                {t('reservations.email')}
              </label>
              <input
                type="email"
                placeholder={t('reservations.emailPlaceholder')}
                className={`input-elegant ${errors.email ? 'border-red-400' : ''}`}
                {...register('email', {
                  required: t('reservations.requiredEmail'),
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: t('reservations.patternEmail'),
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* ======== Notas (opcional) ======== */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-text-light font-medium mb-1.5">
                {t('reservations.notas')} <span className="text-text-lighter lowercase">({t('reservations.opcional')})</span>
              </label>
              <textarea
                rows={2}
                placeholder={t('reservations.notasPlaceholder')}
                className="input-elegant resize-none"
                {...register('notes', {
                  maxLength: { value: 500, message: t('reservations.maxNotas') },
                })}
              />
              {errors.notes && (
                <p className="text-red-500 text-xs mt-1">{errors.notes.message}</p>
              )}
            </div>

            {/* ======== Botón de envío ======== */}
            <button
              type="submit"
              disabled={submitting}
              className={`btn-gold w-full py-3.5 text-sm uppercase tracking-widest ${
                submitting ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  {t('reservations.procesando')}
                </span>
              ) : (
                t('reservations.confirmar')
              )}
            </button>

            <p className="text-xs text-text-lighter text-center">
              {t('reservations.terminos')}
            </p>
          </form>
        )}
      </motion.div>
    </motion.div>
  )
}

export default Reservations
