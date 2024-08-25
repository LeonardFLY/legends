const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Configurar o cache control para arquivos estáticos
app.use(express.static(path.join(__dirname), {
    maxAge: '1d' // Cache por 1 dia
}));


// Endpoint para servir o arquivo JSON
app.get('/fileCounts.json', (req, res) => {
    const filePath = path.join(__dirname, 'fileCounts.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Erro ao ler o arquivo JSON');
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        }
    });
});

module.exports = app;

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
