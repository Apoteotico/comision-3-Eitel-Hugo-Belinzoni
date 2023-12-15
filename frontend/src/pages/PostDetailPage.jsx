import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePosts } from "../context/postsContext";
import { PostCard } from "../components/posts/PostCard";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";

export function PostDetailPage() {
  const { id } = useParams();
  const { getPostById, addComment } = usePosts();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await getPostById(id);
        setPost(fetchedPost);
        setComments(fetchedPost.comments);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id, getPostById]);

  const onSubmitComment = async (data) => {
    try {
      console.log("Comment Data:", data); // Verificar los datos del comentario

      const commentData = {
        autor: user.id,
        ...data,
      };
      console.log("Formatted Comment Data:", commentData); // Verificar los datos formateados

      await addComment(id, commentData);
      
      // Recargar los comentarios después de agregar uno nuevo
      const updatedPost = await getPostById(id);
      console.log("Updated Post after adding comment:", updatedPost);

      setComments(updatedPost.comments);
      setValue("description", "");
      setPost(updatedPost);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="m-4">
      <PostCard post={post} key={post?._id} />

      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>

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

        <div className="mt-6">
          {comments.map((comment, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg">
              <div className="flex items-center mb-2">
                <strong className="mr-2 text-blue-600">{user.username}:</strong>
                <span className="text-gray-500 text-sm">{comment.createdAt}</span>
              </div>
              <p className="text-gray-800 text-lg">{comment.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
