import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  overflow-y: overlay;
  overflow-x: auto;

  margin-top: 0.5rem;

  background-color: rgba(30, 30, 30, 0.87);
  color: #ccc;
`;

export const ItemTitle = styled.div`
  font-size: 1rem;
  font-weight: 200;

  color: ${props => props.theme.yellow}

  margin: 1rem;
  margin-bottom: 0.5 rem;
`;
