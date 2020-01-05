import { MdAdd, MdEdit, MdDelete } from 'react-icons/md';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; // Import
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
import Loading from '~/components/Loading';
import {
  Container,
  Header,
  Options,
  Main,
  Table,
  Edite,
  Delete,
  NotExist,
  NavPages,
} from '~/pages/_layouts/dashboard/styles';

import api from '~/services/api';
import history from '~/services/history';

import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export default function Dashboard_Plans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newPage, setNewPage] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadStudents() {
      setLoading(false);
      const response = await api.get('plans');
      // executa a formatação assim que pega os dados da api
      // para executar apenas uma unica vez
      const { data } = response;
      console.tron.log('plans => ', data);
      // setPlans(data.plans);
      setPlans(data.plans);
      setLoading(true);
    }

    loadStudents();
  }, []);

  async function getPlans() {
    const response = await api.get(`plans/?page=${page}`);
    const { data } = response;

    if (data.plans.length < 6) {
      setNewPage(false);
    } else {
      setNewPage(true);
    }
    setPlans(data.plans);
  }

  useEffect(() => {
    getPlans();
  }, [page]);

  async function paginacao(acao) {
    if (acao === '-') {
      if (page <= 1) return false;

      setPage(page - 1);
      // getStudents(page);
    } else {
      await setPage(page + 1);
    }
  }

  function handleEdit(plan) {
    history.push('/edit_plan', { plan });
  }

  async function handleDelete(plan) {
    // console.log("id => " ,student.id);

    try {
      await api.delete(`plans/${plan.id}`);
      toast.success('PLano deletado com sucesso!');
      getPlans();
    } catch (error) {
      toast.error('Falha ao deletar o aluno, tente novamente');
    }
  }

  function alert(plan) {
    confirmAlert({
      title: 'Deletar Plano',
      message: 'tem certeza que deseja deletar esse plano?',
      buttons: [
        {
          label: 'Não',
          onClick: () => {},
        },
        {
          label: 'Sim',
          onClick: () => handleDelete(plan),
        },
      ],
    });
  }

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
              <Link to="/register_plan">CADASTRAR</Link>
            </div>
          </button>
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
        plans.length > 0 ? (
          <Main>
            <Table id="customers">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Duração</th>
                  <th>Valor p/Mês</th>
                  <th>Total</th>
                  {/* <th />
              <th /> */}
                </tr>
              </thead>

              <tbody>
                {plans.map(plan => (
                  <tr key={plan.id}>
                    <td>{plan.title}</td>
                    <td>
                      {plan.duration > 1
                        ? ` ${plan.duration} meses`
                        : `${plan.duration} mês`}
                    </td>
                    <td>R$ {plan.price}</td>
                    <td>R$ {plan.total_price}</td>
                    <td>
                      <Edite type="button" onClick={() => handleEdit(plan)}>
                        <span>editar</span>
                        <MdEdit />
                      </Edite>
                    </td>
                    <td>
                      <Delete type="button" onClick={() => alert(plan)}>
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
              ? 'Não existe planos acastradas'
              : 'Sua lista chegou ao fim.'}
          </NotExist>
        )
      ) : (
        <Loading />
      )}
    </Container>
  );
}
