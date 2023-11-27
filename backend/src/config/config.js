export const TOKEN_SECRET = 'some secret key';
import dotenv from "dotenv"; 

dotenv.config();

//puerto 
export const settingDotEnvPort = () => {
  return { port: process.env.PORT };
};
//base de datos 
export const settingDotEnvDb = () => {
  return {
    db: {
      host: process.env.DB_HOST, localhost: process.env.DB_LOCALHOST,
    },
  };
};
//palabra secreta del token 
export const settingSecretToken = () => {
  return { secret: process.env.SECRET };
};


