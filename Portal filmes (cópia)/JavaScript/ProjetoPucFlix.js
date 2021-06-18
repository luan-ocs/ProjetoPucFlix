let form = document.getElementById("form");

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
  localStorage.setItem("query", query);
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
window.onload = () => {
  ApiReq("https://api.themoviedb.org/3/trending/movies/week", EmDestaqueCards);
  buttonsCard();
};

// pegar os videos dos lancamentos !
function getElementsOfApi(query) {
  let Elements = [];
  let apiKey = "756a9a575c39bb425f46d2db1f7bec3c";
  async function ApiReq(url, next){
    let xhr = new XMLHttpRequest();
    console.log(url);
    xhr.open("GET", `${url}?api_key=${apiKey}&language=pt-BR`);
    let data = await fetch(`${url}?api_key${apiKey}&language=pt-BR`).then((data) => data.json().then((data) => data.results))
    next(data)
  };

  async function element(p){
    let movie = p;
    let video = await fetch(
      `https://api.themoviedb.org/3/movie/${p.id}/videos?api_key=${apiKey}&language=pt-BR`).then((response) => {
      response.json().then((data) => data) ;
    });
    movie.video_id = video;
    Elements.push(movie);
  };
  async function addElement(responseText) {
    let data = responseText;
    console.log(data)
    data.results.forEach((Movie) => {
      element(Movie);
    });
  }
  ApiReq(query, addElement);

  return Elements;
}
let element = getElementsOfApi(
  "https://api.themoviedb.org/3/movie/now_playing"
);
console.log(element);

// 756a9a575c39bb425f46d2db1f7bec3c <-- apiKey
