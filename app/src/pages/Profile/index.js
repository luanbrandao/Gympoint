import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Background from '~/components/Background';
import { signOut } from '~/store/modules/auth/actions';
import {
  Container,
  LogoutButton,
  ContainerProfile,
  Title,
  Text,
} from './styles';
import { store } from '~/store';

export default function Profile() {
  const { student } = store.getState().auth;

  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Background>
      <Container>
        <ContainerProfile>
          <Text>
            <Title>Nome: </Title>
            {student.name}
          </Text>
          <Text>
            <Title>E-mail:</Title> {student.email}
          </Text>
          <Text>
            <Title>Telefone:</Title> {student.phone}
          </Text>
          <Text>
            <Title>Idade:</Title> {student.age} anos
          </Text>
          <Text>
            <Title>Altura:</Title> {student.height}
          </Text>
          <Text>
            <Title>Peso: </Title>
            {student.weight} KG
          </Text>

          <LogoutButton onPress={handleLogout}>Sair do GoBarBar</LogoutButton>
        </ContainerProfile>
      </Container>
    </Background>
  );
}

const tabBarIcon = ({ tintColor }) => (
  <Icon name="format-list-bulleted" size={20} color={tintColor} />
);

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Profile.navigationOptions = {
  title: 'Perfil',
  tabBarLabel: 'Perfil',
  tabBarIcon,
};
