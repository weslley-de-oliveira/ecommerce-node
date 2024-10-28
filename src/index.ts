import express from "express";
import { initializeApp as initializeFirebaseAdminApp } from 'firebase-admin/app';
import { initializeApp as initializeFirebaseApp } from 'firebase/app';
import { routes } from "./routes/index";
import { erroHandler } from "./middlewares/error-handler.middleware";
import { PageNotFoundHandler } from "./middlewares/page-not-found.middleware";

initializeFirebaseAdminApp();
initializeFirebaseApp({
    apiKey: process.env.API_KEY
});

const app = express();

routes(app);
PageNotFoundHandler(app);
erroHandler(app);

app.listen(3000, () => {
    console.log("Servidor ativo na porta 3000");
});