import { MovieData } from './api.js';

const urlParams = new URLSearchParams(window.location.search);
const movie_id = urlParams.get('movie');
const movie = new MovieData(movie_id);

movie.then(({ title, year, director, cast, imageUrl }) => {

  let poster = document.getElementById('poster');
  poster.src = imageUrl;
})


