import React from 'react';
import {Container, Header, Title, Form, FildsInput} from './styles';
import {Input} from '../../components/Form/Input';
import {Button} from '../../components/Form/Button';

export function Register() {
  return (
    <Container>
      <Header>
        <Title>Sign Up</Title>
      </Header>
      <Form>
        <FildsInput>
          <Input placeholder={'Nome'} />
          <Input placeholder={'Preço'} />
        </FildsInput>
        <Button title={'Enviar'} />
      </Form>
    </Container>
  );
}
