import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';
import api from '~/services/api';
import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;
    console.tron.log('blz =>', id);

    // const response = yield call(api.post, `students/${id}/checkins`);

    const response = yield call(api.post, 'sessions-students', {
      id,
    });

    const { student } = response.data;
    console.tron.log('response.data =>', response.data);

    if (!student) {
      Alert.alert('Erro no login', 'O usuário não foi encontrado');
      yield put(signFailure());
      return;
    }

    // seta o token em todas as requisições
    // api.defaults.headers.Authorization = `Bearer ${token}`;

    // yield delay(3000);
    yield put(signInSuccess(student));
  } catch (error) {
    console.tron.log('error => ', error);
    Alert.alert(
      'Falha na autenticação',
      // 'Houve um erro no login, verifique seus dados'
      error.response.data.error ||
        'Houve um erro no login, verifique seus dados'
    );
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
