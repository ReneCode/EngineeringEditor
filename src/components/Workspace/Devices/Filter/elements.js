import styled, { css } from "styled-components";

export const styles = css`
  font-size: 16px;
  transition: 0.3s ease border-color;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.primaryText}
  border: none;
  outline: none;
  border-radius: 4px;
  padding: 0.25em;
  width: 100%;
  max-width: none;
  box-sizing: border-box;

  border: 1px solid
    ${props => props.theme.black} 

  &:focus {
    border-color: ${props => props.theme.secondary};
  }
`;

const Input = styled.input`
  ${styles};
`;

export const TextArea = styled.textarea`
  ${styles};
`;

export const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default Input;
