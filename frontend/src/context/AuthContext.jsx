import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verify } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

//trae useAuth desde AuthContext y desde useAuth trae signup. en lugar de importar authcontext y use
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
  //const [loading, setLoading] = useState(true);

  const signup = async (user) => {
    try {
      //validando que todo va bien
      const res = await registerRequest(user);
      console.log(res);

      setUser(res.data);
      setIsAuthenticated(true);

      /*  Cookies.set("token", res.data.message); */
    } catch (error) {
      // console.log(error.response);
      //console.log(error.response.data, "data");
      setErrors(error.response.data);
    }
  };

  const signin = async (user) => {
    try {
      //validando que todo va bien
      const res = await loginRequest(user);
      console.log(res);
      setUser(res.data);
      setIsAuthenticated(true);
      //console.log(res.data, "authcontext 42");
      //Cookies.set("token", res.data.message); //guardar el token
    } catch (error) {
      console.error(error);
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  // clear errors after 6 seconds
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  // remover cookie token
  const logout = () => {
    Cookies.remove("token");
    //localStorage.removeItem("token");  //para remover el token del localStorage
    setIsAuthenticated(false);
    setUser(null);
  };

  //cookies 3:09:00
  useEffect(() => {
    const checkLogin = async () => {
      // Obtén las cookies del navegador
      const cookies = Cookies.get();

      if (cookies.token) {
        try {
          const res = await verify(cookies.token);
          console.log(res);
          if (res.data) {
            setIsAuthenticated(true); 
            setUser(res.data); 
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          setIsAuthenticated(false); 
          setUser(null);
        }
      }
      
    };
    checkLogin();
  }, []); // Este efecto se ejecuta solo al montarse el componente

  //si este no funciona usar el ultimo probado
  /*  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }
      try {
        const res = await verify(cookies.token);
        console.log(res);
        console.log(res.data);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
        console.log(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error, "error cookies?");
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []); */
  /* ultimo probado
  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }
      try {
        const res = await verifyTokenRequest(cookies.token);
        console.log(res);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error, "error cookies?");
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []); */
  /*   useEffect(() => {
    const cookies = Cookies.get();
console.log(cookies)
    if (cookies.token) {
      verifyTokenRequest(cookies.token)
      console.log(cookies.token); 
    }
  }, []);
 */

  //3:09min

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        logout,
        /* loading, */
        user,
        isAuthenticated, //para saber si el usuario se autenticó.
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
