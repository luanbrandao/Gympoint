import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const HelpContainer = styled(RectButton)`
  margin: 10px;
  background: #fff;
  border-radius: 4px;
`;
export const HelpInfo = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
`;

export const HelpStatus = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const HelpStatusText = styled.Text``;

export const HelpTime = styled.Text``;

export const HelpQuestion = styled.Text.attrs({
  numberOfLines: 4,
})`
  margin: 10px;
`;
