import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { Text } from 'react-native';

// import { Container } from './styles';

export default function Profile() {
  return <Text>Perfil</Text>;
}

Profile.navigationOptions = {
  title: 'Perfil',
  tabBarLabel: 'Perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};
