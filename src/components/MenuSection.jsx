// =============================================================================
// Componente: MenuSection (Sección del Menú Digital)
// =============================================================================
// Muestra el menú del restaurante desde el archivo JSON local en /data/menu.json.
// Incluye:
// - Categorías dinámicas con tabs (Entradas, Principales, Postres, Bebidas)
// - Cards elegantes con borde dorado para cada ítem
// - Etiquetas visuales (Vegetariano, Vegano, Sin TACC, Recomendado)
// - Estados de carga, error y datos vacíos
// =============================================================================

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { HiOutlineClock, HiOutlineEmojiHappy } from 'react-icons/hi'
import { useMenu } from '../hooks/useMenu'
import { getLocalizedValue } from '../hooks/useLocalizedValue'

// Configuración de categorías con sus keys de traducción y emojis
const CATEGORIES = [
  { id: 'entradas', labelKey: 'menu.categorias.entradas', emoji: '🥗' },
  { id: 'principales', labelKey: 'menu.categorias.principales', emoji: '🍖' },
  { id: 'postres', labelKey: 'menu.categorias.postres', emoji: '🍰' },
  { id: 'bebidas', labelKey: 'menu.categorias.bebidas', emoji: '🍸' },
]

// Mapa de colores para cada tipo de etiqueta
const TAG_STYLES = {
  vegetariano: 'bg-green-50 text-green-700 border-green-200',
  vegano: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'sin-tacc': 'bg-amber-50 text-amber-700 border-amber-200',
  recomendado: 'bg-secondary/10 text-secondary-dark border-secondary/30',
}

/**
 * Componente MenuSection - Menú digital del restaurante
 */
const MenuSection = () => {
  const { t, i18n } = useTranslation()
  const { menu, loading, error } = useMenu()
  // Categoría activa (seleccionada por el usuario)
  const [activeCategory, setActiveCategory] = useState('entradas')

  // Obtener los ítems de la categoría activa
  const activeItems = menu?.[activeCategory] || []

  return (
    <section id="menu" className="py-20 md:py-28 bg-white">
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
            {t('menu.etiqueta')}
          </span>
          <h2 className="section-title mt-3 mb-4">
            {t('menu.titulo')}{' '}
            <span className="text-secondary">{t('menu.tituloSpan')}</span>
          </h2>
          <div className="gold-divider" />
          <p className="section-subtitle">
            {t('menu.subtitulo')}
          </p>
        </motion.div>

        {/* ======== Tabs de categorías ======== */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`
                px-5 py-3 text-sm font-medium transition-all duration-300
                border-b-2 
                ${activeCategory === cat.id
                  ? 'border-secondary text-primary'
                  : 'border-transparent text-text-lighter hover:text-text hover:border-text-lighter/30'
                }
              `}
            >
              <span className="mr-2">{cat.emoji}</span>
              {t(cat.labelKey)}
            </button>
          ))}
        </div>

        {/* ======== Contenido: Estado de carga, error o menú ======== */}

        {/* Estado de carga */}
        {loading && (
          <div className="text-center py-16">
            <div className="inline-block w-8 h-8 border-2 border-secondary border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-text-light">{t('menu.cargando')}</p>
          </div>
        )}

        {/* Estado de error */}
        {error && !loading && (
          <div className="text-center py-16">
            <HiOutlineEmojiHappy className="text-4xl text-text-lighter mx-auto mb-4" />
            <p className="text-text-light mb-4">{t('menu.error')}</p>
            <button onClick={() => window.location.reload()} className="btn-gold text-xs uppercase tracking-wider">
              {t('menu.reintentar')}
            </button>
          </div>
        )}

        {/* Estado vacío */}
        {!loading && !error && activeItems.length === 0 && (
          <div className="text-center py-16">
            <HiOutlineClock className="text-4xl text-text-lighter mx-auto mb-4" />
            <p className="text-text-light">{t('menu.vacio')}</p>
          </div>
        )}

        {/* ======== Grid de ítems del menú ======== */}
        {!loading && !error && activeItems.length > 0 && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6"
            >
              {activeItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="menu-card flex gap-5"
                >
                  {/* Imagen del plato */}
                  <div className="w-24 h-24 flex-shrink-0 overflow-hidden">
                    <img
                      src={item.image}
                      alt={getLocalizedValue(item.name, i18n.language)}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Información del plato */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif text-lg font-semibold text-primary truncate">
                        {getLocalizedValue(item.name, i18n.language)}
                      </h3>
                      <span className="text-secondary font-semibold text-lg whitespace-nowrap">
                        ${item.price.toLocaleString()}
                      </span>
                    </div>

                    <p className="text-text-light text-sm mt-1 line-clamp-2">
                      {getLocalizedValue(item.description, i18n.language)}
                    </p>

                    {/* Etiquetas */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`
                              inline-block px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider
                              border rounded
                              ${TAG_STYLES[tag] || 'bg-gray-100 text-gray-600 border-gray-200'}
                            `}
                          >
                            {t(`tags.${tag}`)}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  )
}

export default MenuSection
