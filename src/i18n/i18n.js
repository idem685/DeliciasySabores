// =============================================================================
// Configuración de i18next
// =============================================================================
// Inicializa i18next con los archivos de traducción para español, inglés y
// portugués. Detecta el idioma del navegador y lo usa como valor inicial.
// =============================================================================

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import es from './es.json'
import en from './en.json'
import pt from './pt.json'

// Recursos de traducción organizados por código de idioma
const resources = {
  es: { translation: es },
  en: { translation: en },
  pt: { translation: pt },
}

// Detectar el idioma del navegador del usuario
const getBrowserLanguage = () => {
  const lang = navigator.language?.split('-')[0] || 'es'
  // Si el idioma del navegador no está soportado, usar español por defecto
  return ['es', 'en', 'pt'].includes(lang) ? lang : 'es'
}

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('delicias_idioma') || getBrowserLanguage(),
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false, // React ya escapa valores por defecto
  },
})

export default i18n
