const API_KEY = "9e7877af-7c8a-41bf-9574-4c8eefc9ec3f";
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_MOVIES&page=1";
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword="


getMovies(API_URL_POPULAR);

async function getMovies(url) {
  const resp = await fetch(url, {
    headers: {
      'X-API-KEY': API_KEY,
      'Content-Type': 'application/json',
    }
  })
  const respData = await resp.json();
  console.log(respData)
  showMovies(respData)
}

function getClassByRate(vote) {
  if (vote >= 7) {
    return "green";
  } else if (vote > 5) {
    return "orange";
  } else {
    return "red"
  }
}

function showMovies (data) {
  const moviesEl = document.querySelector(".movies");

  //отчистка предыдущих фильмов
  document.querySelector(".movies").innerHTML = "";

  data.items.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
    <div class="movie__cover-inner">
      <img src="${movie.posterUrlPreview}" alt="${movie.nameRu}" class="movie__cover">
      <div class="movie__cover--dakened"></div>
    </div>

    <div class="movie__info">
      <div class="movie__title">${movie.nameRu}</div>
      <div class="movie__category">${movie.genres.map(genre => ` ${genre.genre}`)}</div>
      <div class="movie__average movie__average--${getClassByRate(movie.ratingKinopoisk)}">${movie.ratingKinopoisk}</div>
    </div>
    `;
    moviesEl.appendChild(movieEl);
  });
};

const form = document.querySelector("form");
const search = document.querySelector(".header__search");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;

  if (search.value) {
    console.log(getMovies(apiSearchUrl))
    getMovies(apiSearchUrl);
    search.value = "";
  }
});

