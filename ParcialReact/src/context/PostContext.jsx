/* eslint-disable react-refresh/only-export-components */
// Estado global de los posts, usa useReducer para las operaciones CRUD y se expone via PostProvider y usePostContext()
import { createContext, useContext, useReducer, useEffect } from 'react';
import { getPosts, createPost, updatePost, deletePost } from '../services/posts.service';

const PostContext = createContext(null);

const initialState = {
  posts: [],
  loading: true,
  error: null,
};

// Reducer: maneja el ciclo de vida de las peticiones y las acciones CRUD
function postReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, posts: action.payload, loading: false };
    case 'FETCH_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'ADD_POST':
      return { ...state, posts: [action.payload, ...state.posts] };
    case 'UPDATE_POST':
      return {
        ...state,
        posts: state.posts.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    case 'REMOVE_POST':
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.payload),
      };
    default:
      return state;
  }
}

export const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, initialState);

  // Apenas se monta el componente, traemos todos los posts
  useEffect(() => {
    const fetchPosts = async () => {
      dispatch({ type: 'FETCH_START' });
      try {
        const data = await getPosts();
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_ERROR', payload: err.message });
      }
    };

    fetchPosts();
  }, []);

  const addPost = async (newPost) => {
    try {
      const created = await createPost(newPost);
      dispatch({ type: 'ADD_POST', payload: created });
      return created;
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: err.message });
    }
  };

  const editPost = async (id, updatedData) => {
    try {
      const updated = await updatePost(id, updatedData);
      dispatch({ type: 'UPDATE_POST', payload: updated });
      return updated;
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: err.message });
    }
  };

  const removePost = async (id) => {
    try {
      await deletePost(id);
      dispatch({ type: 'REMOVE_POST', payload: id });
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: err.message });
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        loading: state.loading,
        error: state.error,
        addPost,
        editPost,
        removePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

// Hook para acceder al contexto de posts, tiene que usarse dentro del PostProvider
export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePostContext debe usarse dentro de PostProvider');
  }
  return context;
};


