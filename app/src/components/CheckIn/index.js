import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Container, Title, Time } from './styles';

export default function CheckIn({ data }) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.item.createdAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.item.createdAt]);

  return (
    <Container>
      <Title>Check-in #{data.index + 1}</Title>
      <Time>{dateParsed}</Time>
    </Container>
  );
}
