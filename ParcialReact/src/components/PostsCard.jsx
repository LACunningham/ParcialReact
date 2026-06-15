// Componentes para mostrar en cada una de las postscards, con sus correspondientes botones de ver detalle y eliminar.
import { Link } from 'react-router-dom';

const PostsCard = ({ post, onDeleteClick }) => {
  return (
    <div className="post-card">
      <h3>{post.title}</h3>
      <p>{post.body.substring(0, 80)}...</p>

      <div className="card-actions">
        <Link to={`/posts/${post.id}`} className="btn btn-primary">
          Ver Detalle
        </Link>
        <button
          onClick={() => onDeleteClick(post)}
          className="btn btn-danger"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default PostsCard;
