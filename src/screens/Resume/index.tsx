import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {HistoryCard} from '../../components/HistoryCard';
import {addMonths, subMonths, format} from 'date-fns';
import {ptBR} from 'date-fns/locale';
import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
} from './styles';
import {categories} from '../../utils/categories';
import {VictoryPie} from 'victory-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {ActivityIndicator} from 'react-native';

interface TransactionData {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: String;
  date: string;
}

interface TotalCategoryData {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

export function Resume() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<
    TotalCategoryData[]
  >([]);

  function handleChangeDate(action: 'next' | 'prev') {
    if (action === 'next') {
      const newDate = addMonths(selectedDate, 1);
      setSelectedDate(newDate);
    } else {
      const newDate = subMonths(selectedDate, 1);
      setSelectedDate(newDate);
    }
  }

  async function loadData() {
    setIsLoading(true);
    const dataKey = '@gofinance:transaction';
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted.filter(
      (item: TransactionData) =>
        item.type === 'negative' &&
        new Date(item.date).getMonth() === selectedDate.getMonth() &&
        new Date(item.date).getFullYear() === selectedDate.getFullYear(),
    );

    const expensivesTotal = expensives.reduce(
      (acumullator: Number, expensive: TransactionData) => {
        return acumullator + expensive.amount;
      },
      0,
    );

    const totalByCategory: TotalCategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach((item: TransactionData) => {
        if (item.category === category.key) {
          categorySum += Number(item.amount);
        }
      });

      if (categorySum !== 0) {
        const totalFormatted = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        const percent = `${((categorySum / expensivesTotal) * 100).toFixed(
          0,
        )}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted,
          percent,
        });
      }
    });

    setTotalByCategories(totalByCategory);
    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedDate]),
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      {isLoading ? (
        <ActivityIndicator
          color={'green'}
          style={{flex: 1, justifyContent: 'center'}}
        />
      ) : (
        <Content
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: useBottomTabBarHeight(),
          }}
          showsVerticalScrollIndicator={false}>
          <MonthSelect>
            <MonthSelectButton
              onPress={() => {
                handleChangeDate('prev');
              }}>
              <MonthSelectIcon name="chevron-left" />
            </MonthSelectButton>
            <Month>{format(selectedDate, 'MMMM, yyyy', {locale: ptBR})}</Month>
            <MonthSelectButton
              onPress={() => {
                handleChangeDate('next');
              }}>
              <MonthSelectIcon name="chevron-right" />
            </MonthSelectButton>
          </MonthSelect>

          <ChartContainer>
            <VictoryPie
              data={totalByCategories}
              x="percent"
              y="total"
              labelRadius={80}
              colorScale={totalByCategories.map(category => category.color)}
              style={{
                labels: {
                  fontSize: RFValue(12),
                  fill: 'white',
                  fontWeight: 'bold',
                },
              }}
            />
          </ChartContainer>

          {totalByCategories.map(item => (
            <HistoryCard
              key={item.key}
              title={item.name}
              amount={item.totalFormatted}
              color={item.color}
            />
          ))}
        </Content>
      )}
    </Container>
  );
}
