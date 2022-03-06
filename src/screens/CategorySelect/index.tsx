import React from 'react';
import {FlatList} from 'react-native';
import {categories} from '../../utils/categories';
import {Button} from '../../components/Form/Button';
import {
  Container,
  Header,
  Title,
  Category,
  Name,
  Icon,
  Separator,
  Footer,
} from './styles';

interface Category {
  key: string;
  name: string;
}

interface Props {
  category: Category;
  setCategory: (item: Category) => void;
  closeSelectCategory: () => void;
}

export function CategorySelect({
  category,
  closeSelectCategory,
  setCategory,
}: Props) {
  function handleCategorySelect(item: Category) {
    setCategory(item);
  }

  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <FlatList
        data={categories}
        key={item => item.key}
        renderItem={({item}) => (
          <Category
            onPress={() => handleCategorySelect(item)}
            isActive={item.key === category.key}>
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

      <Footer>
        <Button title={'Selecionar'} onPress={closeSelectCategory} />
      </Footer>
    </Container>
  );
}
