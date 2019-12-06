import styled from 'styled-components';
import colors from '~/styles/colors';
// http://avatars.adorable.io/

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
  border-bottom: 1px solid #eee;
  box-shadow: 1px 1px #888888;
`;
export const Content = styled.div`
  height: 64px;
  /* se a page fica muito grande, deixa centralizado */
  max-width: 900px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      height: 30px;
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }

    a {
      font-weight: bold;
      margin-left: 10px;
      color: black;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;
export const Profile = styled.div`
  display: flex;
  margin: 0 20px 0 20px;
  padding: 0 20px 0 20px;
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: flex;
      color: #333;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #999;
    }
  }
  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
`;

export const Sair = styled.div`
  button {
    padding: 10px;
    color: ${colors.primary};
    background: none;
    border: none;
  }
`;
