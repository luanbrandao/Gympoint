import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Image, Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import PropTypes from 'prop-types';
import Background from '~/components/Background';
import { Container, Header, List, BtnCheckIn } from './styles';
import CheckIn from '~/components/CheckIn';
import logo from '~/assets/logo.png';
import api from '~/services/api';
import { store } from '~/store';

function Dashboard({ isFocused }) {
  const [loading, setLoading] = useState(false);
  const [checkIns, setCheckIns] = useState([]);
  const { student } = store.getState().auth;

  async function loadCheckIns() {
    const response = await api.get(`students/${student.id}/checkins`);
    console.tron.log(
      'response.data.checkins -> ',
      response.data.checkins.length
    );
    setCheckIns(response.data.checkins);
  }

  useEffect(() => {
    if (isFocused) {
      loadCheckIns();
    }
  }, [isFocused]);

  async function handleNewCheckIn() {
    setLoading(true);
    try {
      await api.post(`students/${student.id}/checkins`);
      loadCheckIns();
      setLoading(false);
    } catch (error) {
      const msg = error.response.data.error;
      Alert.alert('Atenção', msg);
      setLoading(false);
    }
  }

  return (
    <Background>
      <Container>
        <Header>
          <Image source={logo} />
        </Header>
        <BtnCheckIn loading={loading} onPress={handleNewCheckIn}>
          {' '}
          Novo Check-in
        </BtnCheckIn>
        <List
          data={checkIns}
          keyExtractor={item => String(item.id)}
          renderItem={({ item, index }) => (
            <CheckIn data={{ item, index }} rang={checkIns.length} />
          )}
        />
      </Container>
    </Background>
  );
}

const tabBarIcon = ({ tintColor }) => (
  <Icon name="format-list-bulleted" size={20} color={tintColor} />
);

Dashboard.navigationOptions = {
  tabBarLabel: 'Check-Ins',
  // tabBarIcon: ({ tintColor }) => (
  //   <Icon name="check" size={20} color={tintColor} />
  // ),
  tabBarIcon,
};

export default withNavigationFocus(Dashboard);

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Dashboard.propTypes = {
  isFocused: PropTypes.bool,
};

Dashboard.defaultProps = {
  isFocused: false,
};
