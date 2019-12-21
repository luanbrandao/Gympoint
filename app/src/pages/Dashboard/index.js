import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Image } from 'react-native';
import Background from '~/components/Background';
import { Container, Header, List, BtnCheckIn } from './styles';
import CheckIn from '~/components/CheckIn';
import logo from '~/assets/logo.png';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
export default function Dashboard() {
  return (
    <Background>
      <Container>
        <Header>
          <Image source={logo} />
        </Header>
        <BtnCheckIn>Novo Check-in</BtnCheckIn>
        <List
          data={data}
          keyExtractor={item => String(item)}
          renderItem={({ item }) => <CheckIn data={item} />}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  title: 'ola mundo',
  tabBarLabel: 'Check-Ins',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="check" size={20} color={tintColor} />
  ),
};
