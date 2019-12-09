import { MdAdd, MdArrowBack } from 'react-icons/md';
import React, { useState, useEffect } from 'react';
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
import history from '~/services/history';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  phone: Yup.string().required('O telefone é obrigatório'),
});

export default function Edit_Student() {
  const [student, setStudent] = useState([]);

  useEffect(() => {
    setStudent(history.location.state.student);
  }, [student]);

  async function handleSubmit(data) {
    const { id } = student;
    const newData = { ...data, id };
    // console.log("new date ", newData);
    try {
      await api.put('students', newData);
      toast.success('Aluno atualizado');
      history.push('/dashboard_students', { student });
    } catch (error) {
      toast.error('Falha ao atualizar o aluno, tente novamente');
    }
  }

  return (
    <Container>
      <Header>
        <div>
          <h1>Edição de alunos</h1>
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
        <Form
          initialData={student}
          id="form"
          form="teste"
          schema={schema}
          onSubmit={handleSubmit}
        >
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
          <InputGroup>
            {/* <div>
              <Input label="Data Nasc." name="date_birth" type="date" />
            </div> */}

            <div>
              <Input
                label="TELEFONE"
                name="phone"
                type="text"
                placeholder="93 991919191"
              />
            </div>
            <div>
              <Input label="PESO (em kg)" name="weight" type="number" />
            </div>

            <div>
              <Input label="ALTURA" name="height" type="number" />
            </div>
          </InputGroup>
        </Form>
      </Main>
    </Container>
  );
}
