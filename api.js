const url = 'https://5b81e3264853b358.mokky.dev/cabmovies';

const getMovies = async () => {
  const response = await fetch(url);
  const data = await response.json();
  createMovieCard(data.slice(1, 6));
  return data;
};

console.log(getMovies());
