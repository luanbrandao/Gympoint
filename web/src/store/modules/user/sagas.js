import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { updateProfileSuccess, updateProfileFailute } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, phone, avatar_id, ...rest } = payload.data;

    const profile = {
      name,
      email,
      phone,
      avatar_id,
      ...(rest.oldPassword ? rest : {}),
    };
    console.tron.log('date profile => ', profile);
    const response = yield call(api.put, 'users', profile);
    toast.success('Perfil atualizado com sucesso!');
    yield put(updateProfileSuccess(response.data));
  } catch (error) {
    // toast.error('Erro ao atualizar perfil, confira seus dados!');
    toast.error(error.response.data.error);
    yield put(updateProfileFailute());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
