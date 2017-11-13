import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Movie from './Movie';

const MovieListStyle = styled.section`
  color: black;
  grid-area: content;
  background: white;
  display: grid;
  margin: 0 1em 0 0;
  border-radius: 3px;
  grid-template-columns: repeat(4, 1fr);
`;

const Message = styled.h1`
  grid-column: 1/5; 
  text-align: center; 
`;

const MovieList = (props) => {
  const { loading, movies, error, toggleModal, displayedMovie } = props;
  return (
    <MovieListStyle>
      {error && <Message>Error occured, check your server</Message>}
      {loading && <Message>Loading... </Message>}
      {movies && movies.map((movie) => (
        <Movie key={movie.id} movie={movie} toggleModal={toggleModal} />
      ))}
    </MovieListStyle>
  );
};

MovieList.propTypes = {
  loading: PropTypes.bool.isRequired,
  movies: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object).isRequired,
    PropTypes.string
  ])
};

export default MovieList;
