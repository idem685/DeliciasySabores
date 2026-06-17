// =============================================================================
// Utilidad: getLocalizedValue
// =============================================================================
// Helper que selecciona el valor correcto de un campo multidioma según el
// idioma indicado. Soporta objetos del tipo:
//   { es: "texto español", en: "english text", pt: "texto português" }
// Si el campo no existe para el idioma solicitado, cae al español (idioma base).
// Si es un valor plano (string), lo devuelve tal cual (retrocompatibilidad).
// =============================================================================

/**
 * Obtiene el valor localizado de un campo según el idioma indicado
 *
 * @param {Object|string} fieldValue - Valor del campo (objeto {es, en, pt} o string plano)
 * @param {string} [lang='es'] - Código de idioma ('es', 'en', 'pt')
 * @returns {string} El valor en el idioma correspondiente
 *
 * @example
 * getLocalizedValue({ es: "Pan", en: "Bread", pt: "Pão" }, 'en')
 * // → "Bread"
 *
 * @example
 * getLocalizedValue("Pan", 'en') // retrocompatibilidad
 * // → "Pan"
 */
export function getLocalizedValue(fieldValue, lang = 'es') {
  if (fieldValue && typeof fieldValue === 'object' && !Array.isArray(fieldValue)) {
    return fieldValue[lang] || fieldValue.es || ''
  }
  return fieldValue ?? ''
}
