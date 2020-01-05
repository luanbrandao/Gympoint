import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.ScrollView`
  flex: 1;
`;

export const LogoutButton = styled(Button)`
  margin-top: 10px;
  background: #f64c75;
`;

export const ContainerProfile = styled.View`
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  margin: 20px;
  /* padding-bottom: 20px; */
`;

export const Header = styled.Text`
  text-align: center;
  /* justify-items: center; */
  font-weight: bold;
  font-size: 25px;
`;

export const Title = styled.Text`
  font-weight: bold;
`;
export const Text = styled.Text`
  margin-left: 10px;
  font-size: 20px;
  padding-bottom: 10px;
`;
