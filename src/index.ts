import express, { Request, Response } from "express"

const app = express();

app.use(express.json());

let usuarios: {id: number, nome: string, email: string}[] = []
let id = 0;

app.get("/", (req: Request, res: Response) => {
    res.send("Bem vindo ao curso de NodeJS")
})

app.get("/users", (req: Request, res: Response) => {
    res.send(usuarios)
})

app.get("/users/:id", (req: Request, res: Response) => {
    let userId = Number(req.params.id);
    let user = usuarios.find(user => user.id === userId);
    
    res.send(user)
})

app.post("/users", (req: Request, res: Response) => {
    let user = req.body;
    user.id = id++
    usuarios.push(user)

    res.send(usuarios)
})

app.put("/users/:id", (req: Request, res: Response) => {
    let user = req.body;
    let userId = Number(req.params.id);
    const index = usuarios.findIndex(user => user.id === userId)

    usuarios[index] = {...user, id: userId};

    res.send(usuarios)
})

app.delete("/users/:id", (req: Request, res: Response) => {
    let userId = Number(req.params.id);
    const newUsuarios = usuarios.filter(user => user.id !== userId)

    res.send(newUsuarios)
})

// executa algo quando o subir o servidor
app.listen(3000, () => {
    console.log("Servidor ativo na porta 3000");
})