// Componente raíz: define todas las rutas de la app
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import PostsPage from './pages/PostsPage.jsx';
import PostDetailPage from './pages/PostsDetailPage.jsx';
import PostFormPage from './pages/PostsFormPage.jsx';

function App() {
  return (
    <>
      <Navbar />
      <main style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<PostsPage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
          <Route path="/crear" element={<PostFormPage />} />
          {/* /editar/:id usa el mismo PostFormPage, la página detecta si está editando por la presencia del :id */}
          <Route path="/editar/:id" element={<PostFormPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;