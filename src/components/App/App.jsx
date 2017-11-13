import React, { Component } from 'react';
import styled from 'styled-components';
import Header from '../Header';
import Aside from '../Aside';
import Filter from '../Filter';
import MovieList from '../MoviesList';
import MovieModal from '../Modal.jsx'
import { getMovies } from '../../helpers/Api';

const API_KEY = 'AIzaSyAIxD-v8MU7mDhSCngsr6QGutxaPXbyrGY';

const Main = styled.main`
  background: #175071;
  width: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: 0fr 0fr 3fr;
  grid-column-gap: 1em;
  font-family: 'Oleo Script', cursive;
  grid-template-areas: "header header" "sidebar filter" "sidebar content" "sidebar  content" "sidebar  content"
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: '',
      displayedMovies: '',
      loading: false,
      error: false,
      modalOpen: false,
      displayedMovie: '',
      gapiReady: false
    };
    this.filterByActor = this.filterByActor.bind(this);
    this.filterByDirector = this.filterByDirector.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
    this.filterBySearch = this.filterBySearch.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentWillMount() {
    this.setState({ loading: true });
    getMovies().then((movies) => {
      this.setState({ movies, displayedMovies: movies, loading: false });
    })
      .catch(err => {
        this.setState({ error: true, loading: false })
      })
  }
  loadYoutubeApi() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";

    script.onload = () => {
      const gapi = window.gapi;
      gapi.load('client', () => {
        gapi.client.setApiKey(API_KEY);
        gapi.client.load('youtube', 'v3', () => {
          this.setState({ gapiReady: true });
        });
      });
    };

    document.body.appendChild(script);
  }

  componentDidMount() {
    this.loadYoutubeApi();
  }
  filterByDirector(name) {
    const displayedMovies = this.state.movies.filter(movie => movie.director === name);
    this.setState({ displayedMovies });
  }
  filterByActor(name) {
    const displayedMovies = this.state.movies.filter(movie => movie.cast.indexOf(name) >= 0);
    this.setState({ displayedMovies });
  }
  filterBySearch(searchQuery) {
    const displayedMovies = this.state.movies.filter(movie =>
      movie.title.toLowerCase().includes(searchQuery));
    this.setState({ displayedMovies });
  }
  resetFilters() {
    this.setState({ displayedMovies: this.state.movies });
  }
  toggleModal(displayedMovie) {
    this.setState({ modalOpen: !this.state.modalOpen, displayedMovie })
  }
  render() {
    const { loading, error, movies, displayedMovies, modalOpen, displayedMovie } = this.state;
    return (
      <Main>
        <Header />
        <Aside
          movies={movies}
          filterByActor={this.filterByActor}
          filterByDirector={this.filterByDirector}
        />
        <Filter
          resetFilters={this.resetFilters}
          filter={this.filterBySearch}
        />
        <MovieList
          loading={loading}
          error={error}
          movies={displayedMovies}
          toggleModal={this.toggleModal}
          displayedMovie={displayedMovie}
        />
        {modalOpen &&
          <MovieModal
            toggleModal={this.toggleModal}
            displayedMovie={displayedMovie}
          />}

      </Main>
    );
  }
}

export default App;
