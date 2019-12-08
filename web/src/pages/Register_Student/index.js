import { MdAdd, MdArrowBack } from 'react-icons/md';
import React from 'react';
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
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  phone: Yup.string().required('O telefone é obrigatório'),
});

export default function Register_Student() {
  async function handleSubmit(data, { resetForm }) {
    try {
      await api.post('students', data);
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
          <h1>Gerencia de alunos</h1>
        </div>
        <Options>
          <BtnComeBack type="button">
            <div>
              <MdArrowBack size={20} color="#FFF" />
              {/* <strong onClick={resisterStudent}>CADASTRAR</strong> */}
              {/* <strong onClick={resisterStudent}>CADASTRAR</strong> */}
              <Link to="/dashboard_students">Voltar</Link>
            </div>
          </BtnComeBack>
          <BtnBtnToSave type="button">
            <div>
              <MdAdd size={20} color="#FFF" />
              <strong>Salvar</strong>
              {/* <Link to="/resister_student">Salvar</Link> */}
            </div>
          </BtnBtnToSave>
        </Options>
      </Header>

      <Main>
        <Form schema={schema} onSubmit={handleSubmit}>
          <Input onFocus label="Nome Completo" name="name" type="text" />
          <Input label="ENDERAÇO DE E-MAIL" name="email" type="email" />
          <Input label="SEU TELEFONE" name="phone" type="text" />
          <InputGroup>
            <div>
              <Input label="IDADE" name="age" type="number" />
            </div>

            <div>
              <Input label="PESO (em kg)" name="weight" type="number" />
            </div>

            <div>
              <Input label="ALTURA" name="height" type="number" />
            </div>
          </InputGroup>
          <button type="submit">Salvar</button>
        </Form>
      </Main>
    </Container>
  );
}
