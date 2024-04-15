//input auto focus on loading main page
window.setTimeout(function () {
  document.querySelector('.search-input').focus();
}, 0);
//dom references
const gridBox = document.querySelector('.grid-section');
const searchInput = document.querySelector('.search-input');
const removeInputValueBtnBox = document.querySelector(
  '.remove-input-value-btn-box'
);
const searchBtn = document.querySelector('.fa-magnifying-glass');
const filter = document.querySelector('.filter');
const selectionBox = document.querySelector('.selection-box');

filter.addEventListener('click', () => {
  selectionBox.classList.toggle('hidden');
});
//getting data
const getMovies = async () => {
  const url = 'https://5b81e3264853b358.mokky.dev/cabmovies';
  const response = await fetch('data.json');
  const data = await response.json();
  //leaving movies with the targeted poster width of less 262px
  const moviesWithApproprPosterSize = data.filter(
    (movie) => movie.thumbnail_width < 262
  );
  createMovieCard(moviesWithApproprPosterSize.slice(1, 9));

  return moviesWithApproprPosterSize;
};

//creating fa-xmark icon element
const faXmarkIcon = document.createElement('i');
faXmarkIcon.setAttribute('class', 'fa-solid fa-xmark');

searchInput.addEventListener('input', (event) => {
  if (event.target.value) {
    //appending remove-mark-icon
    removeInputValueBtnBox.appendChild(faXmarkIcon);
  }
});

//reseting search-input
faXmarkIcon.addEventListener('click', () => {
  searchInput.value = '';
  removeInputValueBtnBox.removeChild(faXmarkIcon);
});

//getting movies data and creating movie cards
const createMovieCard = (movies) => {
  if (!movies) {
    //creating loader box
    const loaderBox = document.createElement('div');
    loaderBox.setAttribute('class', 'loader-box');
    gridBox.appendChild(loaderBox);
    const loaderSpan = document.createElement('span');
    loaderSpan.setAttribute('class', 'loader');
    loaderBox.appendChild(loaderSpan);
  } else {
    const loaderBox = document.querySelector('.loader-box');
    loaderBox.remove();

    const searchInputFilteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes('')
    );

    //creating movie cards
    for (let movie of searchInputFilteredMovies) {
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

//get data and create movie cards on initial rendering
getMovies();
createMovieCard();
