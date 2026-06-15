// Punto de entrada de la app: monta todo con StrictMode, HashRouter y el proveedor de estado global
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';
import { PostProvider } from './context/PostContext';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <PostProvider>
        <App />
      </PostProvider>
    </HashRouter>
  </StrictMode>
);