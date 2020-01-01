import { MdAdd, MdEdit, MdDelete } from 'react-icons/md';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
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
} from '~/pages/_layouts/dashboard/styles';

import api from '~/services/api';
import history from '~/services/history';

export default function Dashboard_Plans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

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
    const response = await api.get('plans');
    const { data } = response;
    setPlans(data.plans);
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
                      <Delete type="button" onClick={() => handleDelete(plan)}>
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
          <NotExist>Não existe planos acastradas</NotExist>
        )
      ) : (
        <Loading />
      )}
    </Container>
  );
}
