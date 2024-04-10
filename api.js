const url = 'https://5b81e3264853b358.mokky.dev/cabmovies';

const getMovies = async () => {
  try {
    const response = await fetch(url);
    const result = await response.text();
    const data = JSON.parse(result);
    console.log(data.slice(0, 8));
  } catch (error) {
    console.error(error);
  }
};
const movies = getMovies();
console.log(movies);
