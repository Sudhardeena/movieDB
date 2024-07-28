import styled from 'styled-components'

export const MovieDetailsBg = styled.div`
  background-image: url(${props => props.backdropPath});
  background-size: cover;
  opacity: 0.8;
  position: absolute;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
`
