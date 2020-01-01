import styled from 'styled-components';
import { darken } from 'polished';
import colors from '~/styles/colors';

export const Container = styled.div`
  background-color: ${colors.bg_grey};

  max-width: 80%;
  margin: 50px auto;
  border-radius: 5px;
  padding: 20px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    margin: 5px 10px;
    padding: 5px 10px;
    height: 30px;
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

  a {
    color: #fff;
  }
`;

export const Search = styled.div`
  padding: 10px;
  border-radius: 4px;
  height: 30px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    background-color: #fff;

    margin: 0;
  }
`;

export const Main = styled.div`
  background-color: #fff;
`;

export const Table = styled.table`
  width: 100%;
  margin: 20px;

  /* width: 100%; */
  thead {
  }

  tr {
    border-collapse: collapse;
    border-bottom: 1px solid black;
  }
  td.end {
    border: 2px solid black;
  }

  th {
    height: 50px;
    text-align: left;
  }
  td {
    height: 30px;
    color: #999;
  }

  button {
    font-weight: bold;
    border: 0;
    border-radius: 4px;
    background-color: #fff;
  }
`;

export const Edite = styled.button`
  color: blue;
`;
export const Delete = styled.button`
  color: ${colors.primary};
`;

export const NotExist = styled.div`
  height: 300px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: red;
`;
