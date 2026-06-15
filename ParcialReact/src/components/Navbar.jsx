// Barra de navegación con links al listado y a la página de creación
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>Parcial React</h2>
      <div className="navbar-links">
        <Link to="/">Listado de Posts</Link>
        <Link to="/crear">Crear Nuevo</Link>
      </div>
    </nav>
  );
};

export default Navbar;