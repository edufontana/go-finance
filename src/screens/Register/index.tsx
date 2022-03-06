import React, {useEffect, useState} from 'react';
import {Keyboard, Modal, TouchableWithoutFeedback, Alert} from 'react-native';
import {CategorySelect} from '../CategorySelect';
import {useForm} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import {useNavigation} from '@react-navigation/native';

import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  Container,
  Header,
  Title,
  Form,
  FildsInput,
  TransactionsCards,
} from './styles';
import {Input} from '../../components/Form/Input';
import InputForm from '../../components/Form/InputForm';
import {Button} from '../../components/Form/Button';
import {TrasactionTypeButton} from '../../components/TrasactionTypeButton';
import {CategorySelectButton} from '../../components/Form/CategorySelectButton';

const schema = Yup.object().shape({
  name: Yup.string().required('nome é obrigatório'),
  amount: Yup.number()
    .typeError('Informe um valor númerico')
    .positive('valor não pode ser negativo')
    .required('campo obrigatório'),
});

export function Register() {
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Category',
  });
  const [activeButton, setActiveButton] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const dataKey = '@gofinance:transaction';

  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    register('name');
    register('amount');
  }, [register]);

  useEffect(() => {
    async function loadData() {
      const data = await AsyncStorage.getItem(dataKey);
      console.log(JSON.parse(data!));
    }

    /*  async function removeAll() {
      await AsyncStorage.removeItem(dataKey);
    }
    removeAll(); */
    loadData();
  }, []);

  async function handleRegister(form) {
    if (!activeButton) {
      return Alert.alert('Selecione o tipo da transação');
    }

    if (category.key === 'category') {
      return Alert.alert('Selecione o categoria');
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: activeButton,
      category: category.key,
      date: new Date(),
    };

    try {
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [...currentData, newTransaction];
      setActiveButton('');
      setCategory({key: 'category', name: 'Category'});
      reset();

      navigation.navigate('Listagem' as never);
      console.log(dataFormatted);
      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));
    } catch (err) {
      console.log(err);
    }
  }

  function handleActiveType(type: 'positive' | 'negative') {
    setActiveButton(type);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Sign Up</Title>
        </Header>
        <Form>
          <FildsInput>
            <InputForm
              placeholder={'Nome'}
              name={'name'}
              control={control}
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              placeholder={'Preço'}
              name={'amount'}
              control={control}
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />
            <TransactionsCards>
              <TrasactionTypeButton
                title={'Income'}
                type={'up'}
                onPress={() => handleActiveType('positive')}
                isActive={activeButton === 'positive'}
              />
              <TrasactionTypeButton
                title={'Outcome'}
                type={'down'}
                onPress={() => handleActiveType('negative')}
                isActive={activeButton === 'negative'}
              />
            </TransactionsCards>
            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </FildsInput>

          <Button title={'Enviar'} onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            closeSelectCategory={handleCloseSelectCategoryModal}
            category={category}
            setCategory={setCategory}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
