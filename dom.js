//dom references
const gridBox = document.querySelector('.grid-box');

console.log(movies);
//getting movies data
const createMovieCard = () => {
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
  imgEl.setAttribute(
    'src',
    'https://upload.wikimedia.org/wikipedia/en/8/80/The_Irishman_poster.jpg'
  );
  imgEl.setAttribute('alt', 'movie-poster');
  cardImgBox.appendChild(imgEl);
  //creating movie-detail-box
  const movieDetailBox = document.createElement('div');
  movieDetailBox.setAttribute('class', 'movie-detail-box');
  cardDiv.appendChild(movieDetailBox);
  console.log(cardDiv);
  //creating details-header-title
  const detailsHeaderTitle = document.createElement('h5');
  detailsHeaderTitle.innerText = 'Title: ';
  const titleSpan = document.createElement('span');
  titleSpan.setAttribute('class', 'details');
  titleSpan.innerText = 'The Irishman';
  detailsHeaderTitle.appendChild(titleSpan);
  movieDetailBox.appendChild(detailsHeaderTitle);
  //creating details-header-year
  const detailsHeaderYear = document.createElement('h5');
  detailsHeaderYear.innerText = 'Year: ';
  const yearSpan = document.createElement('span');
  yearSpan.setAttribute('class', 'details');
  yearSpan.innerText = '2010';
  detailsHeaderYear.appendChild(yearSpan);
  movieDetailBox.appendChild(detailsHeaderYear);
  //creating details-header-genre
  const detailsHeaderGenre = document.createElement('h5');
  detailsHeaderGenre.innerText = 'Genre: ';
  const genreSpan = document.createElement('span');
  genreSpan.setAttribute('class', 'details');
  genreSpan.innerText = 'Crime, Drama';
  detailsHeaderGenre.appendChild(genreSpan);
  movieDetailBox.appendChild(detailsHeaderGenre);
  //creating details-header-cast
  const detailsHeaderCast = document.createElement('h5');
  detailsHeaderCast.innerText = 'Cast: ';
  const castSpan = document.createElement('span');
  castSpan.setAttribute('class', 'details');
  castSpan.innerText = 'Matt Damon, Robert De Niro';
  detailsHeaderCast.appendChild(castSpan);
  movieDetailBox.appendChild(detailsHeaderCast);
};

createMovieCard();
