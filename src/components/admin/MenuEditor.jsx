// =============================================================================
// Componente: MenuEditor
// =============================================================================
// Editor visual del menú del restaurante.
// Permite:
// - Editar ítems existentes (nombre, descripción, precio, tags, imagen)
// - Agregar nuevos ítems
// - Eliminar ítems
// - Exportar el menú como archivo JSON
// - Los cambios se guardan en localStorage y se muestran en vivo
// =============================================================================

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiPencil, HiTrash, HiPlus, HiDownload, HiX } from 'react-icons/hi'
import { useTranslation } from 'react-i18next'
import { getLocalizedValue } from '../../hooks/useLocalizedValue'

// Importar datos iniciales del menú
import initialMenuData from '../../data/menu.json'

// Categorías disponibles
const CATEGORIES = [
  { id: 'entradas', label: 'Entradas', emoji: '🥗' },
  { id: 'principales', label: 'Principales', emoji: '🍖' },
  { id: 'postres', label: 'Postres', emoji: '🍰' },
  { id: 'bebidas', label: 'Bebidas', emoji: '🍸' },
]

// Etiquetas disponibles
const ALL_TAGS = ['vegetariano', 'vegano', 'sin-tacc', 'recomendado']

// Idiomas disponibles para la edición
const EDIT_LANGUAGES = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
  { code: 'pt', label: 'PT' },
]

// Estado inicial de un nuevo ítem (con campos multidioma vacíos)
const EMPTY_ITEM = {
  name: { es: '', en: '', pt: '' },
  description: { es: '', en: '', pt: '' },
  price: '',
  image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600',
  tags: [],
  featured: false,
}

/**
 * Componente MenuEditor - Editor del menú
 */
const MenuEditor = () => {
  const { t, i18n } = useTranslation()

  // Estado del menú (inicia con datos del JSON + localStorage si existe)
  const [menu, setMenu] = useState(() => {
    const saved = localStorage.getItem('delicias_menu')
    return saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(initialMenuData))
  })

  // Categoría activa en el editor
  const [activeCategory, setActiveCategory] = useState('entradas')

  // Ítem seleccionado para editar (null = nuevo ítem)
  const [editingItem, setEditingItem] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  // Idioma activo en el formulario de edición
  const [editLang, setEditLang] = useState('es')
  // Método de carga de imagen ('url' o 'file')
  const [uploadMode, setUploadMode] = useState('url')

  /**
   * Guarda el menú en localStorage
   * @param {Object} updatedMenu - Menú actualizado
   */
  const saveMenu = (updatedMenu) => {
    setMenu(updatedMenu)
    localStorage.setItem('delicias_menu', JSON.stringify(updatedMenu))
  }

  /**
   * Abre el formulario para editar un ítem existente
   * Convierte el nombre/descripción a objeto multidioma si es string plano
   * @param {Object} item - Ítem a editar
   */
  const openEditForm = (item) => {
    const normalized = { ...item }
    // Si name es string plano (formato legacy), lo convertimos a objeto multidioma
    if (typeof normalized.name === 'string') {
      normalized.name = { es: normalized.name, en: normalized.name, pt: normalized.name }
    }
    if (typeof normalized.description === 'string') {
      normalized.description = { es: normalized.description, en: normalized.description, pt: normalized.description }
    }
    // Detectar si la imagen es base64 para mostrar la solapa correcta
    setUploadMode(typeof item.image === 'string' && item.image.startsWith('data:') ? 'file' : 'url')
    setEditingItem(normalized)
    setIsFormOpen(true)
    setEditLang('es')
  }

  /**
   * Abre el formulario para agregar un nuevo ítem
   */
  const openNewForm = () => {
    setEditingItem({ ...EMPTY_ITEM, id: `new-${Date.now()}` })
    setUploadMode('url')
    setIsFormOpen(true)
  }

  /**
   * Guarda los cambios de un ítem (nuevo o editado)
   */
  const saveItem = () => {
    const updatedMenu = { ...menu }
    const items = [...updatedMenu[activeCategory]]
    const index = items.findIndex((i) => i.id === editingItem.id)

    if (index >= 0) {
      // Actualizar ítem existente
      items[index] = { ...editingItem, price: parseFloat(editingItem.price) }
    } else {
      // Agregar nuevo ítem
      items.push({
        ...editingItem,
        price: parseFloat(editingItem.price),
        id: `item-${Date.now()}`,
      })
    }

    updatedMenu[activeCategory] = items
    saveMenu(updatedMenu)
    setIsFormOpen(false)
    setEditingItem(null)
  }

  /**
   * Elimina un ítem del menú
   * @param {string} itemId - ID del ítem a eliminar
   */
  const deleteItem = (itemId) => {
    const updatedMenu = { ...menu }
    updatedMenu[activeCategory] = updatedMenu[activeCategory].filter(
      (i) => i.id !== itemId
    )
    saveMenu(updatedMenu)
  }

  /**
   * Alterna una etiqueta en el ítem que se está editando
   * @param {string} tag - Etiqueta a alternar
   */
  const toggleTag = (tag) => {
    setEditingItem((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }))
  }

  /**
   * Exporta el menú como archivo JSON descargable
   */
  const exportMenu = () => {
    const blob = new Blob([JSON.stringify(menu, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'menu.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const currentItems = menu[activeCategory] || []

  return (
    <div>
      {/* ======== Barra de acciones ======== */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-medium transition-all border ${
                activeCategory === cat.id
                  ? 'bg-primary text-cream border-primary'
                  : 'bg-white text-text border-primary/10 hover:border-primary/30'
              }`}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={openNewForm} className="btn-gold text-xs px-3 py-2 flex items-center gap-1">
            <HiPlus /> {t('admin.agregar')}
          </button>
          <button onClick={exportMenu} className="btn-primary text-xs px-3 py-2 flex items-center gap-1">
            <HiDownload /> {t('admin.exportar')}
          </button>
        </div>
      </div>

      {/* ======== Grid de ítems actuales ======== */}
      <div className="grid sm:grid-cols-2 gap-4">
        {currentItems.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-primary/10 p-4 flex gap-4 group"
          >
            <img
              src={item.image}
              alt={getLocalizedValue(item.name, i18n.language)}
              className="w-16 h-16 object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-medium text-sm text-primary truncate">{getLocalizedValue(item.name, i18n.language)}</h3>
                <span className="text-secondary font-semibold text-sm whitespace-nowrap">
                  ${item.price?.toLocaleString()}
                </span>
              </div>
              <p className="text-text-light text-xs mt-0.5 line-clamp-1">{getLocalizedValue(item.description, i18n.language)}</p>
              {item.tags?.length > 0 && (
                <div className="flex gap-1 mt-1">
                  {item.tags.map((tag) => (
                    <span key={tag} className="text-[9px] uppercase tracking-wider bg-gray-100 px-1.5 py-0.5">
                      {t(`tags.${tag}`)}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => openEditForm(item)} className="text-text-lighter hover:text-secondary p-1">
                <HiPencil size={14} />
              </button>
              <button onClick={() => deleteItem(item.id)} className="text-text-lighter hover:text-red-500 p-1">
                <HiTrash size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ======== Modal de edición ======== */}
      <AnimatePresence>
        {isFormOpen && editingItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-primary/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsFormOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-cream w-full max-w-lg max-h-[90vh] overflow-y-auto p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-lg text-primary font-semibold">
                  {currentItems.find((i) => i.id === editingItem.id) ? t('admin.editar') : t('admin.agregar')}
                </h3>
                <button onClick={() => setIsFormOpen(false)} className="text-text-lighter hover:text-primary">
                  <HiX size={20} />
                </button>
              </div>

              {/* ======== Tabs de idioma ======== */}
              <div className="flex gap-1 mb-4 border-b border-primary/10 pb-2">
                {EDIT_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setEditLang(lang.code)}
                    className={`px-3 py-1 text-xs font-medium transition-colors ${
                      editLang === lang.code
                        ? 'text-secondary border-b-2 border-secondary'
                        : 'text-text-lighter hover:text-text'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {/* Nombre (en el idioma seleccionado) */}
                <div>
                  <label className="block text-xs uppercase text-text-light font-medium mb-1">
                    Nombre {editLang.toUpperCase()}
                  </label>
                  <input
                    type="text"
                    value={editingItem.name?.[editLang] || ''}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        name: { ...editingItem.name, [editLang]: e.target.value },
                      })
                    }
                    className="input-elegant"
                    placeholder={`Nombre en ${editLang.toUpperCase()}`}
                  />
                </div>

                {/* Descripción (en el idioma seleccionado) */}
                <div>
                  <label className="block text-xs uppercase text-text-light font-medium mb-1">
                    Descripción {editLang.toUpperCase()}
                  </label>
                  <textarea
                    value={editingItem.description?.[editLang] || ''}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        description: { ...editingItem.description, [editLang]: e.target.value },
                      })
                    }
                    className="input-elegant resize-none"
                    rows={2}
                    placeholder={`Descripción en ${editLang.toUpperCase()}`}
                  />
                </div>

                {/* Precio */}
                <div>
                  <label className="block text-xs uppercase text-text-light font-medium mb-1">Precio ($)</label>
                  <input
                    type="number"
                    value={editingItem.price}
                    onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                    className="input-elegant"
                    placeholder="5800"
                    min="0"
                  />
                </div>

                {/* Imagen: URL o subida desde dispositivo */}
                <div>
                  <label className="block text-xs uppercase text-text-light font-medium mb-1">Imagen</label>

                  {/* Tabs para elegir método */}
                  <div className="flex gap-1 mb-2">
                    <label
                      className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs border cursor-pointer transition-colors ${
                        uploadMode === 'file'
                          ? 'bg-secondary/10 border-secondary text-secondary-dark'
                          : 'bg-white border-primary/10 text-text-light hover:border-primary/30'
                      }`}
                    >
                      <input
                        type="radio"
                        name="imageMode"
                        checked={uploadMode === 'file'}
                        onChange={() => setUploadMode('file')}
                        className="hidden"
                      />
                      📁 Subir archivo
                    </label>
                    <label
                      className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs border cursor-pointer transition-colors ${
                        uploadMode === 'url'
                          ? 'bg-secondary/10 border-secondary text-secondary-dark'
                          : 'bg-white border-primary/10 text-text-light hover:border-primary/30'
                      }`}
                    >
                      <input
                        type="radio"
                        name="imageMode"
                        checked={uploadMode === 'url'}
                        onChange={() => setUploadMode('url')}
                        className="hidden"
                      />
                      🔗 URL
                    </label>
                  </div>

                  {uploadMode === 'file' ? (
                    <div>
                      <label className="flex items-center justify-center w-full border-2 border-dashed border-primary/20 hover:border-secondary/40 transition-colors cursor-pointer py-6 px-4 bg-white">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (!file) return
                            if (file.size > 5 * 1024 * 1024) {
                              alert('La imagen no debe superar los 5 MB')
                              return
                            }
                            const reader = new FileReader()
                            reader.onload = (ev) => {
                              setEditingItem((prev) => ({
                                ...prev,
                                image: ev.target?.result,
                              }))
                            }
                            reader.readAsDataURL(file)
                          }}
                        />
                        <div className="text-center">
                          <span className="text-2xl block mb-2">📸</span>
                          <span className="text-xs text-text-light">
                            {t('admin.subirImagen') || 'Toca o arrastra una foto aquí'}
                          </span>
                          <span className="text-[10px] text-text-lighter block mt-1">
                            PNG, JPG, WebP — Máx 5 MB
                          </span>
                        </div>
                      </label>
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={editingItem.image?.startsWith('data:') ? '' : editingItem.image}
                      onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                      className="input-elegant"
                      placeholder="https://ejemplo.com/imagen.jpg"
                    />
                  )}

                  {/* Preview */}
                  {editingItem.image && (
                    <div className="relative mt-2 w-20 h-20 group">
                      <img
                        src={editingItem.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none'
                        }}
                      />
                      <button
                        onClick={() => { setEditingItem({ ...editingItem, image: '' }); setUploadMode('url'); }}
                        className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <HiX size={14} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Etiquetas */}
                <div>
                  <label className="block text-xs uppercase text-text-light font-medium mb-2">Etiquetas</label>
                  <div className="flex flex-wrap gap-2">
                    {ALL_TAGS.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1.5 text-xs border transition-colors ${
                          editingItem.tags.includes(tag)
                            ? 'bg-secondary/10 border-secondary text-secondary-dark'
                            : 'bg-white border-primary/10 text-text-light hover:border-primary/30'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Destacado */}
                {/* Preview de cómo se ve en los otros idiomas */}
                <div className="bg-gray-50 border border-primary/5 p-3 space-y-1">
                  <p className="text-[10px] uppercase tracking-wider text-text-lighter font-medium">Vista previa</p>
                  {EDIT_LANGUAGES.filter(l => l.code !== editLang).map((lang) => (
                    <p key={lang.code} className="text-xs text-text-light">
                      <span className="font-medium text-text">{lang.label}:</span>{' '}
                      {getLocalizedValue(editingItem.name, lang.code) || '—'}
                    </p>
                  ))}
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingItem.featured}
                    onChange={(e) => setEditingItem({ ...editingItem, featured: e.target.checked })}
                    className="w-4 h-4 accent-secondary"
                  />
                  <span className="text-sm text-text-light">Recomendado del Chef</span>
                </label>

                {/* Botones */}
                <div className="flex gap-3 pt-4">
                  <button onClick={() => setIsFormOpen(false)} className="btn-primary flex-1 text-xs py-3">
                    {t('admin.cancelar')}
                  </button>
                  <button
                    onClick={saveItem}
                    disabled={!(editingItem.name?.es || editingItem.name?.en || editingItem.name?.pt) || !editingItem.price}
                    className="btn-gold flex-1 text-xs py-3 disabled:opacity-50"
                  >
                    {t('admin.guardar')}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MenuEditor
