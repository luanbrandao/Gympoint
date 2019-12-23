import styled from 'styled-components';
import { darken } from 'polished';

import colors from '~/styles/colors';

export const Container = styled.div`
  background-color: ${colors.bg_grey};

  max-width: 50%;
  margin: 50px auto;
  border-radius: 5px;
  padding: 20px;
`;

export const ContainerModal = styled.div`
  display: flex;
  flex-direction: column;

  > button {
    width: 100%;
    display: block;
    margin: 10px 0 0;
    height: 44px;
    background: #f64c75;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.08, '#f64c75')};
    }
  }
`;

export const Question = styled.p`
  padding: 20px;
`;
export const TextArea = styled.textarea`
  margin-top: 20px;
`;

export const Reply = styled.button`
  color: #87cefa;
`;

export const Table = styled.table`
  width: 100%;
  padding: 20px;
  /* margin: 20px; */

  /* width: 100%; */
  thead {
  }

  tr {
    border-collapse: collapse;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* border-top: 1px solid red; */
  }

  tr {
    /* border-bottom: 1px solid green; */
  }
  td.end {
    border: 2px solid black;
    /* border-bottom: 1px solid black; */
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
