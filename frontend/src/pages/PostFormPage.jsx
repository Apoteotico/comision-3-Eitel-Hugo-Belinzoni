import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Input, Label } from "../components/ui";
import { usePosts } from "../context/postsContext";
import { Textarea } from "../components/ui/Postarea";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

export default function PostFormPage() {
  const { createPost, getPost, updatePost } = usePosts();
  const { user } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Agrega la firma del autor en un nuevo renglón
      data.description += `\n\nPosted by ${user?.username || "Anonymous"}`;

      if (params.id) {
        updatePost(params.id, {
          ...data,
        });
      } else {
        createPost({
          ...data,
          author: user?.id || "Anonymous",
        });
      }

      navigate("/posts");
    } catch (error) {
      console.log(error);
      // Manejar el error, por ejemplo, mostrando un mensaje al usuario
    }
  };

  useEffect(() => {
    const loadPost = async () => {
      try {
        if (params.id) {
          const post = await getPost(params.id);
          setValue("title", post.title);
          setValue("description", post.description);
          setValue("completed", post.completed);
        }
      } catch (error) {
        console.log(error);
        // Manejar el error, por ejemplo, mostrando un mensaje al usuario
      }
    };
    loadPost();
  }, [params.id, getPost, setValue]);

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Titulo */}
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          name="title"
          placeholder="Title"
          {...register("title")}
          autoFocus
        />
        {errors.title && (
          <p className="text-red-500 text-xs italic">Please enter a title.</p>
        )}
        {/* Descripcion */}
        <Label htmlFor="description">Description</Label>
        <Textarea
          name="description"
          id="description"
          rows="3"
          placeholder="Description"
          {...register("description")}
        ></Textarea>
        {errors.description && (
          <p className="text-red-500 text-xs italic">
            Please enter a description.
          </p>
        )}

        {/* ImageURL */}
        <Label htmlFor="imageURL">Image for Post</Label>
        <Input
          type="text"
          name="imageURL"
          placeholder="ImageURL"
          {...register("imageURL")}
          autoFocus
        />

        {errors.imageURL && (
          <p className="text-red-500 text-xs italic">
            Please enter an imageURL.
          </p>
        )}

        {/* Autor id */}
        <Label htmlFor="author"></Label>
        <Input
          type="hidden"
          {...register("author")}
          value={user?.id || "Anonymous"}
        />

        {errors.author && (
          <p className="text-red-500 text-xs italic">
            Error al obtener el nombre del autor.
          </p>
        )}

        <Button>Save</Button>
      </form>
    </Card>
  );
}
