// PostCard.jsx
import { usePosts } from "../../context/postsContext";
import { Button, ButtonLink, Card } from "../ui";
import { Link } from "react-router-dom";

export function PostCard({ post }) {
  const { deletePost } = usePosts();

  const formattedDate = (createdAt) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };

    const date = new Date(createdAt);
    return new Intl.DateTimeFormat("es-ES", options).format(date);
  };

  return (
    <Card className="mb-4 mx-auto max-w-md">
      <header className="flex justify-between items-center">
        <img
          src={post.imageURL}
          alt="Post Image"
          className="w-full h-40 rounded-md object-cover"
        />
      </header>

      {/* Envuelve el título en un enlace */}
      <Link to={`/posts/${post._id}`}>
        <h1 className="text-2xl font-bold my-2">{post.title}</h1>
      </Link>

      <p className="text-slate-300 max-h-16 overflow-hidden">{post.description}</p>

      <p className="text-slate-300">{formattedDate(post.createdAt)}</p>

      <div className="flex gap-x-2 items-center mt-2">
        <Button onClick={() => deletePost(post._id)}>Delete</Button>
        <ButtonLink to={`/posts/${post._id}`}>Edit</ButtonLink>
      </div>
    </Card>
  );
}
