import React from 'react';
import {HighlightCard} from '../../components/HighlightCard';
import {
  TransactionCards,
  DataTrasationProps,
} from '../../components/TransactionCards';
import {
  Container,
  Header,
  HeaderWrapper,
  Icon,
  User,
  UserImage,
  UserGreeting,
  UserName,
  UserInfo,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
} from './styles';

export interface DataListProps extends DataTrasationProps {
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: '1',
      type: 'positive',
      title: 'Desenvolvimento de site',
      amount: 'R$ 12.000.00',
      category: {
        icon: 'dollar-sign',
        name: 'Vendas',
      },
      date: '13/05/21',
    },
    {
      id: '2',
      type: 'negative',
      title: 'Pizza',
      amount: 'R$ 59.00',
      category: {
        icon: 'coffee',
        name: 'Alimentação',
      },
      date: '13/04/21',
    },
    {
      id: '3',
      type: 'negative',
      title: 'Aluguel de apartamento',
      amount: 'R$ 1.200.00',
      category: {
        icon: 'shopping-bag',
        name: 'Casa',
      },
      date: '13/04/21',
    },
  ];
  return (
    <Container>
      <Header>
        <HeaderWrapper>
          <UserInfo>
            <UserImage
              source={{
                uri: 'https://avatars.githubusercontent.com/u/9919?v=4',
              }}
            />
            <User>
              <UserGreeting>Hello</UserGreeting>
              <UserName>Developer</UserName>
            </User>
          </UserInfo>
          <Icon name={'power'} />
        </HeaderWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          title="Entradas"
          lastTransaction="Última entrada dia 02 de abril"
          amount="R$ 18.000,00"
          type="up"
        />
        <HighlightCard
          title="Saídas"
          lastTransaction="Última saída dia 08 de abril"
          amount="R$ 6.000,00"
          type="down"
        />
        <HighlightCard
          title="Total"
          lastTransaction="01 à 16 de abril"
          amount="R$ 12.000,00"
          type="total"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => <TransactionCards data={item} />}
        />
      </Transactions>
    </Container>
  );
}
