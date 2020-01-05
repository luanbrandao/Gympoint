import React, { useEffect, useState } from 'react';
import { withNavigationFocus } from 'react-navigation';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';
import Background from '~/components/Background';
import api from '~/services/api';
import { store } from '~/store';
import Help from '~/components/Help';
import { Container, NewHelp, HelpList } from './styles';

function Dashboard({ isFocused, navigation }) {
  const [helps, setHelps] = useState([]);
  const { student } = store.getState().auth;

  // paginação
  const [stopRequest, setStopRequest] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  function reset() {
    setStopRequest(false);
    setPage(1);
    setHelps([]);
  }

  async function loadHelps(currentPage) {
    if (stopRequest) {
      setRefreshing(false);
      return;
    }
    setRefreshing(true);

    const response = await api.get(
      `students/${student.id}/help-orders?page=${page}`
    );

    const data =
      currentPage > 1
        ? [...helps, ...response.data.help_orders]
        : response.data.help_orders;

    const rang = response.data.help_orders.length;

    if (rang < 4) {
      Alert.alert('Checki-ins', 'Sua lista chegou ao fim.');
      setStopRequest(true);
    }

    setHelps(data);
    setRefreshing(false);
    setPage(page + 1);
  }

  useEffect(() => {
    reset();
    if (isFocused) {
      loadHelps(1);
    }
  }, [isFocused]);

  function handleDetais(help) {
    navigation.navigate('HelpDetails', { help });
  }

  function handleNewHelp() {
    navigation.navigate('HelpNew');
  }

  async function refreshList() {
    const response = await api.get(
      `students/${student.id}/help-orders?page=${1}`
    );
    const data = response.data.help_orders;
    const rang = response.data.help_orders.length;

    if (rang < 4) {
      Alert.alert('Pedidos de ajuda', 'Sua lista checgou ao fim.');
      setStopRequest(true);
    }
    setHelps(data);
    setStopRequest(false);
    setRefreshing(false);
    setPage(2);
  }

  async function loadMore() {
    setRefreshing(true);
    console.tron.log('loadMore');
    const newPage = page;
    loadHelps(newPage);
  }

  return (
    <Background>
      <Container>
        <NewHelp onPress={handleNewHelp}>Novo pedido de auxílio</NewHelp>

        <HelpList
          onRefresh={refreshList} // Função dispara quando o usuário arrasta a lista pra baixo
          refreshing={refreshing} // Variável que armazena um estado true/false que representa se a lista está atualizando
          onEndReachedThreshold={0.2} // Carrega mais itens quando chegar em 20% do fim
          // onEndThreshold={0} // Carrega mais itens quando chegar em 20% do fim
          onEndReached={loadMore} // Função que carrega mais itens
          data={helps}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Help onDetais={() => handleDetais(item)} data={item} />
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  title: 'Pedidos de ajuda',
};

export default withNavigationFocus(Dashboard);

Dashboard.propTypes = {
  isFocused: PropTypes.bool,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

Dashboard.defaultProps = {
  isFocused: false,
};
