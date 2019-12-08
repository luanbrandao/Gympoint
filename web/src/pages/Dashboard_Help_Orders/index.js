import { MdReplay } from 'react-icons/md';
import React, { useState, useEffect } from 'react';
import { Container, Header, Main, Table, Delete } from './styles';

import api from '~/services/api';

export default function Dashboard_Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('students');
      // executa a formatação assim que pega os dados da api
      // para executar apenas uma unica vez
      const { data } = response;
      setStudents(data.students);
    }

    loadStudents();
  }, []);

  return (
    <Container>
      <Header>
        <div>
          <h1>Pedidos de auxilío</h1>
        </div>
      </Header>

      <Main>
        <Table id="customers">
          <thead>
            <tr>
              <th>ALUNO</th>
            </tr>
          </thead>

          <tbody>
            {students.map(student => (
              <tr key={student.name}>
                <td>{student.name}</td>
                <td>
                  <Delete type="button">
                    responder
                    <MdReplay />
                  </Delete>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Main>
    </Container>
  );
}
