export default class MovieList {

  constructor($container, onMovieClick) {
    this.$container = $container
    this.onMovieClick = onMovieClick; 
  }

  renderMovie(movie) {
    const { title, imageUrl, id } = movie;
    let movieDiv = document.createElement('div');
    movieDiv.className = 'movie';
    
    movieDiv.onclick = this.onMovieClick.bind(null, id); 

    movieDiv.innerHTML = `
        <h3>${title}</h3>
        <img src=${imageUrl}></img>
    `
    return movieDiv;
  }

  render(movies) {
    
    this.$container.innerHTML = '';
    movies.forEach(movie => {
      const $movieDiv = this.renderMovie(movie);
      this.$container.appendChild($movieDiv)

    });
  }
}


