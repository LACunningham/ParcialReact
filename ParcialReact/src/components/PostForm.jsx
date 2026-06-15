// Formulario reutilizable para crear o editar posts, con autofoque en el campo del título
import { useState, useRef, useEffect } from 'react';

const PostForm = ({ initialData, onSubmit, isSubmitting }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [body, setBody] = useState(initialData?.body || '');
  const titleInputRef = useRef(null);

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, body, userId: 1 });
  };

  return (
    <div className="container form-container">
      <h2>{initialData ? 'Editar Post' : 'Crear Nuevo Post'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Título:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            ref={titleInputRef}
            required
            placeholder="Escribe el título del post"
          />
        </div>

        <div className="form-group">
          <label htmlFor="body">Contenido:</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            rows="5"
            placeholder="Escribe el contenido..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary"
        >
          {isSubmitting ? 'Guardando...' : 'Guardar Post'}
        </button>
      </form>
    </div>
  );
};

export default PostForm;
