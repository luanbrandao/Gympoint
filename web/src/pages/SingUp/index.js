import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import InputMask from 'react-input-mask';
import logo from '~/assets/logo.png';
import { signUpRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'No mínimo 6 caracteres')
    .required('A senha é obrigatório'),
  phone: Yup.string().required('O telefone é obrigatório'),
});

export default function SingUp() {
  const dispatch = useDispatch();

  function handleSubmit({ name, email, password, phone }) {
    dispatch(signUpRequest(name, email, password, phone));
  }
  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome Completo" />
        <Input name="email" type="email" placeholder="Seu e-mail" />
        {/* <Input name="phone" placeholder="Seu telefone" /> */}

        {/* <p>Telefone</p> */}
        <InputMask mask="99 99999-9999">
          {() => (
            <Input
              type="text"
              name="phone"
              placeholder="Seu telefone"
              required
            />
          )}
        </InputMask>

        <Input
          name="password"
          type="password"
          placeholder="Seu senha secreta"
        />

        <button type="submit">Criar Conta</button>
        <Link to="/">já tenho login</Link>
      </Form>
    </>
  );
}
