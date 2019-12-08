import styled from 'styled-components';
import { darken } from 'polished';
import logoBG from '../../../assets/academia.jpg';
import colors from '~/styles/colors';

export const Wrapper = styled.div`
  height: 100%;
  background-image: url(${logoBG});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 400px;
  text-align: center;
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      /* background: rgba(0, 0, 0, 0.1); */
      background: rgba(255, 255, 255, 0.9);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: black;
      margin: 0 0 10px;

      &::placeholder {
        /* color: rgba(255, 255, 255, 0.7); */
        /* background: rgba(0, 0, 0, 0); */
      }
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: ${colors.primary};
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, `${colors.primary}`)};
      }
    }

    /* /error input */
    span {
      color: #fff;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    /* o Link do react-router-dom vira uma âncora */
    a {
      color: ${colors.primary};
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;
      font-weight: bold;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
