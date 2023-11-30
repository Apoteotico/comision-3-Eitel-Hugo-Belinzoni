import Post from "../models/tu-ruta-hacia-el-modelo.js";

// Obtener todos los posteos
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los posteos" });
  }
};

// Crear un nuevo posteo
export const createPost = async (req, res) => {
  const { title, description, autor, imageURL } = req.body;

  try {
    const newPost = new Post({
      title,
      description,
      autor,
      imageURL,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el posteo" });
  }
};

// Obtener un posteo por ID
export const getPost = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Posteo no encontrado" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el posteo" });
  }
};

// Actualizar un posteo por ID
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { title, description, imageURL } = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { title, description, imageURL },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "Posteo no encontrado" });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el posteo" });
  }
};

// Eliminar un posteo por ID
export const deletePost = async (req, res) => {
  const postId = req.params.id;

  try {
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ error: "Posteo no encontrado" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el posteo" });
  }
};
