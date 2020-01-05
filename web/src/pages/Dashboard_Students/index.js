/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { MdAdd, MdSearch, MdEdit, MdDelete } from 'react-icons/md';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
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
  NavPages,
} from '~/pages/_layouts/dashboard/styles';
import history from '~/services/history';
import Loading from '~/components/Loading';
import api from '~/services/api';

export default function Dashboard_Students() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [nameStudent, setNameStudent] = useState('');
  const [newPage, setNewPage] = useState(true);

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
    setLoading(true);
  }, []);

  async function getStudents() {
    const url = nameStudent
      ? `students/${nameStudent}/?page=${page}`
      : `students/?page=${page}`;

    const response = await api.get(url);
    // executa a formatação assim que pega os dados da api
    // para executar apenas uma unica vez
    const { data } = response;

    if (data.students.length < 4) {
      setNewPage(false);
    } else {
      setNewPage(true);
    }
    setStudents(data.students);
  }

  function handleInputChange(e) {
    console.tron.log('e.target.value => ', e.target.value);
    setNameStudent(e.target.value);
  }

  async function getUserByName() {
    setPage(1);
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

  useEffect(() => {
    getStudents();
  }, [getStudents, page]);

  async function paginacao(acao) {
    if (acao === '-') {
      if (page <= 1) return false;

      setPage(page - 1);
      // getStudents(page);
    } else {
      await setPage(page + 1);
    }
  }

  function alert(student) {
    confirmAlert({
      title: 'Deletar Aluno',
      message: 'tem certeza que deseja deletar esse aluno?',
      buttons: [
        {
          label: 'Não',
          onClick: () => {},
        },
        {
          label: 'Sim',
          onClick: () => handleDelete(student),
        },
      ],
    });
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

      <NavPages>
        <div>
          {page > 1 ? (
            <FaLongArrowAltLeft onClick={() => paginacao('-')} />
          ) : (
            <FaLongArrowAltLeft color="#cecece" />
          )}
        </div>
        <h3>Page: {page}</h3>
        <div>
          {newPage ? (
            <FaLongArrowAltRight onClick={() => paginacao('+')} />
          ) : (
            <FaLongArrowAltRight color="#cecece" />
          )}
        </div>
      </NavPages>

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
                        {/* <Edite type="button" onClick={() => submit()}> */}
                        {/* <Link to="/edit_student/1">editar</Link> */}
                        <span>editar</span>
                        <MdEdit />
                      </Edite>
                    </td>
                    <td>
                      <Delete
                        type="button"
                        // onClick={() => handleDelete(student)}
                        onClick={() => alert(student)}
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
          <NotExist>
            {page === 1
              ? 'Não existe estudantes acastradas'
              : 'Sua lista chegou ao fim.'}
          </NotExist>
        )
      ) : (
        <Loading />
      )}
    </Container>
  );
}
