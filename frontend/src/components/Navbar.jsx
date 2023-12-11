import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ButtonLink} from "./ui/ButtonLink";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  console.log(isAuthenticated, user);

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      <h1 className="text-2xl font-bold">
        {/* verifica, si está autenticado entra a /Posts o posts, sino entra a / o home */}
        <Link to={isAuthenticated ? "/posts" : "/"}>Post Manager</Link>
      </h1>
      <ul className="flex gap-x-2">
        {/* si está autenticado saluda al usuario con su nombre y muestra el boton Logout en el navbar */}
        {isAuthenticated ? (
          <>
            <li>Welcome {user.username}</li>
            <li>
              <ButtonLink to="/add-post">Add Post</ButtonLink>
            </li>
            <li>
              {/* si le dan click al botón Logout hay una funcion, onClick, que ejecuta la función "logout" para quitar las cookies y lo redirecciona a "/" o "/home" */}
              <Link to="/" onClick={() => logout()}>
                Logout
              </Link>
              {/* la funcion logout va en authContext.jsx */}

              {/* esta es la funcion que borra la cookie
                
                const logout = () => {
                  Cookies.remove("token");
                  setUser(null);
                  setIsAuthenticated(false);
                };
                
              */}
            </li>
          </>
          /* si no está autenticado, muestra los botones de login y register en el navbar */
        ) : (
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
