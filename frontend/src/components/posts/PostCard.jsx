import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePosts } from '../../context/postsContext';
import { Button, ButtonLink, Card } from '../ui';

export function PostCard({ post }) {
  const { deletePost } = usePosts();
  const navigate = useNavigate();

  const formattedDate = (createdAt) => {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    };

    const date = new Date(createdAt);
    return new Intl.DateTimeFormat('es-ES', options).format(date);
  };

  const handleDelete = async (postId) => {
    try {
      // Lógica para eliminar el post (puedes mantener tu función deletePost)
      await deletePost(postId);

      // Después de eliminar el post, redirige a /posts
      navigate('/posts');
    } catch (error) {
      console.error('Error deleting post:', error.message);
      // Manejar el error, por ejemplo, mostrar un mensaje al usuario
    }
  };

  return (
    <Card className="mb-4 mx-auto max-w-md flex">
      {post ? (
        <>
          <header className="flex justify-between items-center">
            <img
              src={post.imageURL}
              alt="Post Image"
              className="w-full h-40 rounded-md object-cover"
            />
          </header>

          <Link to={`/posts/${post._id}`}>
            <h1 className="text-2xl font-bold my-2">{post.title}</h1>
          </Link>

          <p className="text-slate-300 max-h-17 overflow-hidden">{post.description}</p>

          <p className="text-slate-300">{formattedDate(post.createdAt)}</p>

          <div className="flex gap-x-2 items-center mt-2">
            <Button onClick={() => handleDelete(post._id)}>Delete</Button>
            <ButtonLink to={`/posts/${post._id}`}>Edit</ButtonLink>
          </div>
        </>
      ) : (
        <p>No data available</p>
      )}
    </Card>
  );
}
