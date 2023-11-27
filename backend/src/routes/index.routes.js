import { Router } from "express"; 

export const indexRoutes = Router(); 

indexRoutes.get("/", (req, res) => {
  res.send("Pagina de inicio"); 
});