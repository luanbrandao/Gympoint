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
    const { registration } = response.data;
    console.tron.log('response.registration =>', response.registration);

    if (!student) {
      Alert.alert('Erro no login', 'O usuário não foi encontrado');
      yield put(signFailure());
      return;
    }

    // seta o token em todas as requisições
    // api.defaults.headers.Authorization = `Bearer ${token}`;

    // yield delay(3000);
    yield put(signInSuccess(student, registration));
  } catch (error) {
    console.tron.log('error => ', error.response.data.error);

    const msg =
      error.response.data.error.message ||
      error.response.data.error ||
      'Houve um erro no login, verifique seus dados';

    Alert.alert('Falha na autenticação', msg);
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
