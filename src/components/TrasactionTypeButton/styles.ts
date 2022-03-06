import styled, {css} from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
import {Feather} from '@expo/vector-icons';
import {RFValue} from 'react-native-responsive-fontsize';
import theme from '../../global/styles/theme';

interface Props {
  type: 'up' | 'down';
}

interface ContainerProps {
  type: 'up' | 'down';
  isActive: boolean;
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
  flex-direction: row;
  align-items: center;
  border: 1.5px solid ${theme.colors.text};
  width: 48%;

  border-radius: 5px;
  padding: 16px;
  justify-content: center;

  ${({type, isActive}) =>
    type === 'up' &&
    isActive === true &&
    css`
      background-color: ${({theme}) => theme.colors.success_light};
      border: none;
    `}

  ${({type, isActive}) =>
    type === 'down' &&
    isActive === true &&
    css`
      background-color: ${({theme}) => theme.colors.attention_light};
      border: none;
    `}
`;

export const Icon = styled(Feather)<Props>`
  margin-right: 12px;
  font-size: ${RFValue(24)}px;
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
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${theme.colors.text_dark};
`;
