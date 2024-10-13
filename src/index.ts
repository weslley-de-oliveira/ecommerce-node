import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("Bem vindo ao curso de node.js - Manual");
})

app.listen(3000, () => {
    console.log("Servidor ativo na porta 3000");
});