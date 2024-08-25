document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.getElementById('card-blue');
    let loadedImages = 0;
    let totalImages = 0;
    const imagePaths = [];

    // Função para carregar o arquivo JSON
    fetch('/api/fileCounts.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(fileCounts => {
            Object.keys(fileCounts).forEach(folder => {
                const totalCards = fileCounts[folder];
                for (let i = 1; i <= totalCards; i++) {
                    const cardPath = `Cartas Tabletopia/${folder}/Carta (${i}).png`;
                    const card = document.createElement('div');
                    card.className = 'card';
                    const img = document.createElement('img');
                    img.src = cardPath;
                    img.alt = `Carta ${i}`;
                    img.loading = 'lazy'; // Aplicar lazy loading
                    img.style.display = 'none';
                    card.appendChild(img);
                    cardContainer.appendChild(card);

                    // Armazena os caminhos das imagens para controle
                    imagePaths.push(cardPath);
                    totalImages++;

                    img.onload = () => {
                        loadedImages++;
                        if (loadedImages === totalImages) {
                            // Atualiza a página quando todas as imagens forem carregadas
                            window.location.reload();
                        }
                    };

                    img.onerror = () => {
                        console.error(`Erro ao carregar imagem: ${cardPath}`);
                        loadedImages++;
                        if (loadedImages === totalImages) {
                            // Atualiza a página mesmo se houver erro em algumas imagens
                            window.location.reload();
                        }
                    };
                }
            });
        })
        .catch(error => {
            console.error('Erro ao carregar o arquivo JSON:', error);
        });

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
            currentImageIndex = totalImages - 1;
        }
        modalImg.src = imagePaths[currentImageIndex];
    });

    nextButton.addEventListener('click', () => {
        currentImageIndex++;
        if (currentImageIndex >= totalImages) {
            currentImageIndex = 0;
        }
        modalImg.src = imagePaths[currentImageIndex];
    });
});
