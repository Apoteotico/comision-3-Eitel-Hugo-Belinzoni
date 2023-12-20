import { useEffect, useState } from "react";
import { usePosts } from "../../context/postsContext";

function CommentSolution({ id }) {
  const { getCommentById } = usePosts();

  //estado
  const [comment, setComment] = useState({});

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const fetchedComment = await getCommentById(id);
        setComment(fetchedComment);
        console.log(fetchedComment);
      } catch (error) {
        console.error("Error fetching comment:", error);
      }
    };

    fetchComment();
  }, [getCommentById, id]); // Asegúrate de incluir las dependencias correctas

  return <div className="text-zinc-200">CommentSolution</div>;
}

export default CommentSolution;

/* import { useEffect, useState } from "react";
import { usePosts } from "../../context/postsContext";

function CommentSolution({ id }) {
  const { getCommentById } = usePosts();

  //estado
  const [comment, setComment] = useState({});

  useEffect(async () => {
    try {
      const fetchedPost = await getCommentById(id);
      setComment(fetchedPost);
      console.log(fetchedPost);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  }, [comment]);

  return <div className="text-zinc-800">CommentSolution</div>;
}

export default CommentSolution;
 */