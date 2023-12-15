import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePosts } from "../context/postsContext";
import { PostCard } from "../components/posts/PostCard";
import { useAuth } from "../context/AuthContext"; // Asegúrate de importar el contexto de autenticación
import { useForm } from "react-hook-form";

export function PostDetailPage() {
  const { id } = useParams();
  console.log(id, "id del post");
  const { getPostById, addComment } = usePosts();
  const { user } = useAuth(); // Obtén el usuario autenticado
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await getPostById(id);
        setPost(post);
        setComments(post.comments); // Actualiza los comentarios al cargar el post
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id, getPostById]);

  const onSubmitComment = async (data) => {
    try {
      console.log(data);
      // Agrega el comentario utilizando la función addComment del contexto de posts
      await addComment(id, { description: data.description });

      // Recarga los comentarios después de agregar uno nuevo
      const updatedPost = await getPostById(id);
      setComments(updatedPost.comments);
      setValue("description", ""); // Limpia el campo de descripción del formulario
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="m-4">
        <PostCard post={post} key={post._id} />
      </div>

      {/* Sección de comentarios */}
      <div className="m-4">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>

        {/* Formulario para agregar comentarios */}
        {user && (
          <form onSubmit={handleSubmit(onSubmitComment)}>
            <textarea
              {...register("description", { required: true })}
              placeholder="Add a comment..."
              className="w-full h-16 p-2 border rounded-md text-zinc-800"
            ></textarea>
            <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded-md">
              Add Comment
            </button>
          </form>
        )}

        {/* Lista de comentarios */}
        <ul>
          {comments.map((comment) => (
            <li key={comment._id}>
              <strong>{comment.autor?.username || "Anonymous"}:</strong> {comment.description}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
