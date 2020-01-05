import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';
import Background from '~/components/Background';
import api from '~/services/api';
import { store } from '~/store';
import { Container, Form, SubmitButton, InpuTextArea } from './styles';

export default function New({ navigation }) {
  const { student } = store.getState().auth;
  const [value, onChangeText] = useState('');
  const [loading, setLoading] = useState(false);
  async function handleSubmit() {
    setLoading(true);
    console.tron.log('data => ', value);

    try {
      await api.post(`students/${student.id}/help-orders`, {
        question: value,
      });

      navigation.navigate('HelpDashboard');
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
        <Form>
          <InpuTextArea
            onChangeText={text => onChangeText(text)}
            multiline
            numberOfLines={15}
            placeholder="Inclua seu novo pedido de auxílo"
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
          />
          <SubmitButton loading={loading} onPress={handleSubmit}>
            Novo pedido
          </SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}

New.navigationOptions = {
  title: 'Novo pedido de ajuda',
};

New.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};
