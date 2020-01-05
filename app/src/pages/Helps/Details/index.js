import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';
import Background from '~/components/Background';
import {
  Container,
  Question,
  Header,
  Answer,
  Title,
  Time,
  Message,
} from './styles';

export default function Details({ navigation }) {
  const help = navigation.getParam('help');

  const dateQuestion = useMemo(() => {
    return formatRelative(parseISO(help.createdAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [help.createdAt]);

  let dateAnswer;

  if (help.answer_at) {
    dateAnswer = useMemo(() => {
      return formatRelative(parseISO(help.answer_at), new Date(), {
        locale: pt,
        addSuffix: true,
      });
    }, [help.createdAt]);
  }
  console.tron.log('help => ', help);
  return (
    <Background>
      <Container>
        <Question>
          <Header>
            <Title>Pertunta</Title>
            <Time>{dateQuestion}</Time>
          </Header>
          <Message>{help.question}</Message>
        </Question>
        <Answer>
          <Header>
            <Title>Resposta</Title>
            <Time>{help.answer_at && dateAnswer ? dateAnswer : ''}</Time>
          </Header>
          <Message>
            {help.answer ? help.answer : 'Aguardando resposta!'}
          </Message>
        </Answer>
      </Container>
    </Background>
  );
}

Details.navigationOptions = ({ navigation }) => ({
  title: 'Detalhes',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('HelpDashboard');
      }}
    >
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});

Details.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};
