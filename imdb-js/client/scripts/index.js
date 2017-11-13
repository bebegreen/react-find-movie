import { Api, MovieData, getTrailer, deleteMovie, postMovie, editMovie } from './api.js'
import MovieList from './movieList.js'
import Sidebar from './sidebar.js'

const $movies = document.getElementById('movie-list');
const $sidebar = document.getElementById('sidebar');
const $filter = document.getElementById('filter');

let api = new Api();
const movieList = new MovieList($movies, fetchMovieData)
const sidebar = new Sidebar($sidebar, renderByDirector, renderByActor, resetFilter);

let allMovies;

api.then(movies => {
  allMovies = movies;
  movieList.render(movies);
  sidebar.render(movies);

  $filter.addEventListener('input', ({ target }) => {
    movieList.render(movies.filter(movie => movie.title.toLowerCase().includes(target.value)))
  })

})

function renderByDirector(name) {
  movieList.render(allMovies.filter(movie => movie.director === name))
}

function renderByActor(name) {
  movieList.render(allMovies.filter(movie => movie.cast.indexOf(name) >= 0))

}

function resetFilter() {
  movieList.render(allMovies);
}

function fetchMovieData(movie_id) {

  document.getElementsByTagName('form')[0].style.display = 'none';

  document.getElementById('details').style.display = 'grid'

  openDialog()
  const movie = allMovies.find(movie => movie.id === movie_id);
  displayTrailer(movie);
  injectInfo(movie);
  addDeleteButton(movie);

  document.getElementById('edit').onclick = () => {
    showForm();
    document.getElementById('movie-title').value = movie.title;
    document.getElementById('movie-director').value = movie.director;
    document.getElementById('movie-year').value = movie.year;
    document.getElementById('movie-cast').value = movie.cast.join(', ');
    document.getElementById('movie-image').value = movie.imageUrl;
    document.getElementById('submit').onclick = async (e) => {
      e.preventDefault();
      const body = getFormValues()
      await editMovie(body, movie.id);
      reRenderList()
      document.getElementById('dialog').style.display = 'none';

    }

  }

}



function injectInfo(movie) {
  const $title = document.getElementById('title');
  $title.innerText = `${movie.title} (${movie.year})`;
  const $cast = document.getElementById('cast');
  $cast.innerHTML = `<div><h2>Cast:</h2>` + movie.cast.map(actor => `<p>${actor}</p>`).join('') + `</div>
    <div><h2>Director:</h2> <p>${movie.director}</P><a href=${movie.imdbUrl}> ${movie.title} on imdb </a></div>
  `
}



async function displayTrailer(movie) {
  let iframe = document.getElementsByTagName('iframe')[0];
  let spinner = document.getElementById('spinner');
  iframe.style.display = 'none';
  spinner.style.display = 'block';
  iframe.src = '';

  const trailer_id = await getTrailer(movie.title);
  spinner.style.display = 'none';
  iframe.src = `https://www.youtube.com/embed/${trailer_id}`
  iframe.style.display = 'block';

}

function openDialog() {
  let dialog = document.getElementById('dialog')
  dialog.style.display = 'block';
  dialog.onclick = () => {
    dialog.style.display = 'none';
    const confirm = document.getElementById('confirm').style.display = 'none'
    const yes = document.getElementById('yes').style.display = 'none'
    const cancel = document.getElementById('cancel').style.display = 'none'
    document.getElementById('delete').style.display = 'block';
  }
  document.getElementById('dialog-box').onclick = (e) => e.stopPropagation();

}

document.getElementById('add').onclick = () => {
  showForm();
  document.getElementById('movie-title').value = '';
  document.getElementById('movie-director').value = '';
  document.getElementById('movie-year').value = '';
  document.getElementById('movie-cast').value = '';
  document.getElementById('movie-image').value = '';

  document.getElementById('submit').onclick = async (e) => {
    e.preventDefault();
    const body = getFormValues();
    await postMovie(body);
    reRenderList();
    document.getElementById('dialog').style.display = 'none';
  }


}

function showForm() {
  openDialog();
  document.getElementById('details').style.display = 'none';
  document.getElementsByTagName('form')[0].style.display = 'flex';
}


function getFormValues() {
  const inputs = document.getElementsByTagName('input');
  const body = {};
  [].forEach.call(inputs, (input, i) => {
    if (i > 0) {
      if (input.name === 'cast') { body[input.name] = [input.value] }
      else {
        body[input.name] = input.value;
      }
    }

  })
  return body;
}



function addDeleteButton(movie) {
  const $delete = document.getElementById('delete');
  $delete.onclick = () => {
    const $confirm = document.getElementById('confirm')
    $confirm.style.display = 'inline-block'
    const $yes = document.getElementById('yes')
    $yes.style.display = 'inline-block'
    const $cancel = document.getElementById('cancel')
    $cancel.style.display = 'inline-block';
    $delete.style.display = 'none';
    $yes.onclick = () => {

      deleteMovie(movie.id).then(res => {
        const confirm = document.getElementById('confirm').style.display = 'none'
        const yes = document.getElementById('yes').style.display = 'none'
        const cancel = document.getElementById('cancel').style.display = 'none'
        document.getElementById('delete').style.display = 'block';
        document.getElementById('dialog').style.display = 'none';

        reRenderList();

      });
    }
  }
}

function reRenderList() {
  Api().then(movies => {
    allMovies = movies;
    movieList.render(movies);
    sidebar.render(movies);
  });
}







