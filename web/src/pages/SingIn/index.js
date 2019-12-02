import React from 'react';
import { Link } from 'react-router-dom';
import logo from '~/assets/logo.png';
// import { Container } from './styles';

export default function SingIn() {
  return (
    <>
      <img src={logo} alt="Gympoint" />
      <form>
        <input type="email" placeholder="Seu e-mail" />
        <input type="password" placeholder="Seu senha secreta" />

        <button type="submit">Acessar</button>
        <Link to="/register">Criar conta gratuita</Link>
      </form>
    </>
  );
}
