import styled, { css, keyframes } from 'styled-components';
import Container from '../Container';

export type TrafficLightProps = {
  status : number   
}

const TrafficLight = ({ status = 0 } : TrafficLightProps) => {
  
  return (
    <StyledComponent>
        <Container className={ status === 1 ? "traffic__light--green-solid" : "traffic__light--green-outline"} />
        <Container className={ status === 2 ? "traffic__light--yellow-solid" : "traffic__light--yellow-outline"} />
        <Container className={ status === 3 ? "traffic__light--red-solid" : "traffic__light--red-outline"} />
    </StyledComponent>
  );
}

export default TrafficLight;


const StyledComponent = styled(Container)`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: center;  
    align-items: center;

    .traffic__light {
      display: flex;
      gap: 5px;

      &--green-outline, &--yellow-outline, &--red-outline {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid transparent;
      }

      &--green-outline {
        border-color: lightgreen
      }

      &--yellow-outline {
        border-color: yellow
      }

      &--red-outline {
        border-color: lightcoral
      }

      &--green-solid, &--yellow-solid, &--red-solid {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        animation: 4s infinite;
      }

      &--green-solid {
        background-color: lightgreen;
      }

      &--yellow-solid {
        background-color: yellow;
      }

      &--red-solid {
        background-color:  lightcoral;
      }
    }
  `}
`;
