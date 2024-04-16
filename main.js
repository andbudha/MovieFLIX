//input auto focus on loading main page
window.setTimeout(function () {
  document.querySelector('.search-input').focus();
}, 0);

//displaying and hiding the advanced search
const filterIcon = document.querySelector('.filter');
const selectionBox = document.querySelector('.selection-box');
filterIcon.addEventListener('click', () => {
  selectionBox.classList.toggle('hidden');
});

//getting data from rest-api
const getMovies = async () => {
  const url = 'https://5b81e3264853b358.mokky.dev/cabmovies';
  const response = await fetch(url);
  const data = await response.json();
  //leaving movies with the targeted poster width of less 262px
  const movies = data.filter(
    (movie) => movie.thumbnail && movie.thumbnail_width < 262
  );
  controller(movies);
  return movies;
};

//creating input-fa-xmark icon element to reset the search-input
const searchInput = document.querySelector('.search-input');
const removeInputValueBtnBox = document.querySelector(
  '.remove-input-value-btn-box'
);
const faXmarkIcon = document.createElement('i');
faXmarkIcon.setAttribute('class', 'fa-solid fa-xmark');
searchInput.addEventListener('input', (event) => {
  if (event.target.value) {
    //appending remove-mark-icon
    removeInputValueBtnBox.appendChild(faXmarkIcon);
  }
});

//resetting search-input
faXmarkIcon.addEventListener('click', () => {
  searchInput.value = '';
  removeInputValueBtnBox.removeChild(faXmarkIcon);
});

//getting movies data and creating movie cards
const createMovieCard = (movies) => {
  const gridBox = document.querySelector('.grid-section');
  //resetting the existing data
  gridBox.innerHTML = '';
  //creating movie cards
  if (movies) {
    for (let movie of movies) {
      //creating card-box div
      const cardDiv = document.createElement('div');
      cardDiv.setAttribute('class', 'card-box');
      gridBox.appendChild(cardDiv);
      //creating card-img-box div
      const cardImgBox = document.createElement('div');
      cardImgBox.setAttribute('class', 'card-img-box');
      cardDiv.appendChild(cardImgBox);
      //creating img element
      const imgEl = document.createElement('img');
      imgEl.setAttribute('class', 'card-img');
      imgEl.setAttribute('src', movie.thumbnail);
      imgEl.setAttribute('alt', 'movie-poster');
      cardImgBox.appendChild(imgEl);
      //creating movie-detail-box
      const movieDetailBox = document.createElement('div');
      movieDetailBox.setAttribute('class', 'movie-detail-box');
      cardDiv.appendChild(movieDetailBox);
      //creating details-header-title
      const detailsHeaderTitle = document.createElement('h5');
      detailsHeaderTitle.innerText = 'Title: ';
      const titleSpan = document.createElement('span');
      titleSpan.setAttribute('class', 'details');
      titleSpan.innerText = movie.title ? movie.title : 'Uknown';
      detailsHeaderTitle.appendChild(titleSpan);
      movieDetailBox.appendChild(detailsHeaderTitle);
      //creating details-header-year
      const detailsHeaderYear = document.createElement('h5');
      detailsHeaderYear.innerText = 'Year: ';
      const yearSpan = document.createElement('span');
      yearSpan.setAttribute('class', 'details');
      yearSpan.innerText = movie.year ? movie.year : 'Uknown';
      detailsHeaderYear.appendChild(yearSpan);
      movieDetailBox.appendChild(detailsHeaderYear);
      //creating details-header-genre
      const detailsHeaderGenre = document.createElement('h5');
      detailsHeaderGenre.innerText = 'Genre: ';
      const genreSpan = document.createElement('span');
      genreSpan.setAttribute('class', 'details');
      genreSpan.innerText = movie.genres[0] ? movie.genres[0] : 'Uknown';
      detailsHeaderGenre.appendChild(genreSpan);
      movieDetailBox.appendChild(detailsHeaderGenre);
      //creating details-header-cast
      const detailsHeaderCast = document.createElement('h5');
      detailsHeaderCast.innerText = 'Starring: ';
      const castSpan = document.createElement('span');
      castSpan.setAttribute('class', 'details');
      castSpan.innerText = movie.cast[0] ? movie.cast[0] : 'Uknown';
      detailsHeaderCast.appendChild(castSpan);
      movieDetailBox.appendChild(detailsHeaderCast);
    }
  }
};

//controller function
const controller = (movies) => {
  createMovieCard(movies);
  filterByReleaseYear(movies);
  filterByGenre(movies);
  filterMoviesUponClick(movies);
  filterOnMovieTitleTyping(movies);
};
//filtering by release year
const filterByReleaseYear = (movies) => {
  //getting movie release years
  const releaseYearList = [...new Set(movies.map((movie) => movie.year))];
  //creating select element and option children
  const select = document.createElement('select');
  select.setAttribute('class', 'release-year-select');
  for (let year of releaseYearList) {
    const option = document.createElement('option');
    option.setAttribute('value', year);
    option.innerText = year;
    select.appendChild(option);
  }
  selectionBox.appendChild(select);

  const releaseYear = document.querySelector('.release-year-select');
  releaseYear.addEventListener('change', (event) => {
    const byReleaseYearFilteredMovies = movies.filter(
      (movie) => movie.year === Number(event.currentTarget.value)
    );
    createMovieCard(byReleaseYearFilteredMovies);
  });
};

//filtering by movie genre
const filterByGenre = (movies) => {
  //getting movie genre list
  const genreList = [
    ...new Set(
      movies.map((movie) => (movie.genres[0] ? movie.genres[0] : 'Unknown'))
    ),
  ];
  //creating select element and option children
  const select = document.createElement('select');
  select.setAttribute('class', 'movie-genre-select');
  for (let genre of genreList) {
    const option = document.createElement('option');
    option.setAttribute('value', genre);
    option.innerText = genre;
    select.appendChild(option);
  }
  selectionBox.appendChild(select);
  const genreSelect = document.querySelector('.movie-genre-select');
  genreSelect.addEventListener('change', (event) => {
    const byGenreFilteredMovies = movies.filter(
      (movie) => movie.genres[0] === event.currentTarget.value
    );
    createMovieCard(byGenreFilteredMovies);
  });
};

//filtering according to the search input value
const filterMoviesUponClick = (movies) => {
  const searchInput = document.querySelector('.search-input');
  const searchBtn = document.querySelector('.fa-magnifying-glass');
  searchBtn.addEventListener('click', () => {
    console.log(movies);

    const filteredMoviesUponInputValue = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchInput.value.toLowerCase())
    );
    createMovieCard(filteredMoviesUponInputValue);
  });
};

const filterOnMovieTitleTyping = (movies) => {
  const searchInput = document.querySelector('.search-input');

  searchInput.addEventListener('input', () => {
    searchtimer = setTimeout(() => {
      console.log(searchInput.value);
      const filteredMoviesUponInputValue = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchInput.value.toLowerCase())
      );
      createMovieCard(filteredMoviesUponInputValue);
      clearTimeout(searchtimer);
    }, 1500);
  });
};

//get data and create movie cards on initial rendering
getMovies();
