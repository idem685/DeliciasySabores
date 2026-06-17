// =============================================================================
// Componente: AdminLogin
// =============================================================================
// Formulario de inicio de sesión para el panel de administración.
// La contraseña por defecto es "admin123" (configurable).
// En producción, se recomienda cambiar esta contraseña.
// =============================================================================

import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiLockClosed } from 'react-icons/hi'
import { useTranslation } from 'react-i18next'

// Contraseña por defecto del admin (puede cambiarse editando esta constante)
const ADMIN_PASSWORD = 'admin123'

/**
 * Componente AdminLogin - Formulario de inicio de sesión
 *
 * @param {Object} props
 * @param {Function} props.onLogin - Función que se ejecuta al iniciar sesión exitosamente
 */
const AdminLogin = ({ onLogin }) => {
  const { t } = useTranslation()
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  /**
   * Verifica la contraseña ingresada
   * @param {Event} e - Evento del formulario
   */
  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setError(false)
      onLogin()
    } else {
      setError(true)
      setPassword('')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto mt-16"
    >
      <div className="bg-white p-8 border border-primary/10">
        {/* Icono */}
        <div className="w-16 h-16 bg-secondary/10 flex items-center justify-center mx-auto mb-6">
          <HiLockClosed className="text-secondary text-2xl" />
        </div>

        <h2 className="font-serif text-2xl text-primary text-center mb-2">
          {t('admin.login')}
        </h2>
        <p className="text-text-light text-sm text-center mb-8">
          {t('admin.loginDesc')}
        </p>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-text-light font-medium mb-1.5">
              {t('admin.password')}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError(false)
              }}
              placeholder="••••••••"
              className={`input-elegant ${error ? 'border-red-400' : ''}`}
              autoFocus
            />
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-xs mt-1"
              >
                {t('admin.error')}
              </motion.p>
            )}
          </div>

          <button
            type="submit"
            className="btn-gold w-full py-3 text-sm uppercase tracking-widest"
          >
            {t('admin.ingresar')}
          </button>
        </form>

        <p className="text-text-lighter text-xs text-center mt-6">
          Contraseña por defecto: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">admin123</code>
        </p>
      </div>
    </motion.div>
  )
}

export default AdminLogin
