let form = document.getElementById("form");
let cards = "";
let trailers = [];
let ApiReq = (url, next) => {
  let apiKey = "756a9a575c39bb425f46d2db1f7bec3c";
  let xhr = new XMLHttpRequest();
  xhr.open("GET", `${url}?api_key=${apiKey}&language=pt-BR`);
  xhr.onload = next;
  xhr.send();
};
function EmDestaqueCards() {
  let data = JSON.parse(this.responseText);
  let movies = data.results;
  sessionStorage.setItem("movies", JSON.stringify(movies));
  printCards(movies, 3);
}
function printCards(movies, num) {
  cards = "";
  for (let i = 0; i <= num; i++) {
    cards += `
        <div class="col-6 col-md-3 col-lg-3 text-sm-center poster">
        <a href="https://www.themoviedb.org/${movies[i].media_type}/${movies[i].id}"><img src="https://www.themoviedb.org/t/p/w780${movies[i].poster_path}" alt="imgSearch"></a>
        </div>
    `;
  }
  let CardsDiv = document.getElementById("CardsDiv");
  CardsDiv.innerHTML = cards;
}
// configurando search

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let query = document.getElementById("search").value;
  sessionStorage.setItem("query", query);
  window.location.href = "./Portal filmes (cópia)/Search/Search.html";
});

// configurando botao
function buttonsCard() {
  let buttonCard = document.getElementById("buttonCard");
  let num = 3;
  buttonCard.onclick = (e) => {
    let movies = JSON.parse(sessionStorage.getItem("movies"));
    num += 4;
    printCards(movies, num);
  };
}
window.onload = () =>{
ApiReq("https://api.themoviedb.org/3/movie/now_playing", carouselconfig);
ApiReq("https://api.themoviedb.org/3/trending/movies/week", EmDestaqueCards);
}
buttonsCard();
