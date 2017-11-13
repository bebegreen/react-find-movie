import React, { Component } from 'react';
import styled from 'styled-components';
import { getTrailer } from '../helpers/Api';

const ModalBackground = styled.div`
  background: rgba(0,0,0,0.8);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const ModalBox = styled.div`
  background: white;
  width: 75%;
  height: 60%;
  margin: 0 auto;
  top: 20%;
  position: relative;
  color: black;
  position: relative;
  display: grid;
  grid-template-areas: 'iframe title title'
                       'iframe cast director'
                       'iframe actions actions';
  grid-template-columns: 50% 1fr 1fr;
  grid-template-rows:1fr 4fr;
  text-align: center;
`;
const Iframe = styled.iframe`
  grid-area: iframe;
  width: 100%;
  height: 100%;
  background: black;
`;
const Title = styled.h1`
  text-align: center;
  grid-area: title;
`;
const Cast = styled.section`
  grid-area: cast;
  list-style: none;
  margin: 0;
`;
const Director = styled.section`
  grid-area:director;
  margin: 0
`;

export default class Modal extends Component {

  componentDidMount() {
    getTrailer(this.props.displayedMovie.title)
      .then((videoId) => {
        this.iframe.src = `https://www.youtube.com/embed/${videoId}`;
      });
  }

  render() {
    const { toggleModal, displayedMovie: movie } = this.props;
    const { title, cast, director } = movie;
    return (
      <ModalBackground onClick={toggleModal}>
        <ModalBox onClick={e => e.stopPropagation()}>
          <Title>{title}</Title>
          <Iframe
            innerRef={(el) => { this.iframe = el; }}
            frameborder="0"
            gesture="media"
            allowfullscreen
          />
          <Cast>
            <h2>Cast: </h2>
            {cast.map(actor => <li>{actor}</li>)}
          </Cast>
          <Director>
            <h2>Director:</h2>
            {director}
          </Director>
        </ModalBox>
      </ModalBackground>
    );
  }
}

