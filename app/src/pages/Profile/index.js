import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Background from '~/components/Background';
import { signOut } from '~/store/modules/auth/actions';
import {
  Container,
  LogoutButton,
  ContainerProfile,
  Header,
  Title,
  Text,
} from './styles';
import { store } from '~/store';

export default function Profile() {
  const { student } = store.getState().auth;
  const { registration } = store.getState().auth;

  function formatDate(date) {
    return format(parseISO(date), "'dia' dd 'de' MMMM", {
      locale: pt,
    });
  }

  function formatMonth(month) {
    return month === 1 ? `${month} mês` : `${month} meses`;
  }
  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Background>
      <Container>
        <ContainerProfile>
          <Header>Seus Dados</Header>

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
        </ContainerProfile>

        <ContainerProfile>
          <Header>Matrícula</Header>

          <Text>
            <Title>Início: </Title>
            {formatDate(registration.start_date)}
          </Text>

          <Text>
            <Title>Término: </Title>
            {formatDate(registration.end_date)}
          </Text>
        </ContainerProfile>

        <ContainerProfile>
          <Header>Plano</Header>

          <Text>
            <Title>Título: </Title>
            {registration.plan.title}
          </Text>

          <Text>
            <Title>Duração: </Title>
            {formatMonth(registration.plan.duration)}
          </Text>

          <Text>
            <Title>Valor/Mês: </Title>
            R$: {registration.plan.price}
          </Text>

          <Text>
            <Title>Valor Total: </Title>
            R$: {registration.plan.total_price}
          </Text>
        </ContainerProfile>
      </Container>
      <LogoutButton onPress={handleLogout}>Sair do GymPoint</LogoutButton>
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
