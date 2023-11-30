import jwt from "jsonwebtoken";
import { settingSecretToken } from "../config/config.js";

const { secret } = settingSecretToken();

export const createAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, { expiresIn: "5D" }, (err, token) => {
      err ? reject(err) : resolve(token);
      // if (err) reject(err);
      // resolve(token);
    });
  });
};

/* import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/config.js";

export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      TOKEN_SECRET,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        err ? reject(err) : resolve(token)
        //if (err) reject(err)
        //resolve(token)
      }
    );
  });
} */
