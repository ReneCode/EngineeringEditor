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

  background-color: rgba(30,30,30,0.6);
  color: #ccc;

  border: 1px solid red;
`;

export const ItemTitle = styled.div`
  font-size: 1rem;
  font-weight: 400;

  margin: 1rem;
  margin-bottom: 0.5 rem;
`;
