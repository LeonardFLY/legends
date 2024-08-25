const fs = require('fs');
const path = require('path');

const basePath = path.join(__dirname, '../Cartas Tabletopia');
const folders = [
    'Verde/Campeões', 'Verde/Criatura', 'Verde/Feitiço', 'Verde/Feitiço acelerado', 'Verde/Encanto', 'Verde/Artefato', 'Verde/Terreno Cruel',
    'Roxo/Campeões', 'Roxo/Criatura', 'Roxo/Feitiço', 'Roxo/Feitiço acelerado', 'Roxo/Encanto', 'Roxo/Artefato', 'Roxo/Terreno Cruel',
    'Azul/Campeões', 'Azul/Criatura', 'Azul/Feitiço', 'Azul/Feitiço acelerado', 'Azul/Encanto', 'Azul/Artefato', 'Azul/Terreno Cruel',
    'Vermelho/Campeões', 'Vermelho/Criatura', 'Vermelho/Feitiço', 'Vermelho/Feitiço acelerado', 'Vermelho/Encanto', 'Vermelho/Artefato', 'Vermelho/Terreno Cruel',
    'Neutro/Campeões', 'Neutro/Criatura', 'Neutro/Feitiço', 'Neutro/Feitiço acelerado', 'Neutro/Encanto', 'Neutro/Artefato', 'Neutro/Terreno Cruel',
    'Multi/Campeões', 'Multi/Criatura', 'Multi/Feitiço', 'Multi/Feitiço acelerado', 'Multi/Encanto', 'Multi/Artefato', 'Multi/Terreno Cruel'
];

const fileCounts = {};
const filePath = path.join(__dirname, './fileCounts.json'); // Caminho para o arquivo JSON

// Função para remover o arquivo JSON se ele existir
const removeFileIfExists = () => {
    return new Promise((resolve, reject) => {
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (!err) {
                fs.unlink(filePath, (unlinkErr) => {
                    if (unlinkErr) {
                        console.error(`Erro ao remover o arquivo ${filePath}:`, unlinkErr);
                        reject(unlinkErr);
                    } else {
                        resolve();
                    }
                });
            } else {
                resolve();
            }
        });
    });
};

// Função para contar o número de arquivos em cada pasta
const getFileCounts = (folderPath, folderName) => {
    return new Promise((resolve, reject) => {
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                console.error(`Erro ao ler a pasta ${folderPath}:`, err);
                reject(err);
            } else {
                fileCounts[folderName] = files.length;
                resolve();
            }
        });
    });
};

// Função principal para processar as pastas e gerar o arquivo JSON
const processFolders = async () => {
    try {
        await removeFileIfExists(); // Remove o arquivo existente, se houver

        for (const folder of folders) {
            const folderPath = path.join(basePath, folder);
            await getFileCounts(folderPath, folder);
        }

        await fs.promises.writeFile(filePath, JSON.stringify(fileCounts, null, 2));
        console.log(`fileCounts.json gerado com sucesso no caminho: ${filePath}`);
    } catch (err) {
        console.error('Erro ao processar as pastas:', err);
    }
};

processFolders();
