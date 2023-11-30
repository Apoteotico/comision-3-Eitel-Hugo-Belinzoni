import { Router } from "express";
import { authRequired } from "../middlewares/auth.jwt.js";
import { createComment, deleteComment, getComment, getComments, updateComment } from "../controllers/comment.controller.js";

const router = Router();

// Traer todos los comentarios
router.get('/comments', getComments);

// Traer un comentario por ID
router.get('/comments/:id', getComment);

// Crear un comentario
router.post('/comments/:postId', authRequired, createComment);

// Eliminar un comentario
router.delete('/comments/:id', authRequired, deleteComment);

// Editar/actualizar un comentario
router.put('/comments/:id', authRequired, updateComment); 

export default router;
