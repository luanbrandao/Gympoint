import styled from 'styled-components';
import { darken } from 'polished';
import colors from '~/styles/colors';

export const Container = styled.div`
  background-color: ${colors.bg_grey};

  max-width: 60%;
  margin: 50px auto;
  border-radius: 5px;
  padding: 20px;

  input[type='text'],
  [type='number'],
  [type='date'],
  [type='email'] {
    border: 1px solid lightblue;
    border-radius: 4px;
    /* padding: 20px; */
    margin-right: 10px;
    margin-top: 5px;
  }
  select[type='text'],
  [type='number'],
  [type='date'],
  [type='email'] {
    border: 1px solid lightblue;
    border-radius: 4px;
    /* padding: 20px; */
    margin-right: 10px;
    margin-top: 5px;
  }

  input[type='text']:focus,
  [type='number']:focus,
  [type='date']:focus,
  [type='email']:focus {
    border: 3px solid black;
  }
  select[type='text']:focus,
  [type='number']:focus,
  [type='date']:focus,
  [type='email']:focus {
    border: 3px solid black;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    margin: 5px 10px;
    padding: 5px 10px;
    height: 30px;
    font-weight: bold;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.2s;

    div {
      display: flex;
      align-items: center;

      strong {
        margin-left: 5px;
      }
    }
  }

  input {
    margin: 5px 10px;
    padding: 5px 10px;
    height: 30px;
    /* background: rgba(0, 0, 0, 0.1); */
    background: rgba(255, 255, 255, 0.9);
    border: 0;
    border-radius: 4px;
    height: 30px;
    color: black;

    &::placeholder {
      /* color: rgba(255, 255, 255, 0.7); */
      /* background: rgba(0, 0, 0, 0); */
    }
  }
`;

export const Options = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BtnComeBack = styled.button`
  color: #fff;
  background-color: #cecece;

  a {
    color: #fff;
    background: #cecece;
  }

  &:hover {
    background: darken(0.03, #cecece);
  }
`;

export const BtnBtnToSave = styled.button`
  background-color: ${colors.primary};
  strong {
    color: #fff;
  }
  &:hover {
    background: ${darken(0.03, `${colors.primary}`)};
  }
`;

export const Main = styled.div`
  background-color: #fff;
  width: 100%;
  /* max-width: 700px; */
  text-align: left;
  border-radius: 5px;
  padding: 20px;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    label {
      display: box;
    }

    select {
      background: rgba(255, 255, 255, 0.9);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: black;
      margin: 0 0 10px;
    }
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
      color: #fb6f91;
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

export const InputGroup = styled.div`
  flex: 1;
  display: flex;
  div {
    display: flex;
    flex-direction: column;
  }
  label {
    /* display: flex; */
  }
  input {
    width: 80%;
  }

  span {
    /* margin: 10px; */
    padding-left: 10px;
    padding-top: 5px;
  }
`;

export const Error = styled.div`
  margin: 10px;
  color: #fb6f91;
  font-size: 14px;
  font-weight: bold;
`;
