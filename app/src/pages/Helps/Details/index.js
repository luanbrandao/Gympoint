import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';
// import { Container } from './styles';

export default function Details({ navigation }) {
  const help = navigation.getParam('help');
  console.tron.log('help => ', help);
  return <Background />;
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
