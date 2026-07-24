import express from "express"
import { routes } from "./routes";

const app = express();

routes(app)

// executa algo quando o subir o servidor
app.listen(3000, () => {
    console.log("Servidor ativo na porta 3000");
})