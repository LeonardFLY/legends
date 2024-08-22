const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Eee caraio"));

// Exporte o app diretamente, sem `app.listen`
// Vercel irá usar esse export como a função de entrada
module.exports = app;
