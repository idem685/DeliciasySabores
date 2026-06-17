// =============================================================================
// Hook personalizado: useMenu
// =============================================================================
// Lee los datos del menú priorizando:
// 1. localStorage ('delicias_menu') - donde el Admin guarda los cambios
// 2. JSON estático en /data/menu.json - como fallback
//
// Esto permite que las modificaciones realizadas en el panel Admin se
// reflejen en vivo en el sitio. Para persistir los cambios, usar la
// función de exportación del Admin y actualizar menu.json.
// =============================================================================

import { useState, useEffect } from 'react'
import menuData from '../data/menu.json'

/**
 * Hook que obtiene los ítems del menú, priorizando localStorage
 *
 * @returns {Object} Estado del menú
 * @returns {Object|null} return.menu - Datos del menú agrupados por categoría
 * @returns {boolean} return.loading - Indica si está cargando
 * @returns {string|null} return.error - Mensaje de error si ocurrió uno
 */
export function useMenu() {
  const [menu, setMenu] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  /**
   * Obtiene el menú desde localStorage si existe, o del JSON estático
   */
  const fetchMenu = () => {
    setLoading(true)
    setError(null)

    try {
      setTimeout(() => {
        // Priorizar datos de localStorage (editados desde el Admin)
        const saved = localStorage.getItem('delicias_menu')
        if (saved) {
          setMenu(JSON.parse(saved))
        } else {
          // Fallback al JSON estático
          setMenu(menuData)
        }
        setLoading(false)
      }, 300)
    } catch (err) {
      setError('Error al cargar el menú')
      setLoading(false)
    }
  }

  // Cargar el menú al montar el componente
  useEffect(() => {
    fetchMenu()
  }, [])

  return {
    menu,
    loading,
    error,
  }
}
