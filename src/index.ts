import express, { Request , Response} from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
    res.send("Bem vindo ao curso de node.js - Manual");
});

app.get("/users", (req: Request, res: Response) => {
    const usuarios = [
        {
            nome: "Weslley de Oliveira",
            idade: 30
        },
        {
            nome: "Maria de Oliveira",
            idade: 56
        }
    ]
    res.send(usuarios);
})

app.listen(3000, () => {
    console.log("Servidor ativo na porta 3000");
});