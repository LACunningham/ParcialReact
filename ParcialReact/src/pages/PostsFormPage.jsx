// Página del formulario, maneja tanto la creación como la edición de posts, con un modal de confirmación al editar
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById } from '../services/posts.service';
import { usePostContext } from '../context/PostContext';
import PostForm from '../components/PostForm';
import ConfirmModal from '../components/ConfirmModal';

const PostFormPage = () => {
  const { id } = useParams();
  // Si viene un :id en la URL estamos editando, si no, estamos creando
  const isEditing = !!id;
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [loadingPost, setLoadingPost] = useState(!!id);
  // Guardamos los datos del formulario hasta que el usuario confirme la edición
  const [pendingData, setPendingData] = useState(null);

  const { addPost, editPost } = usePostContext();

  // Cuando estamos editando, cargamos los datos del post existente
  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        const data = await getPostById(id);
        setInitialData(data);
      } catch {
        alert('Error al cargar el post');
        navigate('/');
      } finally {
        setLoadingPost(false);
      }
    };

    fetchPost();
  }, [id, navigate]);

  // Interceptamos el submit para mostrar el modal de confirmación si estamos editando
  const handleSubmit = (formData) => {
    if (isEditing) {
      setPendingData(formData);
    } else {
      submitForm(formData);
    }
  };

  // Envía la request a la API y al contexto
  const submitForm = async (formData) => {
    setIsSubmitting(true);

    try {
      if (isEditing) {
        await editPost(id, formData);
      } else {
        await addPost(formData);
      }
      navigate('/');
    } catch {
      alert(isEditing ? 'Error al editar el post' : 'Error al crear el post');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingPost) {
    return <div className="container">Cargando datos del post...</div>;
  }

  return (
    <>
      <PostForm
        initialData={initialData}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />

      {/* Modal de confirmación de edición, solo se muestra si hay datos pendientes */}
      <ConfirmModal
        isOpen={!!pendingData}
        title="Confirmar cambios"
        message="¿Estás seguro de que deseas guardar los cambios en este post?"
        confirmLabel="Guardar cambios"
        confirmVariant="primary"
        onConfirm={() => {
          submitForm(pendingData);
          setPendingData(null);
        }}
        onCancel={() => setPendingData(null)}
      />
    </>
  );
};

export default PostFormPage;
