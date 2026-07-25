import express from "express";
import { initializeApp as initializeFirebaseAdminApp } from "firebase-admin/app";
import { initializeApp as initializeFirebaseApp } from "firebase/app";
import { errorHandler } from "./middlewares/error-handler.middleware";
import { routeNotFoundHandler } from "./middlewares/route-not-foung-handler";
import { routes } from "./routes";

initializeFirebaseAdminApp();
initializeFirebaseApp({
  apiKey: process.env.FIRE_API_KEY
});
const app = express();

routes(app);
routeNotFoundHandler(app);
errorHandler(app);

// executa algo quando o subir o servidor
app.listen(3000, () => {
  console.log("Servidor ativo na porta 3000");
});
