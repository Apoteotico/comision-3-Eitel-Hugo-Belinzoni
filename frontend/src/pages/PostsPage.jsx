import React, { useEffect, useState } from "react";
import { usePosts } from "../context/postsContext";
import { PostCard } from "../components/posts/PostCard";
import { ImFileEmpty } from "react-icons/im";
import { Button } from "../components/ui";
import "../index.css"; // Importa el archivo de estilos CSS

export function PostsPage() {
  const { posts, getPosts } = usePosts();
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);
  const [showScrollBottomButton, setShowScrollBottomButton] = useState(false);

  useEffect(() => {
    getPosts();
  }, []);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    setShowScrollTopButton(scrollY > 100);
    setShowScrollBottomButton(scrollY + windowHeight < documentHeight - 50 && scrollY > 0);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {posts.length === 0 && (
        <div className="flex justify-center items-center p-10">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl">
              No posts yet, please add a new post
            </h1>
          </div>
        </div>
      )}

      <div className="m-4">
        {posts.map((post) => (
          <PostCard post={post} key={post._id} />
        ))}
      </div>

      {/* Botones de scroll */}
      {showScrollTopButton && (
        <div className="scroll-buttons show">
          <Button onClick={scrollToTop}>Scroll to Top</Button>
        </div>
      )}
      {showScrollBottomButton && (
        <div className="scroll-buttons show">
          <Button onClick={scrollToBottom}>Scroll to Bottom</Button>
        </div>
      )}
    </>
  );
}
