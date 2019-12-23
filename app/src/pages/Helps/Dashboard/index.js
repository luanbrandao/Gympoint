import React, { useEffect, useState } from 'react';
import { withNavigationFocus } from 'react-navigation';

import Background from '~/components/Background';
import api from '~/services/api';
import { store } from '~/store';
import Help from '~/components/Help';

import { Container, NewHelp, HelpList } from './styles';

function Dashboard({ isFocused, navigation }) {
  const [helps, setHelps] = useState([]);
  const { student } = store.getState().auth;

  async function loadHelps() {
    const response = await api.get(`students/${student.id}/help-orders`);
    console.tron.log('response => ', response.data.help_orders);
    setHelps(response.data.help_orders);
  }

  useEffect(() => {
    if (isFocused) {
      loadHelps();
    }
  }, [isFocused]);

  function handleDetais(help) {
    navigation.navigate('HelpDetails', { help });
  }
  return (
    <Background>
      <Container>
        <NewHelp onPress={() => {}}>Novo pedido de auxílio</NewHelp>

        <HelpList
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
