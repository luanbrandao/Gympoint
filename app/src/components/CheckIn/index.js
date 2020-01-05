import React, { useMemo } from 'react';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';
import { Container, Title, Time } from './styles';

export default function CheckIn({ data }) {
  const dateParsed = useMemo(() => {
    return format(parseISO(data.item.createdAt), "'dia' dd 'de' MMMM H:mm", {
      locale: pt,
    });

    // return formatRelative(parseISO(data.item.createdAt), new Date(), {
    //   locale: pt,
    //   addSuffix: true,
    // });
  }, [data.item.createdAt]);

  return (
    <Container>
      <Title>Check-in #{data.index + 1}</Title>
      <Time>{dateParsed}</Time>
    </Container>
  );
}

CheckIn.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

CheckIn.defaultProps = {
  data: {},
};
