import { MdAdd, MdArrowBack } from 'react-icons/md';
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Select, Scope } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { addMonths, format, addDays } from 'date-fns';

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
  student: Yup.string().required('O nome é obrigatório'),
  plan: Yup.string().required('O plano é obrigatório'),
  start_date: Yup.string().required('O data de início é obrigatória'),
});

export default function Register_Registrarions() {
  const [students, setStudents] = useState([]);
  const [nameStudent, setNameStudent] = useState('');
  const [plans, setPlans] = useState([]);
  const [planId, setPlanId] = useState(0);
  const [startDate, setStartDate] = useState('');

  const end_date = useMemo(() => {
    const id = parseInt(planId);
    const plantSelected = plans.find(p => p.id === id);
    const duration = plantSelected ? plantSelected.duration : 0;

    if (startDate) {
      const teste = new Date(startDate);
      const date = format(
        addMonths(addDays(new Date(teste), 1), duration),
        'dd/MM/yyyy'
      );
      return date.toString();
    }
    return '';
  }, [plans, startDate, planId]);

  const total_price = useMemo(() => {
    const id = parseInt(planId);
    const plantSelected = plans.find(p => p.id === id);
    const price = plantSelected ? plantSelected.price : 0;
    return price;
  }, [planId, plans]);
  useEffect(() => {
    async function loadStudents() {
      const responseStudents = await api.get('students');
      const responsePLans = await api.get('plans');

      const { data } = responseStudents;
      const formatedData = data.students.map(student => {
        return { id: student.id, title: student.name };
      });
      setStudents(formatedData);
      const dataPlans = responsePLans.data.plans;
      setPlans(dataPlans);
    }

    loadStudents();
  }, []);

  function handleInputChange(e) {
    setNameStudent(e.target.value);
  }

  async function getUserByName() {
    const response = await api.get(`students/${nameStudent}`);
    const { data } = response;
    const formatedData = data.students.map(student => {
      return { id: student.id, title: student.name };
    });
    setStudents(formatedData);
  }

  // se o usuário click no enter tbm faz a busca pelo nome
  function handleKeyUp(event) {
    if (event.keyCode === 13) {
      getUserByName();
    }
  }

  async function handleSubmit(data, { resetForm }) {
    const params = {
      student_id: data.student,
      plan_id: data.plan,
      start_date: data.start_date,
    };

    try {
      await api.post('registrations', params);
      toast.success('Matricula realizado com sucesso!');
      resetForm();
    } catch (error) {
      // toast.error('Falha na matricula, tente novamente');
      toast.error(error.response.data.error);
    }
  }

  return (
    <Container>
      <Header>
        <div>
          <h1>Gerencia de Matriculas</h1>
        </div>
        <Options>
          <BtnComeBack type="button">
            <div>
              <MdArrowBack size={20} color="#FFF" />
              {/* <strong onClick={resisterStudent}>CADASTRAR</strong> */}
              {/* <strong onClick={resisterStudent}>CADASTRAR</strong> */}
              <Link to="/dashboard_registrations">Voltar</Link>
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
          <Scope>
            <Input
              onKeyUp={handleKeyUp}
              onChange={handleInputChange}
              label="Filtro por nome"
              placeholder="Buscar aluno"
            />
          </Scope>
          {/* <Select name="student" options={students} /> */}
          <Select
            label="Estutdantes"
            name="student"
            type="text"
            options={students}
          />

          <InputGroup>
            <div>
              {/* <Input label="PLANO" name="plan" type="text" /> */}
              <Select
                onChange={e => setPlanId(e.target.value)}
                label="PLANO"
                name="plan"
                type="text"
                options={plans}
              />
            </div>
            <div>
              <Input
                onChange={e => setStartDate(e.target.value)}
                label="DATA DE INÍCIO"
                name="start_date"
                type="date"
              />
            </div>

            {/*
            <div>
              <Input label="DATA DE TERMINO" name="weight" type="number" />
            </div>
            */}

            <div>
              <span>DATA DE TERMINO</span>
              {/* <span>{handleTotalPrice()}</span> */}
              <span>{end_date}</span>
            </div>

            <div>
              <span>Total</span>
              <span>R$ {total_price}</span>
            </div>
          </InputGroup>
        </Form>
      </Main>
    </Container>
  );
}
