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

export default function Dashboard_Plans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('plans');
      // executa a formatação assim que pega os dados da api
      // para executar apenas uma unica vez
      const { data } = response;
      console.tron.log('plans => ', data);
      // setPlans(data.plans);
      setPlans(data.plans);
    }

    loadStudents();
  }, []);

  return (
    <Container>
      <Header>
        <div>
          <h1>Gerenciando Planos</h1>
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
              <th>Título</th>
              <th>Duração</th>
              <th>Valor p/Mês</th>
              {/* <th />
              <th /> */}
            </tr>
          </thead>

          <tbody>
            {plans.map(plan => (
              <tr key={plan.title}>
                <td>{plan.title}</td>
                <td>{plan.duration}</td>
                <td>R$ {plan.price}</td>
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
