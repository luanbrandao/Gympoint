import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      // chave da aplicação no storage
      key: 'gympoint',
      storage,
      // nome dos reducers
      whitelist: ['auth', 'user'],
    },
    reducers
  );

  return persistedReducer;
};
