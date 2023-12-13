import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePosts } from "../context/postsContext";
import { ImFileEmpty } from "react-icons/im";
import  {PostCard}  from "../components/posts/PostCard";

export function PostDetailPage() {
  const { id } = useParams();
  const { getPostById } = usePosts();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await getPostById(id);
        setPost(post);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id, getPostById]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="m-4">
        <PostCard post={post} key={post._id} />
      </div>
    </>
  );
}
