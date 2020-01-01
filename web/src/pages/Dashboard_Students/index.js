import { MdAdd, MdSearch, MdEdit, MdDelete } from 'react-icons/md';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Container,
  Header,
  Options,
  Main,
  Search,
  Table,
  Edite,
  Delete,
  NotExist,
} from '~/pages/_layouts/dashboard/styles';
import history from '~/services/history';
import Loading from '~/components/Loading';
import api from '~/services/api';

export default function Dashboard_Students() {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [nameStudent, setNameStudent] = useState('');

  useEffect(() => {
    async function loadStudents() {
      setLoading(false);
      const response = await api.get('students');
      // executa a formatação assim que pega os dados da api
      // para executar apenas uma unica vez
      const { data } = response;
      setStudents(data.students);
    }

    loadStudents();
    setLoading(false);
  }, []);

  async function getStudents() {
    const response = await api.get('students');
    // executa a formatação assim que pega os dados da api
    // para executar apenas uma unica vez
    const { data } = response;
    setStudents(data.students);
  }

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

  function handleEdit(student) {
    history.push('/edit_student', { student });
  }

  async function handleDelete(student) {
    // console.log("id => " ,student.id);

    try {
      await api.delete(`students/${student.id}`);
      toast.success('Aluno deletado com sucesso!');
      getStudents();
    } catch (error) {
      toast.error('Falha ao deletar o aluno, tente novamente');
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

      {loading ? (
        students.length > 0 ? (
          <Main>
            <Table id="customers">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>E-MAIL</th>
                  <th>Fone</th>
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
                    <td>{student.age}</td>
                    <td>
                      <Edite type="button" onClick={() => handleEdit(student)}>
                        {/* <Link to="/edit_student/1">editar</Link> */}
                        <span>editar</span>
                        <MdEdit />
                      </Edite>
                    </td>
                    <td>
                      <Delete
                        type="button"
                        onClick={() => handleDelete(student)}
                      >
                        apagar
                        <MdDelete />
                      </Delete>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Main>
        ) : (
          <NotExist>Não existe estudantes acastradas</NotExist>
        )
      ) : (
        <Loading />
      )}
    </Container>
  );
}
