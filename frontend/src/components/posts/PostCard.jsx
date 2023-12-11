import { usePosts } from "../../context/postsContext";
import { Button, ButtonLink, Card } from "../ui";

export function PostCard({ post }) {
  const { deletePost } = usePosts();

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <div className="flex gap-x-2 items-center">
          <Button onClick={() => deletePost(post._id)}>Delete</Button>
          <ButtonLink to={`/posts/${post._id}`}>Edit</ButtonLink>
        </div>
      </header>
      <p className="text-slate-300">{post.description}</p>
      {/* format date */}
      <p>
        {post.date &&
          new Date(post.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
      </p>
    </Card>
  );
}
