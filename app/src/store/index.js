import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './modules/rootReducer';
import persistReducer from './persistReducer';

import rootSaga from './modules/rootSaga';
import createStore from './createStore';

const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const middlewares = [sagaMiddleware];

// const store = createStore(reducer);
// const store = createStore(rootReducer, middlewares);
const store = createStore(persistReducer(rootReducer), middlewares);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

// export default store;
export { store, persistor };
