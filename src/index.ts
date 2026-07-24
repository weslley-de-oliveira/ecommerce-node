import express from "express";
import { initializeApp } from "firebase-admin/app";
import { errorHandler } from "./middlewares/error-handler.middleware";
import { routes } from "./routes";

initializeApp();
const app = express();

routes(app);

errorHandler(app);

// executa algo quando o subir o servidor
app.listen(3000, () => {
  console.log("Servidor ativo na porta 3000");
});
