import styled, {css} from 'styled-components/native';
import {Feather} from '@expo/vector-icons';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

interface typeProps {
  type: 'up' | 'down' | 'total';
}

export const Container = styled.SafeAreaView<typeProps>`
  background-color: ${({theme, type}) =>
    type === 'total' ? theme.colors.secondary : theme.colors.shape};

  width: ${RFValue(300)}px;
  padding: 19px 23px;
  margin-right: 16px;
  padding-bottom: ${RFValue(42)}px;
  border-radius: 5px;
`;
export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const Title = styled.Text<typeProps>`
  ${({type}) =>
    type === 'total' &&
    css`
      color: ${({theme}) => theme.colors.shape};
    `}
`;
export const Icon = styled(Feather)<typeProps>`
  font-size: ${RFValue(40)}px;

  ${({type}) =>
    type === 'up' &&
    css`
      color: ${({theme}) => theme.colors.success};
    `}
  ${({type}) =>
    type === 'down' &&
    css`
      color: ${({theme}) => theme.colors.attention};
    `}
    ${({type}) =>
    type === 'total' &&
    css`
      color: ${({theme}) => theme.colors.shape};
    `}
`;
export const Footer = styled.View`
  margin-top: 30px;
`;
export const Amount = styled.Text<typeProps>`
  color: ${({theme}) => theme.colors.text_dark};
  ${({type}) =>
    type === 'total' &&
    css`
      color: ${({theme}) => theme.colors.shape};
    `}
  font-size: ${RFValue(32)}px;
`;
export const LastTransaction = styled.Text<typeProps>`
  font-family: ${({theme}) => theme.fonts.regular};
  color: ${({theme}) => theme.colors.text};
  ${({type}) =>
    type === 'total' &&
    css`
      color: ${({theme}) => theme.colors.shape};
    `}
`;
