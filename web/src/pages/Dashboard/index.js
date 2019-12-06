import React from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';
import {
  Container,
  Header,
  Options,
  Main,
  Search,
  Table,
  Edite,
  Delete,
} from './styles';

export default function Dashboard() {
  return (
    <Container>
      <Header>
        <div>
          <h1>Gerencia de alunos</h1>
        </div>

        <Options>
          <button type="button">
            <div>
              <MdAdd size={20} color="#FFF" />
              <strong>CADASTRAR</strong>
            </div>
          </button>

          <Search>
            <MdSearch size={20} color="##c3c3c3" />
            <input type="text" placeholder="Buscar aluno" />
          </Search>
        </Options>
      </Header>

      <Main>
        <Table id="customers">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-MAIL</th>
              <th>IDADE</th>
              <th />
              <th />
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Luan Brandao</td>
              <td>luanbrandao4@gmail.com</td>
              <td>50</td>
              <td>editar</td>
              <td>apagar</td>
            </tr>
            <tr>
              <td>Luan Brandao</td>
              <td>luanbrandao4@gmail.com</td>
              <td>50</td>
              <td>editar</td>
              <td>apagar</td>
            </tr>
            <tr>
              <td>Luan Brandao</td>
              <td>luanbrandao4@gmail.com</td>
              <td>50</td>
              <td>
                <Edite type="button">editar</Edite>
              </td>
              <td>
                <Delete type="button">apagar</Delete>
              </td>
            </tr>
          </tbody>
        </Table>
      </Main>
    </Container>
  );
}
