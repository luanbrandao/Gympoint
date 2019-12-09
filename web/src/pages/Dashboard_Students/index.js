import { MdAdd, MdSearch, MdEdit, MdDelete } from 'react-icons/md';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Header,
  Options,
  Main,
  Search,
  Table,
  Edite,
  Delete,
} from '~/pages/_layouts/dashboard/styles';

import api from '~/services/api';

export default function Dashboard_Students() {
  const [students, setStudents] = useState([]);
  const [nameStudent, setNameStudent] = useState('');

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

  function handleInputChange(e) {
    console.tron.log('e.target.value => ', e.target.value);
    setNameStudent(e.target.value);
  }

  async function getUserByName() {
    console.tron.log('nameStudent => ', nameStudent);
    const response = await api.get(`students/${nameStudent}`);
    console.tron.log('get user ny name => ', response);
    const { data } = response;
    setStudents(data.students);
  }

  // se o usuário click no enter tbm faz a busca pelo nome
  function handleKeyUp(event) {
    if (event.keyCode === 13) {
      getUserByName();
    }
  }

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
              {/* <strong onClick={resisterStudent}>CADASTRAR</strong> */}
              {/* <strong onClick={resisterStudent}>CADASTRAR</strong> */}
              <Link to="/resister_student">CADASTRAR</Link>
            </div>
          </button>

          <Search>
            <button type="button" onClick={getUserByName}>
              <MdSearch size={20} color="#c3c3c3" />
            </button>
            <input
              onKeyUp={handleKeyUp}
              onChange={handleInputChange}
              type="text"
              placeholder="Buscar aluno"
            />
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
              {/* <th />
              <th /> */}
            </tr>
          </thead>

          <tbody>
            {students.map(student => (
              <tr key={student.email}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>
                  <Edite type="button">
                    <Link to="/edit_student">editar</Link>
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
