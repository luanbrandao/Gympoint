import React from 'react';
import { Container, NewHelp } from './styles';
import Background from '~/components/Background';

export default function Dashboard() {
  return (
    <Background>
      <Container>
        <NewHelp onPress={() => {}}>Novo pedido de auxílio</NewHelp>
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  title: 'Pedidos de ajuda',
};
