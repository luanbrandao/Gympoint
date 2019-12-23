import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Image, Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Background from '~/components/Background';
import { Container, Header, List, BtnCheckIn } from './styles';
import CheckIn from '~/components/CheckIn';
import logo from '~/assets/logo.png';
import api from '~/services/api';
import { store } from '~/store';

function Dashboard({ isFocused }) {
  const [checkIns, setCheckIns] = useState([]);
  const { student } = store.getState().auth;

  async function loadCheckIns() {
    const response = await api.get(`students/${student.id}/checkins`);
    setCheckIns(response.data.checkins);
  }

  useEffect(() => {
    if (isFocused) {
      loadCheckIns();
    }
  }, [isFocused]);

  async function handleNewCheckIn() {
    try {
      await api.post(`students/${student.id}/checkins`);
      loadCheckIns();
    } catch (error) {
      const msg = error.response.data.error;
      Alert.alert('Atenção', msg);
    }
  }

  return (
    <Background>
      <Container>
        <Header>
          <Image source={logo} />
        </Header>
        <BtnCheckIn onPress={handleNewCheckIn}> Novo Check-in</BtnCheckIn>
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

export default withNavigationFocus(Dashboard);
