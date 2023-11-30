import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";

// Función para verificar la existencia del usuario
const checkUserExistence = async (userId, res) => {
  const existingUser = await User.findById(userId);
  if (!existingUser) {
    res.status(404).json({ error: "Usuario no encontrado" });
    return false;
  }
  return true;
};

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los comentarios" });
  }
};

export const getComment = async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ error: "Comentario no encontrado" });
    }

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el comentario" });
  }
};

export const createComment = async (req, res) => {
  try {
    const { autor, description } = req.body;
    const postId = req.params.postId;

    // Consultar si el autor existe
    const existingUser = await User.findById(autor);
    if (!existingUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Consultar si existe el post
    const existingPost = await Post.findById(postId);
    if (!existingPost) {
      return res.status(404).json({ message: "Post no encontrado" });
    }

    // Crear el comentario con la referencia al post
    const newComment = new Comment({ autor, description, post: postId });
    
    // Guardar el comentario en la base de datos
    const commentSaved = await newComment.save();

    // Añadir el comentario al array de comentarios del post
    existingPost.comments.push(commentSaved._id);
    
    // Guardar el post actualizado
    await existingPost.save();

    res.status(201).json(commentSaved);
  } catch (error) {
    console.error("Error al crear un nuevo comentario:", error);
    res.status(400).json({ message: "Error al crear un nuevo comentario", details: error.message });
  }
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (!deletedComment) {
      return res.status(404).json({ error: "Comentario no encontrado" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el comentario" });
  }
};

export const updateComment = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { description },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ error: "Comentario no encontrado" });
    }

    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el comentario" });
  }
};


/*
// Traer todos los comentarios
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los comentarios" });
  }
}; 

// Traer un comentario por ID
export const getComment = async (req, res) => {
  const commentId = req.params.id;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comentario no encontrado" });
    }

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el comentario" });
  }
};


export const createComment = async (req, res) => {
  try {
    const { autor, description } = req.body;
    const postId = req.params.postId;  // Supongamos que recibes el ID del post en los parámetros de la ruta

    // Verifica si el autor (usuario) existe antes de crear el comentario
    const existingUser = await User.findById(autor);
    if (!existingUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Crea el nuevo comentario con la referencia al post
    const newComment = new Comment({ 
      autor, 
      description, 
      post: postId });

    // Guarda el comentario en la base de datos
    const commentSaved = await newComment.save();

    res.status(201).json(commentSaved);
  } catch (error) {
    console.error("Error al crear un nuevo comentario:", error);
    res.status(400).json({ message: "Error al crear un nuevo comentario", error });
  }
};

// Eliminar un comentario por ID
export const deleteComment = async (req, res) => {
  const commentId = req.params.id;

  try {
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(404).json({ error: "Comentario no encontrado" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el comentario" });
  }
};

// Editar un comentario por ID
export const updateComment = async (req, res) => {
  const commentId = req.params.id;
  const { description } = req.body;

  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { description },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ error: "Comentario no encontrado" });
    }

    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el comentario" });
  }
};
 */



