// Página del listado de posts, obtiene y muestra todos los posts con un modal de confirmación para eliminar
import { useState } from 'react';
import { usePostContext } from '../context/PostContext';
import PostsCard from '../components/PostsCard';
import ConfirmModal from '../components/ConfirmModal';

const PostsPage = () => {
  const { posts, loading, error, removePost } = usePostContext();
  // Guardamos el post que está por eliminarse, si es null no se muestra el modal
  const [postToDelete, setPostToDelete] = useState(null);

  const handleDeleteClick = (post) => {
    setPostToDelete(post);
  };

  const handleConfirmDelete = async () => {
    if (postToDelete) {
      await removePost(postToDelete.id);
      setPostToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setPostToDelete(null);
  };

  if (loading) return <div className="container">Cargando listado de posts...</div>;
  if (error) return <div className="container">Error: {error}</div>;

  return (
    <div className="container">
      <h2>Listado de Posts</h2>
      <div className="card-grid">
        {posts.map((post) => (
          <PostsCard
            key={post.id}
            post={post}
            onDeleteClick={handleDeleteClick}
          />
        ))}
      </div>

      <ConfirmModal
        isOpen={!!postToDelete}
        title="Confirmar eliminación"
        message={`¿Estás seguro de que deseas eliminar el post "${postToDelete?.title}"?`}
        confirmLabel="Eliminar"
        confirmVariant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default PostsPage;