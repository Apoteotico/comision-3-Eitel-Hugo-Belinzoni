import { createContext, useContext, useState } from "react";
import {
  createPostRequest,
  deletePostRequest,
  getPostsRequest,
  getPostRequest,
  updatePostRequest,
} from "../api/posts";

const PostContext = createContext();

export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) throw new Error("usePosts must be used within a PostProvider");
  return context;
};

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const res = await getPostsRequest();
    setPosts(res.data);
  };

  const deletePost = async (id) => {
    try {
      const res = await deletePostRequest(id);
      if (res.status === 204) setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const createPost = async (post) => {
    try {
      const res = await createPostRequest(post);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPostById = async (id) => {
    try {
      const res = await getPostRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updatePost = async (id, post) => {
    try {
      await updatePostRequest(id, post);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        getPosts,
        deletePost,
        createPost,
        getPostById,
        updatePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
