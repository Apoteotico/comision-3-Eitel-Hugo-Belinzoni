import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePosts } from "../context/postsContext";
import { PostCard } from "../components/posts/PostCard";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import CommentSolution from "../components/comments/CommentSolution";

export function PostDetailPage() {
  const { id } = useParams();
  const { getPostById, addComment } = usePosts();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [coment, setComent] = useState("");
  const [forceRerender, setForceRerender] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await getPostById(id);
        setPost(fetchedPost);
        setComments(fetchedPost.comments);
        console.log(fetchedPost);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [forceRerender]);

  const onSubmitComment = async (e) => {
    e.preventDefault();
    try {
      const commentData = {
        autor: post.autor,
        description: coment,
      };
      console.log(commentData);
      await addComment(id, commentData);
      setForceRerender((prev) => !prev); // Cambiar el estado para forzar la rerenderización
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handlechangeInput = (event) => {
    setComent(event.target.value);
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="m-4">
      <PostCard post={post} key={post?._id} />

      <div className="mt-8 p-6 bg-zinc-700 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>

        {user && (
          <form>
            <input
              name="description"
              value={coment}
              placeholder="Add a comment..."
              className="w-full h-16 p-2 border rounded-md text-zinc-800"
              onChange={handlechangeInput}
            />
            <button
              className="mt-2 bg-blue-500 text-white p-2 rounded-md"
              onClick={onSubmitComment}
            >
              Add Comment
            </button>
          </form>
        )}

        <div className="mt-6">
          {comments.map((commentData, index) => (
            <CommentSolution key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
