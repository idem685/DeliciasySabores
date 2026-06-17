// =============================================================================
// Componente: Footer (Pie de Página)
// =============================================================================
// Sección final del sitio con:
// - Logo y descripción del restaurante
// - Enlaces rápidos de navegación
// - Redes sociales (Instagram, Facebook, TikTok)
// - Formulario de suscripción a newsletter (solo Frontend)
// - Selector de idioma
// - Copyright
// =============================================================================

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa'
import { HiHeart, HiGlobe } from 'react-icons/hi'

// Enlaces de redes sociales (perfiles ficticios)
const SOCIAL_LINKS = [
  {
    icon: FaInstagram,
    href: 'https://instagram.com/deliciasysabores',
    label: 'Instagram',
  },
  {
    icon: FaFacebookF,
    href: 'https://facebook.com/deliciasysabores',
    label: 'Facebook',
  },
  {
    icon: FaTiktok,
    href: 'https://tiktok.com/@deliciasysabores',
    label: 'TikTok',
  },
]

// Enlaces rápidos del footer (navegación por anclas)
const QUICK_LINKS = [
  { labelKey: 'nav.inicio', href: '#hero' },
  { labelKey: 'nav.menu', href: '#menu' },
  { labelKey: 'nav.galeria', href: '#gallery' },
  { labelKey: 'nav.galeria', href: '#gallery' },
  { labelKey: 'nav.contacto', href: '#contact' },
]

// Idiomas disponibles
const LANGUAGES = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
  { code: 'pt', label: 'Português' },
]

/**
 * Componente Footer - Pie de página
 */
const Footer = () => {
  const { t, i18n } = useTranslation()
  // Estado del formulario de newsletter
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  /**
   * Maneja el envío del formulario de newsletter (solo frontend)
   */
  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
      // Resetear el mensaje de éxito después de 5 segundos
      setTimeout(() => setSubscribed(false), 5000)
    }
  }

  return (
    <footer className="bg-primary text-cream">
      {/* ======== Sección superior del footer ======== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* ======== Columna 1: Logo y descripción ======== */}
          <div className="lg:col-span-1">
            <h3 className="font-serif text-2xl font-semibold text-cream mb-3">
              Delicias <span className="text-secondary">&</span> Sabores
            </h3>
            <p className="text-cream/60 text-sm leading-relaxed mb-6">
              {t('footer.descripcion')}
            </p>
            {/* Redes sociales */}
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-cream/20 flex items-center justify-center text-cream/60 hover:text-secondary hover:border-secondary transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* ======== Columna 2: Enlaces rápidos ======== */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-cream/80 mb-5">
              {t('footer.enlaces')}
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-cream/50 text-sm hover:text-secondary transition-colors duration-200"
                  >
                    {t(`nav.${link.labelKey}`)}
                  </a>
                </li>
              ))}
            </ul>

            {/* Selector de idioma */}
            <div className="mt-6 space-y-2">
              <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-cream/80">
                <HiGlobe className="inline mr-1" />
                {t('idioma.label')}
              </h4>
              <div className="flex flex-col gap-1.5">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      i18n.changeLanguage(lang.code)
                      localStorage.setItem('delicias_idioma', lang.code)
                    }}
                    className={`text-left text-sm transition-colors ${
                      i18n.language === lang.code
                        ? 'text-secondary'
                        : 'text-cream/50 hover:text-cream'
                    }`}
                  >
                    {lang.code === 'es' ? '🇪🇸' : lang.code === 'en' ? '🇬🇧' : '🇧🇷'} {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Enlace al Admin */}
            <Link
              to="/admin"
              className="text-cream/40 text-xs hover:text-secondary transition-colors mt-6 inline-block"
            >
              🛠️ Admin
            </Link>
          </div>

          {/* ======== Columna 3: Dirección ======== */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-cream/80 mb-5">
              {t('footer.direccion')}
            </h4>
            <address className="not-italic text-cream/50 text-sm leading-relaxed space-y-2">
              <p>Av. Alvear 1234</p>
              <p>CABA, Buenos Aires</p>
              <p>Argentina</p>
              <p className="pt-2">
                <a href="tel:+5491112345678" className="hover:text-secondary transition-colors">
                  +54 11 1234-5678
                </a>
              </p>
            </address>
          </div>

          {/* ======== Columna 4: Newsletter e Idioma ======== */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-cream/80 mb-5">
              {t('footer.newsletter')}
            </h4>
            <p className="text-cream/50 text-sm mb-4">
              {t('footer.newsletterDesc')}
            </p>
            {subscribed ? (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-secondary text-sm"
              >
                {t('footer.newsletterGracias')}
              </motion.p>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  placeholder={t('footer.newsletterPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2.5 bg-primary-light border border-cream/20 text-cream text-sm placeholder-cream/30 focus:outline-none focus:border-secondary transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-secondary text-primary text-sm font-medium hover:bg-secondary-light transition-colors"
                >
                  OK
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ======== Barra inferior con copyright ======== */}
      <div className="border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-cream/40 text-xs">
              &copy; {new Date().getFullYear()} Delicias & Sabores. {t('footer.copyright')}
            </p>
            <p className="text-cream/40 text-xs flex items-center gap-1">
              {t('footer.hecho')} <HiHeart className="text-secondary" /> {t('footer.y')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
