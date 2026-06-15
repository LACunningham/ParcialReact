// Página de detalle de un post, muestra el contenido completo con botones para editar, eliminar y el modal de confirmación
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPostById } from '../services/posts.service';
import { usePostContext } from '../context/PostContext';
import ConfirmModal from '../components/ConfirmModal';

const PostsDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { removePost } = usePostContext();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Tyramos el post cuando se monta el componente o cuando cambia el id
  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const data = await getPostById(id);
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [id]);

  const handleDelete = async () => {
    await removePost(id);
    navigate('/');
  };

  if (loading) return <div className="container">Cargando detalle del post...</div>;
  if (error) return <div className="container">Error: {error}</div>;
  if (!post) return <div className="container">No se encontró el post.</div>;

  return (
    <div className="container">
      <p style={{ color: '#888' }}>Post ID: {post.id}</p>
      <h2>{post.title}</h2>
      <p style={{ fontSize: '18px', lineHeight: '1.6' }}>{post.body}</p>

      <div className="card-actions" style={{ marginTop: '30px' }}>
        <Link to={`/editar/${post.id}`} className="btn btn-primary">
          Editar
        </Link>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="btn btn-danger"
        >
          Eliminar
        </button>
        <Link to="/" className="btn btn-secondary">
          Volver al listado
        </Link>
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Confirmar eliminación"
        message={`¿Estás seguro de que deseas eliminar el post "${post.title}"?`}
        confirmLabel="Eliminar"
        confirmVariant="danger"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
};

export default PostsDetailPage;