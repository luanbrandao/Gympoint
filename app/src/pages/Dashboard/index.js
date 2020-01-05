/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Image, Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import PropTypes from 'prop-types';
import Background from '~/components/Background';
import { Container, Header, List, BtnCheckIn } from './styles';
import CheckIn from '~/components/CheckIn';
import logo from '~/assets/header.png';
import api from '~/services/api';
import { store } from '~/store';

function Dashboard({ isFocused }) {
  const [loading, setLoading] = useState(false);
  const [stopRequest, setStopRequest] = useState(false);
  const [checkIns, setCheckIns] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const { student } = store.getState().auth;

  async function loadCheckIns(currentPage) {
    console.tron.log('currentPage -> ', currentPage);

    if (stopRequest) {
      console.tron.log('stopRequest -> ', stopRequest);
      setRefreshing(false);
      return;
    }

    setRefreshing(true);
    const response = await api.get(
      `students/${student.id}/checkins?page=${currentPage}`
    );

    const data =
      currentPage > 1
        ? [...checkIns, ...response.data.checkins]
        : response.data.checkins;

    const rang = response.data.checkins.length;

    if (rang < 6) {
      Alert.alert('Checki-ins', 'Sua lista checgou ao fim.');
      setStopRequest(true);
    }

    setCheckIns(data);
    setRefreshing(false);
    setPage(page + 1);
  }

  useEffect(() => {
    reset();
    if (isFocused) {
      loadCheckIns(1);
    }
  }, [isFocused]);

  async function handleNewCheckIn() {
    setLoading(true);
    setRefreshing(true);
    try {
      await api.post(`students/${student.id}/checkins`);
      refreshList();
      setLoading(false);
    } catch (error) {
      const msg = error.response.data.error;
      Alert.alert('Atenção', msg);
      setLoading(false);
    }
  }
  async function refreshList() {
    const response = await api.get(`students/${student.id}/checkins?page=${1}`);
    const data = response.data.checkins;
    const rang = response.data.checkins.length;

    if (rang < 6) {
      Alert.alert('Checki-ins', 'Sua lista chegou ao fim.');
      setStopRequest(true);
    }
    setCheckIns(data);
    setStopRequest(false);
    setRefreshing(false);
    setPage(2);
  }

  async function loadMore() {
    setRefreshing(true);
    console.tron.log('loadMore');
    const newPage = page;
    loadCheckIns(newPage);
  }

  function reset() {
    setStopRequest(false);
    setPage(1);
    setCheckIns([]);
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
          onRefresh={refreshList} // Função dispara quando o usuário arrasta a lista pra baixo
          refreshing={refreshing} // Variável que armazena um estado true/false que representa se a lista está atualizando
          onEndReachedThreshold={0.2} // Carrega mais itens quando chegar em 20% do fim
          // onEndThreshold={0} // Carrega mais itens quando chegar em 20% do fim
          onEndReached={loadMore} // Função que carrega mais itens
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
