import styled from 'styled-components/native';
import { Platform } from 'react-native';
import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;
export const Form = styled.View`
  align-self: stretch;
  margin-top: 50px;
`;

export const ContainerInput = styled.View`
  /* background: #fff; */
`;

export const InpuTextArea = styled.TextInput.attrs({
  placeholderTextColor: '#000',
})`
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.7);
  font-size: 15px;

  /* background: #fff; */
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
  background: #f64c75;
`;
