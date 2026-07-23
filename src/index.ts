import express from "express"

const app = express();

// Exemplo de requisição get
app.get("/", (req, res) => {
    res.send("Bem vindo ao curso de NodeJS")
})

// executa algo quando o subir o servidor
app.listen(3000, () => {
    console.log("Servidor ativo na porta 3000");
})