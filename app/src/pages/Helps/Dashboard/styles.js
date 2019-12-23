import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  margin-top: 40px;
  padding-bottom: 30px;
`;

export const NewHelp = styled(Button)`
  margin: 20px;
  background: #f64c75;
`;

export const HelpList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 10 },
})``;
