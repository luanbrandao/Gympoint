import { MdAdd, MdArrowBack } from 'react-icons/md';
import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import InputMask from 'react-input-mask';

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
  date_birth: Yup.string(),
  weight: Yup.string(),
  height: Yup.string(),
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
          <Input
            label="Nome Completo"
            name="name"
            type="text"
            placeholder="exemplo"
          />
          <Input
            label="ENDERAÇO DE E-MAIL"
            name="email"
            type="email"
            placeholder="exemplo@gmail.com"
          />
          {/* <InputMask mask="+4\9 99 999 99" maskChar=" " />; */}
          {/* <Input label="SEU TELEFONE" name="phone" placeholder="93 991919191" /> */}

          <p>TELEFONE</p>
          <InputMask mask="99 99999-9999">
            {() => (
              <Input
                type="text"
                name="phone"
                placeholder="93 991919191"
                required
              />
            )}
          </InputMask>

          <InputGroup>
            <div>
              <p>DATA/NASC</p>
              <InputMask mask="99/99/9999">
                {() => <Input type="text" name="date_birth" required />}
              </InputMask>
            </div>

            <div>
              <Input
                label="PESO (em kg)"
                name="weight"
                type="number"
                step="0.01"
              />
            </div>

            <div>
              <Input label="ALTURA" name="height" type="number" step="0.01" />
            </div>
          </InputGroup>
        </Form>
      </Main>
    </Container>
  );
}
