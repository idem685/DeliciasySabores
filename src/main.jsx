// =============================================================================
// Punto de entrada de la aplicación React
// =============================================================================
// Monta la aplicación en el DOM, configura el Router con las rutas
// principales (Home y Admin), e inicializa i18next para multi-idioma.
// =============================================================================

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Admin from './pages/Admin.jsx'
import './i18n/i18n.js' // Inicializar i18next
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Ruta principal: Landing page del restaurante */}
        <Route path="/" element={<App />} />
        {/* Ruta admin: Panel de administración */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
