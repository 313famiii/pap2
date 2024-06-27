// objeto que vai armazenar o histórico de pesquisas
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

// função que atualiza o histórico de pesquisas exibido
function updateSearchHistory() {
    const historyList = document.getElementById("historyList");
    historyList.innerHTML = "";

    for (const query of searchHistory) {
        const listItem = document.createElement("li");
        listItem.textContent = query;
        historyList.appendChild(listItem);
    }
}

// função que apaga o histórico de pesquisas
function clearHistory() {
    localStorage.removeItem('searchHistory');
    searchHistory.length = 0; // Limpar o array local também
    updateSearchHistory();
}

// chamar a função que atualiza o historico de pesquiisa ao carregar a página
updateSearchHistory();

// faz com que o botão Apagar histórico execute a função clearHistory ao clicar na tecla Del ou Delete
document.addEventListener('keydown', function(event) {
    if (event.key === 'Delete' || event.key === 'del') {
        clearHistory();
    }
});

// função que vai apagar um item específico do histórico a escolha do utilizador
function deleteHistoryItem(index) {
    searchHistory.splice(index, 1);
    updateSearchHistory();
    saveHistoryToLocalStorage(); // salva no armazenamento local
}

// função que salva o histórico no armazenamento local
function saveHistoryToLocalStorage() {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

// função para carregar o histórico do armazenamento local
function loadHistoryFromLocalStorage() {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
        searchHistory = JSON.parse(savedHistory);
    }
}

// função que atualizaa o histórico que vai ser exibido const searchTerm = document.getElementById("searchInput").value;
function updateSearchHistory() {
    const historyList = document.getElementById('historyList');//cria elementos HTML para o histórico
    historyList.innerHTML = '';

    // adiciona os itens atualizados do histórico à lista
    searchHistory.forEach((item, index) => {
        const listItem = document.createElement('li');
        const itemContainer = document.createElement('div');
        itemContainer.classList.add('item-container');

        const queryText = document.createElement('span');
        queryText.textContent = item.query; // exibe a consulta de pesquisa
        queryText.classList.add('query-text');

        //Fz com que o botão apagar historico apague o histórico por completo
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.classList.add('deleteButton');
        deleteButton.onclick = function() {
            deleteHistoryItem(index);
        };

        const searchTime = new Date(item.timestamp); // cria um objeto Date com o timestamp da pesquisa
        const timeString = searchTime.toLocaleString(); // converte o objeto Date em uma string com a hora
        const timeElement = document.createElement('span');
        timeElement.textContent = timeString;
        timeElement.classList.add('historyTime');

        // adiciona o texto da pesquisa
        itemContainer.appendChild(queryText);

        // adiciona o botão "Excluir" à direita
        itemContainer.appendChild(deleteButton);

        // adiciona a hora da pesquisa à direita
        itemContainer.appendChild(timeElement);

        //adiciona os items ao container ao historico
        listItem.appendChild(itemContainer);
        historyList.appendChild(listItem);
    });
}