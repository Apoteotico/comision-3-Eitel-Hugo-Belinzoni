import { Router } from "express";
import { authRequired } from "../middlewares/auth.jwt.js";
import {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller.js";

const router = Router();

// Traer todos los comentarios
router.get('/comments', authRequired, getComments);

// Traer un comentario por ID
router.get('/comments/:id', authRequired, getComment);

// Crear un comentario
router.post('/comments', authRequired, createComment);

// Eliminar un comentario
router.delete('/comments/:id', authRequired, deleteComment);

// Actualizar un comentario
router.put('/comments/:id', authRequired, updateComment);

export default router;
