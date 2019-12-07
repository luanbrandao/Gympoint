import { MdAdd, MdEdit, MdDelete } from 'react-icons/md';
import React, { useState, useEffect } from 'react';
import {
  Container,
  Header,
  Options,
  Main,
  Table,
  Edite,
  Delete,
} from './styles';

import api from '~/services/api';

export default function Dashboard_Student() {
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
          <h1>Gerenciando matrículas</h1>
        </div>

        <Options>
          <button type="button">
            <div>
              <MdAdd size={20} color="#FFF" />
              <strong>CADASTRAR</strong>
            </div>
          </button>
        </Options>
      </Header>

      <Main>
        <Table id="customers">
          <thead>
            <tr>
              <th>ALUNO</th>
              <th>PLANO</th>
              <th>INÍCIO</th>
              <th>INÍCIO</th>
              <th>TÉRMINO</th>
              <th>ATIVO</th>
            </tr>
          </thead>

          <tbody>
            {students.map(student => (
              <tr key={student.email}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>{student.phone}</td>
                <td>{student.phone}</td>
                <td>
                  <Edite type="button">
                    editar
                    <MdEdit />
                  </Edite>
                </td>
                <td>
                  <Delete type="button">
                    apagar
                    <MdDelete />
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
