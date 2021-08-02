import styled from 'styled-components/native';
import {Feather} from '@expo/vector-icons';
import {RFValue} from 'react-native-responsive-fontsize';

interface TransictionProps {
  type: 'positive' | 'negative';
}

export const Container = styled.View`
  background-color: ${({theme}) => theme.colors.shape};
  padding: 17px 25px;
  border-radius: 5px;
  margin-top: 14px;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.text_dark};
  font-family: ${({theme}) => theme.fonts.regular};
`;
export const Amount = styled.Text<TransictionProps>`
  font-family: ${({theme}) => theme.fonts.regular};
  color: ${({theme, type}) =>
    type === 'positive' ? theme.colors.success : theme.colors.attention};
  font-size: ${RFValue(24)}px;
  margin-top: 2px;
`;
export const Category = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 19px;
`;
export const Icon = styled(Feather)`
  color: ${({theme}) => theme.colors.text};
  font-size: ${RFValue(20)}px;
`;
export const CategoryName = styled.Text`
  margin-left: 17px;
  color: ${({theme}) => theme.colors.text};
  font-size: ${RFValue(14)}px;
`;
export const Date = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-size: ${RFValue(14)}px;
`;
