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
};

function getFilmName(nameRu, nameEn) {
  if (nameRu){
    return nameRu
  } else {
    return nameEn
  }
};

function getFilmRating(rating) {
  if (rating == "null"){
    return "0.0"
  } else {
    return rating
  }
};

function showMovies (data) {
  const moviesEl = document.querySelector(".movies");

  //отчистка предыдущих фильмов
  document.querySelector(".movies").innerHTML = "";

  if (data.items) {
    data.items.forEach((movie) => {
      const movieEl = document.createElement("div");
      movieEl.classList.add("movie");
      movieEl.innerHTML = `
      <div class="movie__cover-inner">
        <img src="${movie.posterUrlPreview}" alt="${getFilmName(movie.nameRu, movie.nameEn)}" class="movie__cover">
        <div class="movie__cover--dakened"></div>
      </div>
      <div class="movie__info">
        <div class="movie__title">${getFilmName(movie.nameRu, movie.nameEn)}</div>
        <div class="movie__category">${movie.genres.map(genre => ` ${genre.genre}`)}</div>
        <div class="movie__average movie__average--${getClassByRate(movie.ratingKinopoisk)}">${getFilmRating(movie.ratingKinopoisk)}</div>
      </div>
      `;
      movieEl.addEventListener("click", () => openModal(movie.kinopoiskId));
      moviesEl.appendChild(movieEl);
    });
  }

  if (data.films) {
    data.films.forEach((movie) => {
      const movieEl = document.createElement("div");
      movieEl.classList.add("movie");
      
      movieEl.innerHTML = `
      <div class="movie__cover-inner">
        <img src="${movie.posterUrlPreview}" alt="${getFilmName(movie.nameRu, movie.nameEn)}" class="movie__cover">
        <div class="movie__cover--dakened"></div>
      </div>
      <div class="movie__info">
        <div class="movie__title">${getFilmName(movie.nameRu, movie.nameEn)}</div>
        <div class="movie__category">${movie.genres.map(genre => ` ${genre.genre}`)}</div>
        <div class="movie__average movie__average--${getClassByRate(movie.rating)}">${getFilmRating(movie.rating)}</div>
      </div>
      `
      ;
      movieEl.addEventListener("click", () => openModal(movie.filmId));
      moviesEl.appendChild(movieEl);
    });
  }
};

const form = document.querySelector("form");
const search = document.querySelector(".header__search");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
  if (search.value) {
    getMovies(apiSearchUrl);
    search.value = "";
  }
});


//modal
const modalEl = document.querySelector(".modal");

async function openModal(id) {
  modalEl.classList.add("modal--show");
  console.log(modalEl);
  console.log(id);

  modalEl.innerHTML = `
    <div class="modal__card">
      <img class="modal__movie-backdrop" src="изображение" alt="">
      <h2>
        <span class="modal__movie-title">Заголовок</span>
        <span class="modal__movie-release-year"> - год</span>
      </h2>
      <ul class="modal__movie-info">
        <div class="loader"></div>
        <li class="modal__movie-genre">Жанр - жанр</li>
      </ul>
      <button type="button" class="modal__button-close">Закрыть</button>
    </div>
  `  
}

