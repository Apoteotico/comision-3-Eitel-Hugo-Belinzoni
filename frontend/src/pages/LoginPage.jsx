import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: signinErrors } = useAuth();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });
  console.log(signinErrors);
  return (
    <div className="flex h-screen items-center justify-center ">
      <div className="bg-zinc-800 max-w-md p-5 rounded-md ">
        <form onSubmit={onSubmit}>
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
            placeholder="Passsword"
          />
          {errors.password && (
            <p className="text-red-500">Passsword is required</p>
          )}

          <button
            type="submit"
            className="bg-blue-900 text-white px-4 py-2 rounded-md my-2"
          >
            Login
          </button>
        </form>

       {/*  flex justify-between mt-10 */}
        <p className="flex justify-between px-4 py-2 ">
          ¿No tienes una cuenta registrada?
          <Link
            to="/register"
            className="px-3 font-semibold rounded-md text-black bg-cyan-400"
          >
            Register
          </Link>
        </p>

        {signinErrors.map((error, i) => (
          <div
            className="bg-red-500 p-2 text-white px-4 py-2 rounded-md my-2"
            key={i}
          >
            {error}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LoginPage;
