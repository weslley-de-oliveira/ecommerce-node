import express, { NextFunction, Request, Response } from "express";
import { initializeApp } from "firebase-admin/app";
import { routes } from "./routes";

initializeApp();
const app = express();

routes(app);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({
    message: "Erro Interno do Servidor",
  });
});

// executa algo quando o subir o servidor
app.listen(3000, () => {
  console.log("Servidor ativo na porta 3000");
});
