import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { useDispatch } from 'react-redux';
import Background from '~/components/Background';
import { signOut } from '~/store/modules/auth/actions';
import { Container, LogoutButton } from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Background>
      <Container>
        <LogoutButton onPress={handleLogout}>Sair do GoBarBar</LogoutButton>
      </Container>
    </Background>
  );
}

Profile.navigationOptions = {
  title: 'Perfil',
  tabBarLabel: 'Perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};
