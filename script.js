document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.getElementById('card-blue');
    const imagePaths = [];

    // Função para criar e adicionar cards
    const addCards = (folder, totalCards) => {
        for (let i = 1; i <= totalCards; i++) {
            const cardPath = `Cartas Tabletopia/${folder}/Carta (${i}).png`;
            const card = document.createElement('div');
            card.className = 'card';

            const img = document.createElement('img');
            img.src = cardPath;
            img.alt = `Carta ${i}`;
            img.loading = 'lazy'; // Aplicar lazy loading
            img.style.opacity = 0; // Ocultar até que a imagem esteja carregada

            card.appendChild(img);
            cardContainer.appendChild(card);

            // Armazena os caminhos das imagens para controle
            imagePaths.push(cardPath);

            img.onload = () => {
                img.style.opacity = 1; // Mostrar a imagem quando carregada
            };

            img.onerror = () => {
                console.error(`Erro ao carregar imagem: ${cardPath}`);
            };
        }
    };

    // Função para carregar o arquivo JSON com a contagem de arquivos
    fetch('/fileCounts')
        .then(response => response.json())
        .then(fileCounts => {
            Object.keys(fileCounts).forEach(folder => {
                addCards(folder, fileCounts[folder]);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar o arquivo JSON:', error);
        });

    // Código para o modal
    const modal = document.getElementById('myModal');
    const modalImg = document.getElementById('img01');
    const closeModal = document.querySelector('.close');
    let currentImageIndex = 0;

    cardContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            modal.style.display = 'flex';
            modalImg.src = e.target.src;
            currentImageIndex = Array.from(cardContainer.children).indexOf(e.target.parentNode);
        }
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    const prevButton = document.createElement('button');
    prevButton.classList.add('prev-button');
    prevButton.textContent = '<';

    const nextButton = document.createElement('button');
    nextButton.classList.add('next-button');
    nextButton.textContent = '>';

    modal.appendChild(prevButton);
    modal.appendChild(modalImg);
    modal.appendChild(nextButton);

    prevButton.addEventListener('click', () => {
        currentImageIndex--;
        if (currentImageIndex < 0) {
            currentImageIndex = imagePaths.length - 1;
        }
        modalImg.src = imagePaths[currentImageIndex];
    });

    nextButton.addEventListener('click', () => {
        currentImageIndex++;
        if (currentImageIndex >= imagePaths.length) {
            currentImageIndex = 0;
        }
        modalImg.src = imagePaths[currentImageIndex];
    });
});
