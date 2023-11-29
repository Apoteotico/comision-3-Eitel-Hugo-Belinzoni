import { Router } from "express";
import { authRequired } from "../middlewares/auth.jwt.js";
import {getPosts, getPost, createPost, updatePost, deletePost, } from "../controllers/post.controllers.js";

const router = Router()

router.get('/posts', authRequired, getPosts);
router.get('/posts/:id', authRequired, getPost);
router.post('/posts', authRequired, createPost);
router.delete('/posts/:id', authRequired, deletePost);
router.put('/posts/:id', authRequired, updatePost);

export default router