import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ButtonLink } from "./ui/ButtonLink";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  // Si el usuario está autenticado, muestra el avatar, de lo contrario, avatarURL = null.
  const avatarURL = isAuthenticated ? user.avatarURL : null;

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg items-center">
      <h1 className="text-2xl font-bold">
        <Link to={isAuthenticated ? "/posts" : "/"}>Post Manager</Link>
      </h1>
      <ul className="flex gap-x-2 items-center">
        {isAuthenticated ? (
          <>
            <li>
              {avatarURL && (
                <img
                  src={avatarURL}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
            </li>
            <li className="hidden md:block">Welcome, {user.username}</li>
            <li>
              <ButtonLink to="/add-post">Add Post</ButtonLink>
            </li>
            <li>
              <ButtonLink to="/posts">All Posts</ButtonLink>
            </li>
            <li>
              <ButtonLink to="/">Home</ButtonLink>
            </li>
            <li>
              <ButtonLink to="/profile">Profile</ButtonLink>
            </li>
            <li>
              <button
                onClick={() => logout()}
                className="text-white hover:text-gray-300 transition duration-300 focus:outline-none"
              >
                Logout
              </button>
            </li>
          </>
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

