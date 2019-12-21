import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
`;
export const Header = styled.View`
  /* background: #fff; */
  /* width: 100%; */
  align-self: center;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})``;

export const BtnCheckIn = styled(Button)`
  /* margin-top: 5px; */
  margin: 10px;
  background: #f14e63;
`;
