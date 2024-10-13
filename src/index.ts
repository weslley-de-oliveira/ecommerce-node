import express, { Request , Response} from "express";

const app = express();

app.use(express.json());

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

app.get("/", (req: Request, res: Response) => {
    res.send("Bem vindo ao curso de node.js - Manual");
});

app.get("/users", (req: Request, res: Response) => {
    res.send(usuarios);
});

app.post("/users", (req: Request, res: Response) => {
    let user = req.body;
    usuarios.push(user);
    res.send({
        message: "Usuário criado com sucesso!"
    });
});

app.listen(3000, () => {
    console.log("Servidor ativo na porta 3000");
});