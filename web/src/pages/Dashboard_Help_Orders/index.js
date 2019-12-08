import { MdReplay } from 'react-icons/md';
import React, { useState, useEffect } from 'react';
import {
  Container,
  Header,
  Main,
  Table,
  Delete,
} from '~/pages/_layouts/dashboard/styles';

import api from '~/services/api';

export default function Dashboard_Students() {
  const [helpOrders, setHelpOrders] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('help_orders');
      // executa a formatação assim que pega os dados da api
      // para executar apenas uma unica vez
      const { data } = response;
      setHelpOrders(data.help_orders);
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
            {helpOrders.map(helpOrder => (
              <tr key={helpOrder.id}>
                <td>{helpOrder.student.name}</td>
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
