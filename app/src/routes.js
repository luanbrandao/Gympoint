import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import HelpDashboard from './pages/Helps/Dashboard';
import HelpDetails from './pages/Helps/Details';
import HelpNew from './pages/Helps/New';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator(
          {
            Dashboard,
            Helps: {
              // createStackNavigator navegação por pilha
              screen: createStackNavigator(
                {
                  HelpDashboard,
                  HelpDetails,
                  HelpNew,
                },
                {
                  defaultNavigationOptions: {
                    headerTransparent: true,
                    headerTintColor: '#fff',
                    headerLeftContainerStyle: { marginLeft: 20 },
                    activeTintColor: '#E05463',
                  },
                }
              ),
              navigationOptions: {
                tabBarLabel: 'Pedir ajuda',
                tabBarIcon: <Icon name="live-help" size={20} color="#536976" />,
                activeTintColor: '#E05463',
              },
            },

            Profile,
          },
          {
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#E05463',
              inactiveTintColor: '#536976',
              style: {
                backgroundColor: '#bbd2c5',
              },
            },
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  );
