// import { format, parseISO } from 'date-fns';
// import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class AnswerMail {
  get key() {
    return 'AnswerMail';
  }

  // a tarefa que vai ser executad
  async handle({ data }) {
    console.log('A fila executou Answer');
    const { answer } = data;
    await Mail.sendMail({
      to: `gympoint@gmil.com <${answer.student.email}> `,
      subject: 'Sua pergunta foi respondida',
      // text: 'Você tem um novo cancelamento',
      template: 'answer',
      context: {
        message: answer.message,
      },
    });
  }
}
export default new AnswerMail();
