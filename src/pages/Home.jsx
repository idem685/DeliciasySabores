// =============================================================================
// Página: Home (Página Principal)
// =============================================================================
// Página principal del sitio que ensambla todos los componentes del landing.
// Recibe props para la comunicación con el estado global de App.jsx.
// =============================================================================

// Importar todos los componentes de la landing page
import Hero from '../components/Hero'
import About from '../components/About'
import MenuSection from '../components/MenuSection'
import Gallery from '../components/Gallery'
import Reviews from '../components/Reviews'
import Contact from '../components/Contact'

/**
 * Página principal - Landing page completa del restaurante
 *
 * @param {Object} props
 * @param {Function} props.onReserveClick - Función para abrir el modal de reservas
 */
const Home = ({ onReserveClick }) => {
  return (
    <>
      {/* Hero - Sección de portada principal */}
      <Hero onReserveClick={onReserveClick} />

      {/* About - Historia del restaurante */}
      <About />

      {/* Menu - Menú digital interactivo */}
      <MenuSection />

      {/* Gallery - Galería de fotos */}
      <Gallery />

      {/* Reviews - Reseñas de clientes */}
      <Reviews />

      {/* Contact - Ubicación y contacto */}
      <Contact />
    </>
  )
}

export default Home
