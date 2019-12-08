import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { signInRequest } from '~/store/modules/auth/actions';
import logo from '~/assets/logo.png';
import {} from '~/pages/_layouts/resister/styles';

export default function Register_Student() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Insira um e-mail válido')
      .required('O e-mail é obrigatório'),
    password: Yup.string().required('A senha é obrigatório'),
  });

  function handleSubmit({ email, password }) {
    console.tron.log('email, password', email, password);
    dispatch(signInRequest(email, password));
    // console.tron.log(email, password);
  }

  return (
    <>
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Seu senha secreta"
        />

        <button type="submit">{loading ? 'Carregando...' : 'Acessar'}</button>
        <Link to="/register">Criar conta gratuita</Link>
      </Form>
    </>
  );
}
