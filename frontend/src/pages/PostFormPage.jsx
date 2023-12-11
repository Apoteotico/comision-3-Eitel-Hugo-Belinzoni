import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Input, Label } from "../components/ui";
import { usePosts } from "../context/postsContext";
import { Textarea } from "../components/ui/Postarea";
import { useForm } from "react-hook-form";

//para poner fecha manual
/* import dayjs from "dayjs"; */
/* import utc from "dayjs/plugin/utc"; */
/* dayjs.extend(utc); */

export default function PostFormPage() {
  const { createPost, getPost, updatePost } = usePosts();
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
      if (params.id) {
        updatePost(params.id, {
          ...data,
         /*  date: dayjs.utc(data.date).format(), */
        });
      } else {
        createPost({
          ...data,
          /* date: dayjs.utc(data.date).format(), */
        });
      } 

      // navigate("/posts");
    } catch (error) {
      console.log(error);
      // window.location.href = "/";
    }
  }; 

  useEffect(() => {
    const loadPost = async () => {
      if (params.id) {
        const post = await getPost(params.id);
        setValue("title", post.title);
        setValue("description", post.description);
        /*   setValue(
          "date",
          post.date ? dayjs(post.date).utc().format("YYYY-MM-DD") : ""
        );  */
        setValue("completed", post.completed);
      }
    };
    loadPost();
  }, []);

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <Label htmlFor="description">Description</Label>
        <Textarea
          name="description"
          id="description"
          rows="3"
          placeholder="Description"
          {...register("description")}
        ></Textarea>

        {/*    <Label htmlFor="date">Date</Label> */}
        {/* <Input type="date" name="date" {...register("date")} /> */}
        <Button>Save</Button>
      </form>
    </Card>
  );
}
