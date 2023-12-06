import { createContext, useState, useContext } from "react";
import { registerRequest, loginRequest } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
const [errors, setErrors] = useState([]);

  const signup = async (user) => {
    try {
      //validando que todo va bien
      const res = await registerRequest(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error)
      setErrors(error.response.data);
    }
  };

  const signin = async (user) => {
    try {
      //validando que todo va bien
      const res = await loginRequest(user);
      console.log(res.data);
    } catch (error) {
     // console.error(error)
      setErrors(error.response.data); 
    }
  };


  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        user,
        isAuthenticated, //para saber si el usuario se autenticó.
        errors
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
