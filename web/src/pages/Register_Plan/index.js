import { MdAdd, MdArrowBack } from 'react-icons/md';
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import {
  Container,
  Header,
  Options,
  Main,
  InputGroup,
  BtnComeBack,
  BtnBtnToSave,
} from '~/pages/_layouts/register/styles';
import api from '~/services/api';

const schema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório'),
  duration: Yup.string().required('Duração é obrigatória'),
  price: Yup.string().required('O preço é obrigatório'),
  // total_price: Yup.string().required('O preço total é obrigatório'),
});

export default function Register_Plan() {
  const [price, setPrice] = useState(0);
  const [duration, setDuration] = useState(0);
  const totalPrice = useMemo(() => price * duration, [price, duration]);

  async function handleSubmit(data, { resetForm }) {
    try {
      await api.post('plans', data);
      toast.success('Cadastro realizado com sucesso!');
      resetForm();
    } catch (error) {
      toast.error('Falha no cadastro, tente novamente');
    }
  }
  return (
    <Container>
      <Header>
        <div>
          <h1>Gerencia de Planos</h1>
        </div>
        <Options>
          <BtnComeBack type="button">
            <div>
              <MdArrowBack size={20} color="#FFF" />
              {/* <strong onClick={resisterStudent}>CADASTRAR</strong> */}
              {/* <strong onClick={resisterStudent}>CADASTRAR</strong> */}
              <Link to="/dashboard_plans">Voltar</Link>
            </div>
          </BtnComeBack>
          <BtnBtnToSave type="submit" form="form">
            <div>
              <MdAdd size={20} color="#FFF" />
              <strong>Salvar</strong>
              {/* <Link to="/resister_student">Salvar</Link> */}
            </div>
          </BtnBtnToSave>
        </Options>
      </Header>

      <Main>
        <Form id="form" form="teste" schema={schema} onSubmit={handleSubmit}>
          <Input label="TÍTULO DO PLANO" name="title" type="text" />

          <InputGroup>
            <div>
              <Input
                // onChange={updateDuration}
                onChange={e => setDuration(e.target.value)}
                label="DUTAÇÃO (em meses)"
                name="duration"
                type="number"
              />
            </div>

            <div>
              <Input
                onChange={e => setPrice(e.target.value)}
                label="PREÇO MENSAL"
                name="price"
                type="number"
                step="0.01"
              />
            </div>

            <div>
              {/* <Input label="PREÇO TOTAL" name="total_price" type="number" /> */}

              <span>PREÇO TOTAL</span>
              {/* <span>{handleTotalPrice()}</span> */}
              <span>{totalPrice.toFixed(2)}</span>
            </div>
          </InputGroup>
        </Form>
      </Main>
    </Container>
  );
}
