import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin } = useAuth();
  const navigate = useNavigate();  // Utiliza useNavigate para obtener la función de navegación

  const onSubmit = async (data) => {
    try {
      await signin(data);
      // Después de iniciar sesión con éxito, redirige al usuario a /posts
      //navigate("/posts");  // Utiliza la función de navegación para cambiar de ruta
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center ">
      <div className="bg-zinc-800 max-w-md p-5 rounded-md ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-4xl text-center text-white font-semibold">
            Login
          </h1>

          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}

          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}

          <button
            type="submit"
            className="bg-blue-900 text-white px-4 py-2 rounded-md my-2"
          >
            Login
          </button>
        </form>

        <p className="flex justify-between px-4 py-2">
          ¿No tienes una cuenta registrada?
          <Link
            to="/register"
            className="px-3 font-semibold rounded-md text-black bg-cyan-400"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
