import { MdReplay } from 'react-icons/md';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
import Loading from '~/components/Loading';
import { Header, Main } from '~/pages/_layouts/dashboard/styles';
import {
  Container,
  Reply,
  Table,
  ContainerModal,
  Question,
  TextArea,
  NotExist,
  NavPages,
} from './styles';
import api from '~/services/api';

const customStyles = {
  content: {
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
export default function Dashboard_Help_Orders() {
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [questionStudent, setQuestionStudent] = useState({});
  const [answer, setAnswer] = useState('');
  const [helpOrders, setHelpOrders] = useState([]);
  const [newPage, setNewPage] = useState(true);
  const [page, setPage] = useState(1);

  async function loadHelpOrders() {
    setLoading(false);
    const response = await api.get(`help_orders/?page=${page}`);
    // executa a formatação assim que pega os dados da api
    // para executar apenas uma unica vez
    const { data } = response;

    if (data.help_orders.length < 6) {
      setNewPage(false);
    } else {
      setNewPage(true);
    }

    setHelpOrders(data.help_orders);
    setLoading(true);
  }

  useEffect(() => {
    loadHelpOrders();
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

  useEffect(() => {
    loadHelpOrders();
  }, []);

  function openModal(help) {
    setQuestionStudent(help);
    setIsOpen(true);
  }

  function closeModal() {
    setQuestionStudent({});
    setAnswer('');
    setIsOpen(false);
  }

  async function handleAnswer() {
    try {
      await api.post(`unanswered/${questionStudent.id}`, {
        answer,
      });
      toast.success('Pedido de auxilío respondido com sucesso!');
      loadHelpOrders();
    } catch (error) {
      toast.error('Falha ao responder o aluno, tente novamente');
    }

    closeModal();
  }
  return (
    <Container>
      <div>
        <Modal
          ariaHideApp={false}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <ContainerModal>
            <h3>Pergunta do aluno</h3>
            <Question>{questionStudent.question}</Question>
            <h3>Sua resposta</h3>
            <TextArea
              rows="4"
              cols="50"
              placeholder="Resposta"
              onChange={e => setAnswer(e.target.value)}
            />
            <button type="submit" onClick={handleAnswer}>
              Responder aluno
            </button>
          </ContainerModal>
        </Modal>
      </div>

      <Header>
        <div>
          <h1>Pedidos de auxilío</h1>
        </div>
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
        helpOrders.length > 0 ? (
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
                      <Reply type="button" onClick={() => openModal(helpOrder)}>
                        responder
                        <MdReplay />
                      </Reply>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Main>
        ) : (
          <NotExist>
            {page === 1
              ? 'Não existe pedidos de auxilío acastradas'
              : 'Sua lista chegou ao fim.'}
          </NotExist>
        )
      ) : (
        <Loading />
      )}
    </Container>
  );
}
