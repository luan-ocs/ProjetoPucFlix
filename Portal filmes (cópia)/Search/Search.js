let pesquisar = (query) =>{
    let apiKey = "756a9a575c39bb425f46d2db1f7bec3c"
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=pt-BR`)
    xhr.onload = ShowMovies
    xhr.send()
}
if(localStorage.getItem("query") != null){
    pesquisar(localStorage.getItem("query"))
}

function ShowMovies(){
    let data = JSON.parse(this.responseText)
    let text = ""
    data.results.forEach(movie => {
        console.log(movie)
        text += `
        <div class="card">
            <img src="https://www.themoviedb.org/t/p/w780${movie.poster_path}" class="card-img-top" alt="imagem não carregada">
            <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">${movie.overview}.</p>
                <a href="https://www.themoviedb.org/movie/${movie.id}" class="btn btn-primary">Ler Mais</a>
            </div>
        </div>
        `;
    })

    let divPesquisa = document.getElementById("divPesquisa")
    divPesquisa.innerHTML = text
}
function SearchbyInput(){
    let query = input.value;
    pesquisar(query);
    localStorage.setItem("query", query)
}

let form = document.getElementById("form");
let input = document.getElementById("search");

form.addEventListener("submit", e => {
    e.preventDefault()
    SearchbyInput();
})
