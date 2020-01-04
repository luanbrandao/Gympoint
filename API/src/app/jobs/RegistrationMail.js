// import { format, parseISO } from 'date-fns';
// import pt from 'date-fns/locale/pt';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

function formattedDate(date) {
  return format(parseISO(date), "'dia' dd 'de' MMMM", {
    locale: pt,
  });
}
class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  // a tarefa que vai ser executad
  async handle({ data }) {
    console.log('A fila executou');
    const { register } = data;

    await Mail.sendMail({
      to: `gympoint@gmil.com <${register.student.email}> `,
      subject: 'Nova Matricula',
      // text: 'Você tem um novo cancelamento',
      template: 'resistration',
      context: {
        student: register.student.name,
        start: formattedDate(register.start),
        end: formattedDate(register.end),
        plan: register.plan.title,
        price: register.plan.price,
        cod: register.cod,
      },
    });
  }
}
export default new RegistrationMail();
