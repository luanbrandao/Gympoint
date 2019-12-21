// import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      // chave da aplicação no storage
      key: 'gobarber',
      storage: AsyncStorage,
      // nome dos reducers
      whitelist: ['auth', 'user'],
    },
    reducers
  );

  return persistedReducer;
};
