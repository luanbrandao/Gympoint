import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import logo from '~/assets/logo.png';
import { Container, Content, Profile, Sair } from './styles';
import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GymPoint" />
          <Link to="/dashboard_students">ALUNOS</Link>
          <Link to="/dashboard_plans">PLANOS</Link>
          <Link to="/dashboard_registrations">MATRÍCULAS</Link>
          <Link to="/dashboard">PEDIDOS DE AUXÍLIO</Link>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/profile">Meu Perfil</Link>
            </div>
            <img
              src={
                profile.avatar
                  ? profile.avatar.url
                  : 'https://api.adorable.io/avatars/50/abott@adorable.png'
              }
              alt={profile.name}
            />
          </Profile>

          <Sair>
            {/* <strong>Sair</strong> */}
            <button type="button" onClick={handleSignOut}>
              Sair
            </button>
            {/* <Link to="/profile">Sair</Link> */}
          </Sair>
        </aside>
      </Content>
    </Container>
  );
}
