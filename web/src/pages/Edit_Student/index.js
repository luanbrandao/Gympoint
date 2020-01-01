import { MdAdd, MdArrowBack } from 'react-icons/md';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
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
import history from '~/services/history';

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

export default function Edit_Student() {
  const [student, setStudent] = useState([]);
  const [dateNasc, setDateNasc] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const data = history.location.state.student;
    const date = new Date(data.date_birth);
    const formattedDate = format(date, 'dd-MM-yyyy', {
      locale: pt,
    });
    data.date_birth = formattedDate;
    setStudent(data);
    setDateNasc(formattedDate);
    setPhone(data.phone);
  }, []);

  async function handleSubmit(data) {
    const { id } = student;
    const newData = { ...data, id };
    try {
      await api.put('students', newData);
      toast.success('Aluno atualizado');
      history.push('/dashboard_students', { student });
    } catch (error) {
      toast.error(error.response.data.error);
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
          {/* <Input
            label="TELEFONE"
            name="phone"
            type="text"
            placeholder="93 991919191"
          /> */}

          <p>TELEFONE</p>
          <InputMask
            mask="99 99999-9999"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          >
            {() => (
              <Input
                type="text"
                name="phone"
                // placeholder="93 991919191"
                required
              />
            )}
          </InputMask>
          <InputGroup>
            {/* <div>
              <Input label="Data Nasc." name="date_birth" type="date" />
            </div> */}

            <div>
              <p>DATA/NASC</p>
              <InputMask
                mask="99/99/9999"
                value={dateNasc}
                onChange={e => setDateNasc(e.target.value)}
              >
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
