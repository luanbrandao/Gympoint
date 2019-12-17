import React from 'react';
import Teste from '~/Teste';
import Background from '~/components/Background';
import Input from '~/components/Input';
import Button from '~/components/Button';
// yarn add react-native-linear-gradient
// react-native link react-native-linear-gradient
// yarn add styled-components
// yarn add prop-types
// yarn add react-native-vector-icons
// react-native-gesture-handler
export default function App() {
  return (
    <>
      <Background>
        <Teste />
        <Input
          style={{ marginTop: 30 }}
          icon="call"
          placeholder="Digite se nome"
        />
        <Button>Entrar</Button>
      </Background>
    </>
  );
}
