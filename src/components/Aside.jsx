import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { reduceActors, reduceDirectors } from '../helpers/movies';

const AsideStyle = styled.aside`
  grid-area: sidebar;
  padding: 0 1em;
  color: white; 
`;
const ListItem = styled.li`
  letter-spacing: 1px;
  &:hover { 
    text-decoration: underline;
    cursor: pointer;  
  }
`;

const Aside = ({ movies, filterByActor, filterByDirector }) => {
  const Directors = movies && reduceDirectors(movies);
  const Actors = movies && reduceActors(movies);
  return (
    <AsideStyle>
      <h3>Directors</h3>
      <ul>
        {Directors && Object.keys(Directors).map(name => (
          <ListItem key={name} onClick={() => filterByDirector(name)}>
            {`${name} (${Directors[name]})`}
          </ListItem>
        ))}
      </ul>
      <h3>Actors</h3>
      <ul>
        {Actors && Object.keys(Actors).map(name => (
          <ListItem key={name} onClick={() => filterByActor(name)}>
            {`${name} (${Actors[name]})`}
          </ListItem>
        ))}
      </ul>
    </AsideStyle>
  );
};

Aside.propTypes = {
  movies: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object).isRequired,
    PropTypes.string
  ]),
  filterByActor: PropTypes.func.isRequired,
  filterByDirector: PropTypes.func.isRequired,
};

export default Aside;
