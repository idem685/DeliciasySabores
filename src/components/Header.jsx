// =============================================================================
// Componente: Header (Encabezado de Navegación)
// =============================================================================
// Barra de navegación principal con:
// - Logo tipográfico a la izquierda
// - Selector de idioma (ES/EN/PT)
// - Menú horizontal en escritorio, hamburguesa en móvil
// - Enlaces ancla con Smooth Scroll a cada sección
// - Botón destacado "Reservar Mesa"
// - Enlace al panel Admin
// =============================================================================

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX, HiGlobe } from 'react-icons/hi'
import { Link } from 'react-router-dom'

// Opciones de navegación con sus IDs de ancla
const NAV_LINKS = [
  { labelKey: 'nav.inicio', href: '#hero' },
  { labelKey: 'nav.menu', href: '#menu' },
  { labelKey: 'nav.galeria', href: '#gallery' },
  { labelKey: 'nav.reservas', href: '#reservas', isReserve: true },
  { labelKey: 'reviews.etiqueta', href: '#reviews' },
  { labelKey: 'nav.contacto', href: '#contact' },
]

// Idiomas disponibles
const LANGUAGES = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
  { code: 'pt', label: 'PT' },
]

/**
 * Componente Header - Barra de navegación responsiva
 * @param {Object} props
 * @param {Function} props.onReserveClick - Función para abrir el modal de reservas
 */
const Header = ({ onReserveClick }) => {
  const { t, i18n } = useTranslation()
  // Estado para el menú móvil
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  // Estado para el scroll
  const [isScrolled, setIsScrolled] = useState(false)

  // Detectar scroll para cambiar el estilo del header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /**
   * Cierra el menú móvil y hace scroll suave a la sección indicada
   */
  const handleNavClick = (href) => {
    setIsMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  /**
   * Maneja el clic en "Reservar Mesa"
   */
  const handleReserveClick = () => {
    setIsMobileMenuOpen(false)
    onReserveClick()
  }

  /**
   * Cambia el idioma de la aplicación
   * @param {string} lang - Código del idioma ('es', 'en', 'pt')
   */
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang)
    localStorage.setItem('delicias_idioma', lang)
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 
        transition-all duration-300 ease-out
        ${isScrolled
          ? 'bg-primary/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
        }
      `}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* ======== Logo tipográfico a la izquierda ======== */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('#hero')
            }}
            className="font-serif text-xl md:text-2xl font-semibold text-cream hover:text-secondary transition-colors"
          >
            Delicias & Sabores
          </a>

          {/* ======== Navegación de escritorio ======== */}
          <div className="hidden md:flex items-center space-x-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  if (link.isReserve) {
                    handleReserveClick()
                  } else {
                    handleNavClick(link.href)
                  }
                }}
                className="text-sm font-medium text-cream/80 hover:text-secondary transition-colors duration-200 uppercase tracking-wider"
              >
                {t(link.labelKey)}
              </a>
            ))}

            {/* Selector de idioma */}
            <div className="flex items-center gap-1 border-l border-cream/20 pl-4 ml-2">
              <HiGlobe className="text-cream/50 text-sm" />
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`text-xs font-medium px-1.5 py-0.5 transition-colors ${
                    i18n.language === lang.code
                      ? 'text-secondary'
                      : 'text-cream/50 hover:text-cream'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Botón destacado "Reservar Mesa" */}
            <button
              onClick={handleReserveClick}
              className="btn-gold text-xs uppercase tracking-widest px-5 py-2.5"
            >
              {t('nav.reservarMesa')}
            </button>
          </div>

          {/* ======== Botón hamburguesa para móvil ======== */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-cream hover:text-secondary transition-colors p-2"
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isMobileMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </nav>

      {/* ======== Menú móvil desplegable ======== */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-primary/98 backdrop-blur-md border-t border-white/10"
          >
            <div className="px-4 py-6 space-y-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    if (link.isReserve) {
                      handleReserveClick()
                    } else {
                      handleNavClick(link.href)
                    }
                  }}
                  className="block text-base font-medium text-cream/80 hover:text-secondary transition-colors uppercase tracking-wider"
                >
                  {t(link.labelKey)}
                </a>
              ))}

              {/* Selector de idioma en móvil */}
              <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                <HiGlobe className="text-cream/50 text-sm" />
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`text-sm font-medium transition-colors ${
                      i18n.language === lang.code
                        ? 'text-secondary'
                        : 'text-cream/50 hover:text-cream'
                    }`}
                  >
                    {t(`idioma.${lang.code}`)}
                  </button>
                ))}
              </div>

              {/* Botón reservar en móvil */}
              <button
                onClick={handleReserveClick}
                className="btn-gold w-full text-center text-xs uppercase tracking-widest py-3 mt-4"
              >
                {t('nav.reservarMesa')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
