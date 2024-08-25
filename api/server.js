const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

// Caminho base para as pastas
const basePath = path.join(__dirname, 'Cartas Tabletopia');

// Listagem das pastas para processamento
const folders = [
    'Verde/Campeões', 'Verde/Criatura', 'Verde/Feitiço', 'Verde/Feitiço Acelerado', 'Verde/Encanto', 'Verde/Artefato', 'Verde/Terreno Cruel',
    'Roxo/Campeões', 'Roxo/Criatura', 'Roxo/Feitiço', 'Roxo/Feitiço Acelerado', 'Roxo/Encanto', 'Roxo/Artefato', 'Roxo/Terreno Cruel',
    'Azul/Campeões', 'Azul/Criatura', 'Azul/Feitiço', 'Azul/Feitiço Acelerado', 'Azul/Encanto', 'Azul/Artefato', 'Azul/Terreno Cruel',
    'Vermelho/Campeões', 'Vermelho/Criatura', 'Vermelho/Feitiço', 'Vermelho/Feitiço Acelerado', 'Vermelho/Encanto', 'Vermelho/Artefato', 'Vermelho/Terreno Cruel',
    'Neutro/Campeões', 'Neutro/Criatura', 'Neutro/Feitiço', 'Neutro/Feitiço Acelerado', 'Neutro/Encanto', 'Neutro/Artefato', 'Neutro/Terreno Cruel',
    'Multi/Campeões', 'Multi/Criatura', 'Multi/Feitiço', 'Multi/Feitiço Acelerado', 'Multi/Encanto', 'Multi/Artefato', 'Multi/Terreno Cruel'
];

// Função para contar o número de arquivos em cada pasta
const countFiles = (folderPath, folderName) => {
    return new Promise((resolve, reject) => {
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                reject(err);
            } else {
                resolve({ [folderName]: files.length });
            }
        });
    });
};

// Endpoint para contar arquivos e enviar como JSON
app.get('/fileCounts', async (req, res) => {
    const fileCounts = {};

    try {
        for (const folder of folders) {
            const folderPath = path.join(basePath, folder);
            const result = await countFiles(folderPath, folder);
            Object.assign(fileCounts, result);
        }
        
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(fileCounts, null, 2));
    } catch (err) {
        res.status(500).send('Erro ao contar arquivos');
    }
});

// Configurar o cache control para arquivos estáticos
app.use(express.static(path.join(__dirname), {
    maxAge: '1d' // Cache por 1 dia
}));

// Serve o arquivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
