import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";

// Crear un nuevo comentario
export const createComment = async (req, res) => {
  const { autor, description } = req.body;

  try {
    // Verificar si el autor existe
    const existingUser = await User.findById(autor);
    if (!existingUser) {
      return res.status(400).json({ error: "El autor no existe" });
    }

    const newComment = new Comment({
      autor,
      description,
    });

    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el comentario" });
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
