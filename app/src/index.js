import React from 'react';
import { StatusBar } from 'react-native';
import './config/ReactotronConfig';

import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';

import { store, persistor } from './store';
// import Routes from './routes';
import App from './App';

// yarn add react-native-linear-gradient
// react-native link react-native-linear-gradient
// yarn add styled-components
// yarn add prop-types
// yarn add react-native-vector-icons
// react-native-gesture-handler
// yarn add react-navigation
// yarn add react-native-reanimated react-native-gesture-handler react-native-screens@^1.0.0-alpha.23

export default function Index() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle="light-content" backgroundColor="#bbd2c5" />
        <App />
      </PersistGate>
    </Provider>
  );
}
