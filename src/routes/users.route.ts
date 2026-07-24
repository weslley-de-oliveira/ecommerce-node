import express, { Request, Response } from "express";

// Módulo do Express pra criação e configuração de Rotas
export const userRoutes = express.Router();

let usuarios: {id: number, nome: string, email: string}[] = []
let id = 0;

userRoutes.get("/users", (req: Request, res: Response) => {
    res.send(usuarios)
})

userRoutes.get("/users/:id", (req: Request, res: Response) => {
    let userId = Number(req.params.id);
    let user = usuarios.find(user => user.id === userId);
    
    res.send(user)
})

userRoutes.post("/users", (req: Request, res: Response) => {
    let user = req.body;
    user.id = id++
    usuarios.push(user)

    res.send(usuarios)
})

userRoutes.put("/users/:id", (req: Request, res: Response) => {
    let user = req.body;
    let userId = Number(req.params.id);
    const index = usuarios.findIndex(user => user.id === userId)

    usuarios[index] = {...user, id: userId};

    res.send(usuarios)
})

userRoutes.delete("/users/:id", (req: Request, res: Response) => {
    let userId = Number(req.params.id);
    const newUsuarios = usuarios.filter(user => user.id !== userId)

    res.send(newUsuarios)
})