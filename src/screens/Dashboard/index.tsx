import React, {useState, useEffect, useCallback} from 'react';
import {HighlightCard} from '../../components/HighlightCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';

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

interface HighlightProps {
  total: string;
  lastTransaction: string;
}

interface HighlightData {
  entries: HighlightProps;
  expensive: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highLightData, setHighLightData] = useState<HighlightData>({
    entries: {
      total: '0',
    },
    expensive: {
      total: '0',
    },
    total: {
      total: '0',
    },
  } as HighlightData);

  function getLastTransactionDate(
    collection: DataListProps[],
    type: 'positive' | 'negative',
  ) {
    const lastTrasationEntries = new Date(
      Math.max.apply(
        Math,
        collection
          .filter(item => item.type === type)
          .map(item => new Date(item.date).getTime()),
      ),
    );

    return `${lastTrasationEntries.getDate()} de ${lastTrasationEntries.toLocaleString(
      'pt-BR',
      {month: 'long'},
    )}`;
  }

  async function loadTransaction() {
    const dataKey = '@gofinance:transaction';
    const response = await AsyncStorage.getItem(dataKey);
    const transaction = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;
    let total = 0;

    const transactionFormatted: DataListProps[] = transaction.map(
      (item: DataListProps) => {
        if (item.type === 'positive') {
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        }

        total = Number(entriesTotal) - Number(expensiveTotal);

        const amount = Number(item.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }).format(new Date(item.date));
        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date,
        };
      },
    );

    setTransactions(transactionFormatted);

    const lastTransactinEntries = getLastTransactionDate(
      transaction,
      'positive',
    );

    const lastTransactinExpensives = getLastTransactionDate(
      transaction,
      'negative',
    );

    const totalInterval = `01 a ${lastTransactinExpensives}`;

    setHighLightData({
      entries: {
        total: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: `útima entrada dia  ${lastTransactinEntries}`,
      },
      expensive: {
        total: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: `útima sáida dia  ${lastTransactinExpensives}`,
      },
      total: {
        total: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: totalInterval,
      },
    });
    setIsLoading(false);
  }

  useEffect(() => {
    loadTransaction();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransaction();
      /* const dataKey = '@gofinance:transaction';
      AsyncStorage.removeItem(dataKey); */
    }, []),
  );

  return (
    <Container>
      {isLoading ? (
        <ActivityIndicator
          color={'green'}
          style={{flex: 1, justifyContent: 'center'}}
        />
      ) : (
        <>
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
              lastTransaction={highLightData.entries.lastTransaction}
              amount={highLightData.entries.total}
              type="up"
            />
            <HighlightCard
              title="Saídas"
              lastTransaction={highLightData.expensive.lastTransaction}
              amount={highLightData.expensive.total}
              type="down"
            />
            <HighlightCard
              title="Total"
              lastTransaction={highLightData.total.lastTransaction}
              amount={highLightData.total.total}
              type="total"
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>

            <TransactionList
              data={transactions}
              keyExtractor={item => item.id}
              renderItem={({item}) => <TransactionCards data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
