import { MdAdd, MdArrowBack } from 'react-icons/md';
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Select } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { addMonths, format, addDays } from 'date-fns';
import AsyncSelect from 'react-select/async';
import {
  Container,
  Header,
  Options,
  Main,
  InputGroup,
  BtnComeBack,
  BtnBtnToSave,
  Error,
} from '~/pages/_layouts/register/styles';
import api from '~/services/api';

const schema = Yup.object().shape({
  student: Yup.string(),
  plan: Yup.string().required('O plano é obrigatório'),
  start_date: Yup.string().required('O data de início é obrigatória'),
});

export default function Register_Registrarions() {
  const [studentId, setStudentId] = useState('');
  const [statusSelect, setStatusSelect] = useState(false);
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
    const price = plantSelected ? plantSelected.total_price : 0;
    return price;
  }, [planId, plans]);

  useEffect(() => {
    async function loadPlans() {
      const responsePLans = await api.get('plans');
      const dataPlans = responsePLans.data.plans;
      setPlans(dataPlans);
    }
    loadPlans();
  }, []);

  function handleInputChange(e) {
    setNameStudent(e);
  }

  async function getStudents() {
    const response = await api.get(`students/${nameStudent}`);
    const { data } = response;
    const formatedData = data.students.map(student => {
      return { id: 2, value: student.id, label: student.name };
    });

    return formatedData;
  }

  async function handleSubmit(data, { resetForm }) {
    const params = {
      student_id: studentId,
      plan_id: data.plan,
      start_date: data.start_date,
    };

    if (studentId === '') {
      setStatusSelect(true);
      return;
    }

    try {
      await api.post('registrations', params);
      toast.success('Matricula realizado com sucesso!');
      setPlanId(0);
      setStartDate('');
      setStatusSelect(false);
      setStudentId('');
      resetForm();
    } catch (error) {
      // toast.error('Falha na matricula, tente novamente');
      toast.error(error.response.data.error);
    }
  }

  function handleSelect(object) {
    setStudentId(object.value);
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
          <div>
            <p>ALUNO</p>

            <AsyncSelect
              id="student"
              name="student"
              cacheOptions
              loadOptions={getStudents}
              defaultOptions
              onInputChange={handleInputChange}
              onChange={handleSelect}
            />
            <Error>{statusSelect ? <p>O aluno é obrigatório.</p> : ''}</Error>
          </div>

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
