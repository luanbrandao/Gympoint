import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Image } from 'react-native';
import Background from '~/components/Background';
import { Container, Header, List, BtnCheckIn } from './styles';
import CheckIn from '~/components/CheckIn';
import logo from '~/assets/logo.png';
import api from '~/services/api';
import { store } from '~/store';

export default function Dashboard() {
  const [checkIns, setCheckIns] = useState([]);
  const { student } = store.getState().auth;

  useEffect(() => {
    async function loadCheckIns() {
      const response = await api.get(`students/${student.id}/checkins`);
      setCheckIns(response.data.checkins);
    }
    loadCheckIns();
  }, []);

  return (
    <Background>
      <Container>
        <Header>
          <Image source={logo} />
        </Header>
        <BtnCheckIn>Novo Check-in</BtnCheckIn>
        <List
          data={checkIns}
          keyExtractor={item => String(item.id)}
          renderItem={({ item, index }) => <CheckIn data={{ item, index }} />}
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
