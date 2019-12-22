import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import { Container } from './styles';
import Background from '~/components/Background';

export default function Dashboard() {
  return <Background />;
}

Dashboard.navigationOptions = ({ navigation }) => ({
  title: 'Pedidos de ajuda',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Dashboard');
      }}
    >
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});
