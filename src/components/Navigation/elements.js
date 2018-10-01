import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 4rem;
  flex: 0 0 4rem;
  height: 100%;

  font-size: 1.5rem;
  align-items: center;

  color: ${props => props.theme.white}
  background-color: ${props => props.theme.background}
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s ease all;
  height: 64px;
  width: 64px;
  cursor: pointer;

`;
