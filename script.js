function searchBooks() { // cria a função searchBooks que vai solicitar as informações a APi
    const searchInput = document.getElementById("searchInput").value;
    const apiKey = "AIzaSyBFesO1tkA-qnnX7iAlCXvtCJwuHfymikY";// API google books key
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchInput}&key=${apiKey}`;//URL da APi google books
  
    // realiza a solicitação à API
    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
          throw new Error("Error fetching data from Google Books API");
        }
        return response.json();
      })
    .then(data => displayResults(data.items))
    .catch(error => console.error("Error searching books:", error));
  
    // obter o termo de pesquisa da barra de pesquisa
    const searchTerm = document.getElementById("searchInput").value;

    // adicionar o que é pesquisado ao histórico com o timestamp
    searchHistory.push({ query: searchTerm, timestamp: new Date().getTime() });

    // atualizar o histórico no localStorage
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}
  
  function displayResults(books, page = 1) {// cria a função displayResults que vai exibir os resultados na página
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";
  
    if (books && books.length > 0) { //verifica se há resultados
      const startIndex = (page - 1) * 5; // define o numero de livros da segunda página
      const endIndex = Math.min(startIndex + 9, books.length);// define o numero de livros da primeira pagina
  
      const limitedBooks = books.slice(startIndex, endIndex); // limita os resultados a ser exibidos defenido pelo starIndex e o endIndex

    // iterar (repetir) os resultados e criar elementos HTML
      limitedBooks.forEach(book => {
        const bookInfo = book.volumeInfo;
  
        const bookElement = document.createElement("div");
        bookElement.classList.add("book");
  

        // Titulo do livro
        const titleElement = document.createElement("h3");
        titleElement.textContent = bookInfo.title || "Título não encontrado";
        bookElement.appendChild(titleElement);
  
        // Autor do livro
        const authorsElement = document.createElement("p");
        authorsElement.textContent = "Autor: " + (bookInfo.authors? bookInfo.authors.join(", ") : "Autor não encontrado");
        bookElement.appendChild(authorsElement);
  
        // Editora do livro
        const publisherElement = document.createElement("p");
        publisherElement.textContent = "Editora: " + (bookInfo.publisher || "Editora não encontrada");
        bookElement.appendChild(publisherElement);
        
        // EAN e ISBN do livro
        const eanisbnElement = document.createElement("p");
        eanisbnElement.textContent = "EAN e ISBN: " + (bookInfo.industryIdentifiers? bookInfo.industryIdentifiers.map(identifier => identifier.identifier).join(", ") : "EAN e/ou ISBN não encontrados");
        bookElement.appendChild(eanisbnElement);
  
        // Gênero do livro
        const categoriesElement = document.createElement("p");
        categoriesElement.textContent = "Género Literário: " + (bookInfo.categories? bookInfo.categories.join(", ") : "Género não encontrado");
        bookElement.appendChild(categoriesElement);
  
        // Data de publicação do livro
        const publishDateElement = document.createElement("p");
        publishDateElement.textContent = "Ano de Publicação: " + (bookInfo.publishedDate || "Ano não encontrado");
        bookElement.appendChild(publishDateElement);
  
        // Número de páginas do livro\
        const pagesElement = document.createElement("p");
        pagesElement.textContent = "Número de Páginas: " + (bookInfo.pageCount || "Número de páginas não encontrado");
        bookElement.appendChild(pagesElement);
        
        // Preço do livro
        const priceElement = document.createElement("p");
        priceElement.textContent = "Preço Sugestivo: " + (book.saleInfo && book.saleInfo.listPrice && book.saleInfo.listPrice.amount? book.saleInfo.listPrice.amount + " " + book.saleInfo.listPrice.currencyCode : "Preço não disponível");
        bookElement.appendChild(priceElement);
  
        // Imagem de capa do livro
        const coverElement = document.createElement("img");
        coverElement.src = bookInfo.imageLinks? bookInfo.imageLinks.thumbnail : "capandsnvl.png";
        coverElement.alt = "Capa indisponivel";
        bookElement.appendChild(coverElement);
  
        //Sinopse do livro 
        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = "Sinopse: " + (bookInfo.description || "Sinopse não encontrada");
        bookElement.appendChild(descriptionElement);
  
        resultsContainer.appendChild(bookElement);
      });
  
      // adicionar botões de navegação/paginação
      //cria um elemnto de paginacao para ir para a pagina anterior apos 9 pesquisas serem
      if (page > 1) {
        const prevButton = document.createElement("button");
        prevButton.textContent = "Anterior";
        prevButton.addEventListener("click", () => displayResults(books, page - 1),  
        document.getElementById("results").scrollIntoView());//vai para o topo da pagina ao clicar no botão
        resultsContainer.appendChild(prevButton);
      }
     
      //cria um elemnto de paginacao para ir para a pagina seguinte apos as primeiras 5 pesquisas serem exibidas 
      if (endIndex < books.length) {
        const nextButton = document.createElement("button");
        nextButton.textContent = "Próximo";
        nextButton.addEventListener("click", () => displayResults(books, page + 1),
        document.getElementById("results").scrollIntoView());//vai para o topo da pagina ao clicar no botão);
        resultsContainer.appendChild(nextButton);
      }
     
    //Vai exibir uma mensagem de erro caso nao seja encontrado nenhum resultado
    } else {
      const noResultsElement = document.createElement("p");
      noResultsElement.textContent = "Nenhum resultado encontrado";
      resultsContainer.appendChild(noResultsElement);
    }
  }
  
  //faz com que o botão pesquisar execute a função searchBooks ao clicar na tecla Enter
  document.getElementById("searchInput").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      searchBooks();
    }
});