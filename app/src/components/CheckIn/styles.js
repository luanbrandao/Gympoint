import styled from 'styled-components/native';

export const Container = styled.View`
  background: #fff;
  border: 1px solid #cecece;
  border-radius: 4px;
  height: 50px;
  margin: 10px;
  padding: 10px;

  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  flex: 1;
`;

export const Title = styled.Text`
  font-weight: bold;
`;
export const Time = styled.Text`
  color: #999;
`;
