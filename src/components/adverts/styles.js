import styled from 'styled-components';

const FlexBox = styled.div`
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

export default FlexBox;
