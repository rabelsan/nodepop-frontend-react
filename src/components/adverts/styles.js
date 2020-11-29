import styled from 'styled-components';

export const FlexBoxCol = styled.div`
  margin: 20px;
  padding: 20px;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > div {
    margin: 20px;
  }
`;

export const FlexBoxRow = styled.div`
  margin: 20px;
  padding: 20px;
  border: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  > div {
    margin: 20px;
  }
`;