import jwt from "jsonwebtoken";
import { SECRET } from "../config/config.js";


const { secret } = SECRET();

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;

  if (!token)
    return res
      .status(401)
      .json({ message: "Autorización denegada, no hay token" });

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(403).json({ message: "Token inválido" });

    req.user = user;
    next(); // ¡Asegúrate de llamar a next() aquí!
  });
};

 /*  export const authRequired = (req, res, next) => {
  console.log(req.headers.cookie);

  const { token } = req.cookies;

  if (!token)
    return res
      .status(401)
      .json({ message: "Autorización denegada, no hay token" });

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(403).json({ message: "Token inválido" });

    req.user = user;
  });

  next();
};
 */