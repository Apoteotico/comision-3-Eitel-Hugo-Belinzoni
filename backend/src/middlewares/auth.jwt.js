import jwt from "jsonwebtoken";
import { settingSecretToken } from "../config/config.js";
//import userModel from "../models/user.model.js";
//import Role from "../models/Role.js";

const { secret } = settingSecretToken();

export const authRequired = (req, res, next) => {  
  console.log(req.headers.cookie);

  const { token } = req.cookies;
  //   console.log(token);
  if (!token)
    return res
      .status(401)
      .json({ message: "Autorización denegada, no hay token" });

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(403).json({ message: "Token inválido" });
    // console.log(user);
    req.user = user;
  });

  next();
};