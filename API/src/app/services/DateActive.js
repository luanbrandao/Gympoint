import { isPast, format, isAfter } from 'date-fns';
import pt from 'date-fns/locale/pt';

class DateActive {
  async run({ start_date, end_date }) {
    // verifica se já iníciou o período da matrícula
    // como a data e salva no banco com o tempo 00:00
    // se passar uma data no mesmo dia ele retorna true.
    // console.log('start_date => ', start_date);
    // return isPast(start_date);
    // return isAfter(end_date, new Date());
    const start = isPast(start_date);

    if (!start) {
      const formattedDate = format(start_date, "'dia' dd 'de' MMMM", {
        locale: pt,
      });

      throw new Error(`
      A data de início de sua matricula ainda quando chegou!
      Início: ${formattedDate}`);
    }

    const end = isAfter(end_date, new Date());

    if (!end) {
      const formattedDate = format(start_date, "'dia' dd 'de' MMMM", {
        locale: pt,
      });
      throw new Error(`
      Sua matricula chegou ao fim, faça uma nova!
      Término: ${formattedDate}`);
    }

    return start && end;
  }
}

export default new DateActive();
