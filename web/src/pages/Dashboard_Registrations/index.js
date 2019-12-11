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
} from '~/pages/_layouts/dashboard/styles';

import api from '~/services/api';

export default function Dashboard_Registrations() {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    async function loadregistrations() {
      const response = await api.get('registrations');
      // executa a formatação assim que pega os dados da api
      // para executar apenas uma unica vez
      const { data } = response;
      console.log(data.registration);
      setRegistrations(data.registration);
    }

    loadregistrations();
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
              <th>Plano</th>
              <th>INÍCIO</th>
              <th>TÉRMINO</th>
              <th>ATIVO</th>
            </tr>
          </thead>

          <tbody>
            {registrations.map(registration => (
              <tr key={registration.id}>
                <td>{registration.student.name}</td>
                <td>{registration.plan.title}</td>
                <td>{registration.start_date}</td>
                <td>{registration.end_date}</td>
                <td>{registration.active ? 'on' : 'off'}</td>
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
