import axios from "./axios";

//para obtener todas la tareas
export const getPostsRequest = async () => axios.get("/posts");

//para obtener un solo post por id
export const getPostRequest = async (id) => axios.get(`/posts/${id}`);

//para cuando  un usuario envia un post lo envia con el metodo post a /posts ylo añade en axios
export const createPostRequest = async (post) => axios.post("/posts", post);

//para actualizar, se necesita el id del post y los datos, en la tarea va incluido el id asique va con el ._id
export const updatePostRequest = async (post) =>
  axios.put(`/posts/${post._id}`, post);

//para eliminar
export const deletePostRequest = async (id) => axios.delete(`/posts/${id}`);

// Agregar la función para crear comentarios
export const createCommentRequest = async (id, comment) =>
  axios.post(`/comments/${id}`, comment);

/* export const createCommentRequest = async (comment) =>
  axios.post(`/comments/${post._id}`, comment);
 */