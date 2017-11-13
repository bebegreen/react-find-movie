import React from 'react';
import styled from 'styled-components';
import PropsTypes from 'prop-types';

const FilterStyle = styled.section`
  grid-area: filter;
  padding: 0 1em 1em 0;
  display: flex; 
`;
const Input = styled.input`
  width: 100%;
  padding: 1em;
  border: none;
  border-top-left-radius: 3px; 
  border-bottom-left-radius: 3px; 
  &:focus { 
    outline: none; 
  }
`;
const ResetButton = styled.button`
  border: 1px solid transparent; 
  border-bottom-right-radius: 3px; 
  border-top-right-radius: 3px; 
  font-family: 'Oleo Script', cursive;
  transition: all 0.5s; 
  &:hover { 
    background: gray;
    cursor: pointer; 
  }

`;

const Filter = (props) => {
  const { resetFilters, filter } = props;
  let input;
  return (
    <FilterStyle>
      <Input placeholder='Search' innerRef={(el) => { input = el; }} onChange={() => filter(input.value)} />
      <ResetButton onClick={() => resetFilters()}>Reset Filters</ResetButton>
    </FilterStyle>
  );
};

Filter.propTypes = {
  resetFilters: PropsTypes.func.isRequired,
  filter: PropsTypes.func.isRequired,
};

export default Filter;
