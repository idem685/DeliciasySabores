// =============================================================================
// Página: Admin (Panel de Administración)
// =============================================================================
// Panel protegido por contraseña para gestionar el menú y las reservas.
// La contraseña se almacena en localStorage y se compara con un hash.
// Incluye editor de menú (CRUD) y visor de reservas.
// =============================================================================

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { HiArrowLeft } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import AdminLogin from '../components/admin/AdminLogin'
import AdminDashboard from '../components/admin/AdminDashboard'

/**
 * Página Admin - Panel de administración protegido
 */
const Admin = () => {
  const { t } = useTranslation()
  // Estado de autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Verificar si ya está autenticado al cargar
  useEffect(() => {
    const auth = localStorage.getItem('delicias_admin_auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  /**
   * Maneja el inicio de sesión exitoso
   */
  const handleLogin = () => {
    setIsAuthenticated(true)
    localStorage.setItem('delicias_admin_auth', 'true')
  }

  /**
   * Maneja el cierre de sesión
   */
  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('delicias_admin_auth')
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header del admin */}
      <header className="bg-primary text-cream px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-cream/60 hover:text-cream transition-colors flex items-center gap-2 text-sm"
            >
              <HiArrowLeft />
              {t('admin.volver')}
            </Link>
            <h1 className="font-serif text-xl font-semibold">
              🛠️ {t('admin.panel')}
            </h1>
          </div>

          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="text-cream/60 hover:text-cream transition-colors text-sm"
            >
              {t('admin.cerrarSesion')}
            </button>
          )}
        </div>
      </header>

      {/* Contenido */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isAuthenticated ? (
          <AdminDashboard />
        ) : (
          <AdminLogin onLogin={handleLogin} />
        )}
      </main>
    </div>
  )
}

export default Admin
