// =============================================================================
// Componente: Contact (Sección de Ubicación y Contacto)
// =============================================================================
// Muestra la información de contacto del restaurante:
// - Mapa interactivo embebido de Google Maps
// - Teléfono con enlace tel:
// - Email con enlace mailto:
// - Horarios de apertura (Lun a Dom)
// - Dirección física
// =============================================================================

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { HiPhone, HiMail, HiLocationMarker, HiClock } from 'react-icons/hi'

/**
 * Componente Contact - Sección de contacto y ubicación
 */
const Contact = () => {
  const { t } = useTranslation()

  // Horarios fijos del restaurante (con keys de traducción para los días)
  const BUSINESS_HOURS = [
    { dayKey: 'days.lunes', hours: '08:00 - 20:00' },
    { dayKey: 'days.martes', hours: '08:00 - 22:00' },
    { dayKey: 'days.miercoles', hours: '08:00 - 22:00' },
    { dayKey: 'days.jueves', hours: '08:00 - 23:00' },
    { dayKey: 'days.viernes', hours: '08:00 - 00:00' },
    { dayKey: 'days.sabado', hours: '09:00 - 00:00' },
    { dayKey: 'days.domingo', hours: '09:00 - 20:00' },
  ]

  // Información de contacto (datos ficticios)
  const CONTACT_INFO = {
    address: 'Av. Alvear 1234, CABA, Buenos Aires, Argentina',
    phone: '+54 11 1234-5678',
    email: 'contacto@deliciasysabores.com',
    // Coordenadas para Google Maps (Buenos Aires)
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.016712504841!2d-58.38375908477046!3d-34.60373888045941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccb3b2f7b7b0b%3A0x6e0f6f7b7b7b7b0b!2sAv.%20Alvear%201234%2C%20CABA%2C%20Argentina!5e0!3m2!1ses!2s!4v1',
  }

  return (
    <section id="contact" className="py-20 md:py-28 bg-white scroll-mt-20 md:scroll-mt-24">
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
            {t('contact.etiqueta')}
          </span>
          <h2 className="section-title mt-3 mb-4">
            {t('contact.titulo')}{' '}
            <span className="text-secondary">{t('contact.tituloSpan')}</span>
          </h2>
          <div className="gold-divider" />
          <p className="section-subtitle">
            {t('contact.subtitulo')}
          </p>
        </motion.div>

        {/* ======== Grid de contenido ======== */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* ======== Columna izquierda: Info de contacto y horarios ======== */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Dirección */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 flex items-center justify-center">
                <HiLocationMarker className="text-secondary text-xl" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold text-primary mb-1">{t('contact.direccion')}</h3>
                <p className="text-text-light text-sm leading-relaxed">{CONTACT_INFO.address}</p>
              </div>
            </div>

            {/* Teléfono */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 flex items-center justify-center">
                <HiPhone className="text-secondary text-xl" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold text-primary mb-1">{t('contact.telefono')}</h3>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="text-text-light text-sm hover:text-secondary transition-colors"
                >
                  {CONTACT_INFO.phone}
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 flex items-center justify-center">
                <HiMail className="text-secondary text-xl" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold text-primary mb-1">{t('contact.email')}</h3>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-text-light text-sm hover:text-secondary transition-colors"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
            </div>

            {/* Horarios */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 flex items-center justify-center">
                <HiClock className="text-secondary text-xl" />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-lg font-semibold text-primary mb-3">{t('contact.horarios')}</h3>
                <div className="space-y-1.5">
                  {BUSINESS_HOURS.map((item) => (
                    <div key={item.dayKey} className="flex justify-between text-sm">
                      <span className="text-text">{t(item.dayKey)}</span>
                      <span className="text-text-light">{item.hours}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-text-lighter mt-3 italic">
                  {t('contact.cocinaUltimo')}
                </p>
              </div>
            </div>
          </motion.div>

          {/* ======== Columna derecha: Mapa interactivo ======== */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-[400px] lg:h-auto min-h-[400px]"
          >
            <iframe
              src={CONTACT_INFO.mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Delicias & Sabores"
              className="grayscale-[0.3] transition-all duration-300 hover:grayscale-0"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
