// configurando o Search

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let query = document.getElementById("search").value;
  localStorage.setItem("query", query);
  window.location.href = "../Search/Search.html";
});

// requisição api
let ApiReq = (url, next) => {
  let apiKey = "756a9a575c39bb425f46d2db1f7bec3c";
  let xhr = new XMLHttpRequest();
  xhr.open("GET", `${url}?api_key=${apiKey}&language=pt-BR`);
  xhr.onload = next;
  xhr.send();
};

function ShowMovies() {
  let data = JSON.parse(this.responseText);
  console.log(data);
  let text = "";
  data.results.forEach((movie) => {
    console.log(movie);
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

    // text += `
    // <div class="col-6 col-md-4 col-lg-4 text-sm-center poster">
    // <h4>${movie.title}</h4>
    // <a href="https://www.themoviedb.org/movie/${movie.id}"><img src="https://www.themoviedb.org/t/p/w780${movie.poster_path}" alt="imgSearch"></a>
    // <h5>Sinopse:</h5>
    // <p>${movie.overview}</p>
    // </div>`
  });
  let divPopular = document.getElementById("divPopular");
  divPopular.innerHTML = text;
}

window.onload = () => {
  ApiReq("https://api.themoviedb.org/3/movie/popular", ShowMovies);
};
