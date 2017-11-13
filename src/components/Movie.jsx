import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const MovieStyle = styled.div`
    text-align: center;
    padding: 1em;

    &:hover { 
      cursor: pointer;
    }
`;
const Image = styled.img`
  width: 100%;
  height: 365px;
`;

const Movie = (props) => {
  const { movie, toggleModal } = props;
  const { title, imageUrl } = movie; 
  return (
    <MovieStyle onClick={() => toggleModal(movie)}>
      <h3>{title}</h3>
      <Image src={imageUrl} alt="error loading" />
    </MovieStyle>
  );
};


export default Movie;
