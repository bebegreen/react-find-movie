import React from 'react';
import styled from 'styled-components';

const HeaderStyle = styled.header`
  color: white; 
  grid-area: header;
  padding: 1em;
  font-family: 'Marck Script', cursive;
  text-align: center;
`;

const Header = () => (
  <HeaderStyle>
    <h1>
      Movie Night
    </h1>
  </HeaderStyle>
);

export default Header;
