import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ButtonLink } from "./ui/ButtonLink";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  // si user is autenticated, muestra avatar, sino avatarURL = null.
  const avatarURL = isAuthenticated ? user.avatarURL : null;

  console.log(isAuthenticated, user);
  console.log("User Info:", user, "para ver si está la urlimage");

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg items-center">
      <h1 className="text-2xl font-bold">
        {/* verifica, si está autenticado entra a /Posts o posts, sino entra a / o home */}
        <Link to={isAuthenticated ? "/posts" : "/"}>Post Manager</Link>
      </h1>
      <ul className="flex gap-x-2 items-center">
        {/* si está autenticado saluda al usuario con su nombre y muestra el boton Logout en el navbar */}
        {isAuthenticated ? (
          <>
            <li>
              {avatarURL && (
                <img
                  src={avatarURL}
                  alt="User Avatar"
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
            </li>
            <li>Welcome {user.username}</li>
            <li>
              <ButtonLink to="/add-post">Add Post</ButtonLink>
            </li>
            <li>
              <ButtonLink to="/posts">All Post</ButtonLink>
            </li>
            <li>
              <ButtonLink to="/">Home</ButtonLink>
            </li>
            <li>
              <ButtonLink to="/profile">Profile</ButtonLink>
            </li>
            <li>
              {/* si le dan click al botón Logout hay una función, onClick, que ejecuta la función "logout" para quitar las cookies y lo redirecciona a "/" o "/home" */}
              <Link to="/" onClick={() => logout()}>
                Logout
              </Link>
              {/* la función logout va en authContext.jsx */}
            </li>
          </>
        ) : (
          /* si no está autenticado, muestra los botones de login y register en el navbar */
          <>
            <li>
              <ButtonLink to="/login">Login</ButtonLink>
            </li>
            <li>
              <ButtonLink to="/register">Register</ButtonLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
