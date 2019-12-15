import { format, parseISO } from 'date-fns';
import { MdAdd, MdEdit, MdDelete, MdCheckCircle } from 'react-icons/md';
import React, { useState, useEffect } from 'react';
import pt from 'date-fns/locale/pt';
import { Link } from 'react-router-dom';
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

      const formattedDate = data.registrations.map(registration => {
        registration.start_date = format(
          parseISO(registration.start_date),
          "dd 'de' MMMM 'de' yyyy",
          { locale: pt }
        );
        registration.end_date = format(
          parseISO(registration.end_date),
          "dd 'de' MMMM 'de' yyyy",
          { locale: pt }
        );
        return registration;
      });

      setRegistrations(formattedDate);
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
              <Link to="/register_registrarions">CADASTRAR</Link>
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
                <td>
                  {registration.active ? (
                    <MdCheckCircle size={20} color="#00FF00" />
                  ) : (
                    <MdCheckCircle size={20} />
                  )}
                </td>
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
