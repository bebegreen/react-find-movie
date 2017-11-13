export default class Sidebar {
  constructor($container, renderByDirector, renderByActor, resetFilter) {
    this.$container = $container;
    this.renderByDirector = renderByDirector; 
    this.renderByActor = renderByActor; 
    this.resetFilter = resetFilter; 
  }

  reduceDirectors(movies) {
    const directors = movies.reduce((result, movie) => {
      let count = result[movie.director];
      result[movie.director] = count ? ++count : 1
      return result;
    }, {})
    return directors;
  }

  reduceActors(movies) {
    const actors = movies.reduce((result, movie, i, arr) => {
      movie.cast.map(actor => {
        result[actor] = result[actor] ? ++result[actor] : 1;
      })
      return result;
    }, {})
    return actors;
  }

  renderDirectors(movies) {
    const directors = this.reduceDirectors(movies);
    const title = document.createElement('h3');
    title.innerText = 'Directors';
    this.$container.appendChild(title);
    this.renderLists(directors, this.renderByDirector); 
  }

  renderActors(movies) { 
    const actors = this.reduceActors(movies);
    const title = document.createElement('h3');
    title.innerText = 'Actors';
    this.$container.appendChild(title);
    this.renderLists(actors, this.renderByActor); 
  }

  renderLists(names, render) {

    for (let name in names) {
      let li = document.createElement('li');
      li.innerText = `${name} (${names[name]})`;
      li.addEventListener('click', () => {
        render(name); 
      })
      this.$container.appendChild(li);
    }
    
  }

  render(movies) {
    this.$container.innerHTML = ''; 
    this.renderDirectors(movies);
    this.renderActors(movies);
    let reset = document.createElement('button'); 
    reset.innerText = 'reset filter'
    reset.addEventListener('click', () => { 
      this.resetFilter(); 
    })
    this.$container.appendChild(reset); 

  }
}