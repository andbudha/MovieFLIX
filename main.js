/*****************refresh page upon logo click*************/
const logo = document.querySelector('.logo-box');
logo.addEventListener('click', () => {
  const gridBox = document.querySelector('.grid-section');
  gridBox.innerHTML = '';
  getMovies();
});

/*****************show/hide the advanced search filter upon icon click*************/
const filterIcon = document.querySelector('.filter');
const selectionBox = document.querySelector('.selection-box');
filterIcon.addEventListener('click', () => {
  selectionBox.classList.toggle('hidden');
});

/*****************hiding the advanced search filter func*************/
function hideAdvancedSearch() {
  const selectionBox = document.querySelector('.selection-box');
  if (!selectionBox.classList.contains('hidden')) {
    selectionBox.classList.add('hidden');
  }
}

/*****************getting data from rest-api*************/
async function getMovies() {
  showSpinner();
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if (!data.length && data.statusCode === 404) {
      console.log(data);
      errorCatching(data);
    } else if (!data.length && data.statusCode === 403) {
      console.log(data);
      errorCatching(data);
    } else {
      hideSpinner();
      controller(data);
    }
  } catch (error) {
    console.log(error);
    const errorObj = {
      statusCode: 'Some Error Occurred',
      message: 'Try Again Later, Please!',
    };
    errorCatching(errorObj);
  } finally {
    hideSpinner();
  }
}

/************ Error Catching Func***********/
function errorCatching(error) {
  const gridBox = document.querySelector('.grid-section');
  gridBox.innerHTML = '';

  //resetting paginator inneHTML content
  pageBox.innerHTML = '';

  //creating the div element for no-match-found notification
  const errorBox = document.createElement('div');
  errorBox.setAttribute('class', 'no-match-found-box');
  const noConnectionIcon = document.createElement('span');
  noConnectionIcon.setAttribute(
    'class',
    'material-symbols-outlined connection-error'
  );
  noConnectionIcon.innerText = 'link_off';
  errorBox.appendChild(noConnectionIcon);
  const errorStatus = document.createElement('h1');
  errorStatus.innerText =
    error.statusCode === 404 || error.statusCode === 403
      ? `ERROR ${error.statusCode}`
      : error.statusCode;
  errorBox.appendChild(errorStatus);
  const errorMessage = document.createElement('h2');
  errorMessage.innerText = error.message;
  errorBox.appendChild(errorMessage);
  gridBox.appendChild(errorBox);
}

/*****************creating xmark icon element to reset the search-input*************/
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
  if (!event.target.value && faXmarkIcon) {
    removeInputValueBtnBox.removeChild(faXmarkIcon);
  }
  hideAdvancedSearch();
});

/************ refetching data on search input focus***********/
searchInput.addEventListener('focus', () => {
  const gridBox = document.querySelector('.grid-section');
  gridBox.innerHTML = '';
  currentPage = 1;
  hideAdvancedSearch();
  showSpinner();
  setTimeout(() => {
    getMovies();
    hideSpinner();
  }, 300);
});

/************ resetting search-input func***********/
function resetSearchInput() {
  const gridBox = document.querySelector('.grid-section');
  gridBox.innerHTML = '';
  searchInput.value = '';
  removeInputValueBtnBox.removeChild(faXmarkIcon);
  hideAdvancedSearch();
  getMovies();
}
faXmarkIcon.addEventListener('click', resetSearchInput);

/************ creating, showing and hiding spinner ***********/
function showSpinner() {
  const gridBox = document.querySelector('.grid-section');
  const loaderBox = document.createElement('div');
  loaderBox.setAttribute('class', 'loader-box');
  gridBox.appendChild(loaderBox);
  const loaderSpan = document.createElement('span');
  loaderSpan.setAttribute('class', 'loader');
  loaderBox.appendChild(loaderSpan);
}
function hideSpinner() {
  const loaderBox = document.querySelector('.loader-box');
  if (loaderBox) loaderBox.remove();
}

/************ getting movies data and creating movie cards ***********/
function createMovieCard(movies) {
  //resetting the existing data
  const gridBox = document.querySelector('.grid-section');
  gridBox.innerHTML = '';

  //looping through the data in oder to create cards
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
    imgEl.setAttribute('value', movie.title);
    cardImgBox.appendChild(imgEl);
    magnifyPoster(cardDiv, imgEl, movie.title);
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

/************ poster magnifying upon hovering ***********/
function magnifyPoster(cardDiv, imgEl, movieTitle) {
  if (imgEl) {
    cardDiv.addEventListener('mouseover', (event) => {
      event.stopPropagation();
      const value = imgEl.getAttribute('value');
      const title = movieTitle;
      if (value === title) {
        imgEl.classList.remove('card-img');
        imgEl.classList.add('magnified-img');
      }
    });
  }

  if (imgEl) {
    imgEl.addEventListener('mouseout', (event) => {
      event.stopPropagation();
      const value = imgEl.getAttribute('value');
      const title = movieTitle;
      if (value === title) {
        imgEl.classList.remove('magnified-img');
        imgEl.classList.add('card-img');
      }
    });
  }
}

/************ controller function ***********/
function controller(movies) {
  createMovieCard(movies);
  filterOnMovieTitleTyping(movies);
  getSelectOptionValues(movies);
  initializePaginator(movies, currentPage);
}

/************ filtering according to the search input value***********/
function filterOnMovieTitleTyping(movies) {
  const searchInput = document.querySelector('.search-input');

  searchInput.addEventListener('input', () => {
    const filteredMoviesUponInputValue = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchInput.value.toLowerCase())
    );
    if (filteredMoviesUponInputValue.length) {
      initializePaginator(filteredMoviesUponInputValue, currentPage);
    } else {
      displayNoMatchFound();
    }

    // clearTimeout(searchtimer);
    // searchtimer = setTimeout(function () {
    //   const filteredMoviesUponInputValue = movies.filter((movie) =>
    //     movie.title.toLowerCase().includes(searchInput.value.toLowerCase())
    //   );
    //   if (filteredMoviesUponInputValue.length) {
    //     initializePaginator(filteredMoviesUponInputValue, currentPage);
    //   } else {
    //     displayNoMatchFound();
    //   }
    // }, 1000);
  });
}

/************ individual&combined data filtering ***********/
function getSelectOptionValues(movies) {
  const selectGenre = document.querySelector('.movie-genre-select');
  const selectYear = document.querySelector('.release-year-select');
  selectGenre.innerHTML = '';
  selectYear.innerHTML = '';

  //getting movie release years
  const yearListObj = new Set(movies.map((movie) => movie.year));
  const yearListArr = [...yearListObj];
  const sortedReleaseYearList = yearListArr.sort((a, b) => (a > b ? 1 : -1));

  //creating year select element and appending option children
  const anyYearOption = document.createElement('option');
  anyYearOption.setAttribute('value', '0');
  anyYearOption.innerText = 'any year';
  selectYear.appendChild(anyYearOption);

  for (let year of sortedReleaseYearList) {
    const option = document.createElement('option');
    option.setAttribute('value', year);
    option.innerText = year;
    selectYear.appendChild(option);
  }
  selectionBox.appendChild(selectYear);

  //getting movie genre list
  const genreListObj = new Set(
    movies.map((movie) => (movie.genres[0] ? movie.genres[0] : 'Unknown'))
  );
  const genreListArr = [...genreListObj];
  const sortedGenreList = genreListArr.sort((a, b) => (a > b ? 1 : -1));

  //creating initial genre option element
  const allGenresOption = document.createElement('option');
  allGenresOption.setAttribute('value', 'all');
  allGenresOption.innerText = 'all genres';
  selectGenre.appendChild(allGenresOption);
  //creating genre option element and appending to their parent element
  for (let genre of sortedGenreList) {
    const option = document.createElement('option');
    option.setAttribute('value', genre);
    option.innerText = genre;
    selectGenre.appendChild(option);
  }
  selectionBox.appendChild(selectGenre);

  //initial select input values
  let defaultReleaseYear = 0;
  let selectOptionValues = { genre: 'all', year: defaultReleaseYear };

  //filtering by genre
  const genreSelect = document.querySelector('.movie-genre-select');

  genreSelect.addEventListener('change', (event) => {
    selectOptionValues.genre = event.currentTarget.value;
  });

  //filtering by release year
  const releaseYear = document.querySelector('.release-year-select');

  releaseYear.addEventListener('change', (event) => {
    selectOptionValues.year = Number(event.currentTarget.value);
  });

  //filtering data on search-btn click
  const searchBtn = document.querySelector('.search-btn');
  searchBtn.addEventListener('click', () => {
    const gridBox = document.querySelector('.grid-section');
    if (
      selectOptionValues.year === defaultReleaseYear &&
      selectOptionValues.genre === 'all'
    ) {
      gridBox.innerHTML = '';
      showSpinner();
      setTimeout(() => {
        initializePaginator(movies, 1);
        hideSpinner();
      }, 500);
    } else if (
      selectOptionValues.year !== defaultReleaseYear &&
      selectOptionValues.genre === 'all'
    ) {
      const filteredByYear = movies.filter(
        (movie) => movie.year === selectOptionValues.year
      );
      gridBox.innerHTML = '';
      showSpinner();
      setTimeout(() => {
        initializePaginator(filteredByYear, 1);
        hideSpinner();
      }, 500);
    } else if (
      selectOptionValues.genre !== 'all' &&
      selectOptionValues.year === defaultReleaseYear
    ) {
      const filteredByGenre = movies.filter(
        (movie) => movie.genres[0] === selectOptionValues.genre
      );
      gridBox.innerHTML = '';
      showSpinner();
      setTimeout(() => {
        initializePaginator(filteredByGenre, 1);
        hideSpinner();
      }, 500);
    } else {
      const filteredByGenreAndYear = movies.filter((movie) => {
        return (
          movie.year === selectOptionValues.year &&
          movie.genres[0] === selectOptionValues.genre
        );
      });
      if (!filteredByGenreAndYear.length) {
        gridBox.innerHTML = '';
        showSpinner();
        setTimeout(() => {
          displayNoMatchFound();
          hideSpinner();
        }, 500);
      } else {
        gridBox.innerHTML = '';
        showSpinner();
        setTimeout(() => {
          initializePaginator(filteredByGenreAndYear, 1);
          hideSpinner();
        }, 500);
      }
    }
  });
}

/*************** initializing and creating the paginator ****************/
const pageBox = document.querySelector('.page-box');

//paginator initial values
let currentPage = 1;
const itemsPerPage = 8;

function initializePaginator(movies, currentPage) {
  //resetting paginator inneHTML content
  pageBox.innerHTML = '';

  const totalPageNum = Math.ceil(movies.length / itemsPerPage);
  let start = itemsPerPage * (currentPage - 1);
  let end = start + itemsPerPage;
  let paginatedMovies = movies.slice(start, end);
  createMovieCard(paginatedMovies);
  createPageBtns(totalPageNum, movies);
  const btn = document.querySelectorAll('.page')[currentPage - 1];
  btn.classList.add('active-page');
}

function createPageBtns(totalPageNum, movies) {
  for (let i = 1; i <= totalPageNum; i++) {
    const page = document.createElement('div');
    page.setAttribute('class', 'page');
    page.innerText = i;
    pageBox.appendChild(page);
    pageBtn(page, i, movies);
  }
}

function pageBtn(pageBtn, pageNum, movies) {
  pageBtn.innerText = pageNum;
  pageBtn.addEventListener('click', () => {
    currentPage = pageNum;
    initializePaginator(movies, currentPage);
  });
}

/******************creating, showing and hiding the no-match-found notification****************/
function displayNoMatchFound() {
  const gridBox = document.querySelector('.grid-section');
  gridBox.innerHTML = '';

  //resetting paginator inneHTML content
  pageBox.innerHTML = '';

  //creating the div element for no-match-found notification
  const noMatchFoundBox = document.createElement('div');
  noMatchFoundBox.setAttribute('class', 'no-match-found-box');
  const sadFaceIcon = document.createElement('i');
  sadFaceIcon.setAttribute('class', 'fa-regular fa-face-sad-tear fa-5x');
  noMatchFoundBox.appendChild(sadFaceIcon);
  const sorryText = document.createElement('h2');
  sorryText.innerText = 'Sorry';
  noMatchFoundBox.appendChild(sorryText);
  const noMatchFoundText = document.createElement('h2');
  noMatchFoundText.innerText = 'No Match Found!';
  noMatchFoundBox.appendChild(noMatchFoundText);
  gridBox.appendChild(noMatchFoundBox);
}

//hiding no-match-found notification
function hideNoMatchFound() {
  const noMatchFoundBox = document.querySelector('.no-match-found-box');
  noMatchFoundBox.classList.add('hide-no-match-found-box');
  console.log(noMatchFoundBox);
}

/*********************get data and create movie cards on initial rendering***********************/
getMovies();
