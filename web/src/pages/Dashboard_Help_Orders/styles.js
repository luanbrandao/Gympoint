import styled from 'styled-components';
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
