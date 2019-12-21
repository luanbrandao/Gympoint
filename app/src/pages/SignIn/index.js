import React from 'react';
import { Image } from 'react-native';
import Background from '~/components/Background';
import logo from '~/assets/logo.png';
import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

function handleSubmit() {}
export default function SignIn({ navigation }) {
  return (
    <Background>
      <Container>
        <Image source={logo} />
        <Form>
          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Infome seu ID de cadastro"
            autoCapitalize="none"
            onSubmitEditing={handleSubmit}
          />
          <SubmitButton onPress={() => handleSubmit}>Acessar</SubmitButton>
        </Form>

        <SignLink onPress={() => navigation.navigate('SignUp')}>
          <SignLinkText>Criar conta gratuita</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}
