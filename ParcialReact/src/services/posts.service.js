// Capa de servicio de la API, envuelve los llamados fetch al endpoint de posts de JSONPlaceholder
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const getPosts = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Error al cargar los posts');
  return await response.json();
};

export const getPostById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error('Error al cargar el post');
  return await response.json();
};

export const createPost = async (postData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  });
  if (!response.ok) throw new Error('Error al crear el post');
  return await response.json();
};

export const updatePost = async (id, postData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(postData),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  });
  if (!response.ok) throw new Error('Error al actualizar el post');
  return await response.json();
};

export const deletePost = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error al eliminar el post');
  return await response.json(); 
};