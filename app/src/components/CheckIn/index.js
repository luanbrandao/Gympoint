import React from 'react';

import { Container, Title, Time } from './styles';

export default function CheckIn({ data }) {
  return (
    <Container>
      <Title>Check-in #{data.index}</Title>
      <Time>{data.item.createdAt}</Time>
    </Container>
  );
}
