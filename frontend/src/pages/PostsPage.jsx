
function PostsPage() {
  return (
    <div>PostsPage</div>
  )
}

export default PostsPage
/* import { useEffect } from "react";
import { usePosts } from "../context/postsContext"; 

import { ImFileEmpty } from "react-icons/im";

export function PostsPage() {
  const { posts, getPosts } = usePosts(); 

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {posts.length === 0 && (
        <div className="flex justify-center items-center p-10">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl">
              No posts yet, please add a new posts
            </h1>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {posts.map((post) => (
          <PostCard post={post} key={post._id} />
        ))}
      </div>
    </>
  );
}
 */