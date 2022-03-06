import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import styled, {css} from 'styled-components/native';
import {Feather} from '@expo/vector-icons';
import {TouchableOpacity} from 'react-native';

interface CategoryProps {
  isActive: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(115)}px;
  background-color: ${({theme}) => theme.colors.primary};
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`;
export const Title = styled.Text`
  color: ${({theme}) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
`;

export const Category = styled(TouchableOpacity)<CategoryProps>`
  width: 100%;
  padding: 13px;
  flex-direction: row;
  align-items: center;
  ${({isActive}) =>
    isActive &&
    css`
      background-color: ${({theme}) => theme.colors.secondary_light};
    `};
`;
export const Name = styled.Text`
  color: ${({theme}) => theme.colors.text_dark};
`;
export const Icon = styled(Feather)`
  margin-right: 16px;
  font-size: ${RFValue(20)}px;
  color: ${({theme}) => theme.colors.text_dark};
`;

export const Separator = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${({theme}) => theme.colors.text};
`;

export const Footer = styled.View`
  width: 100%;
  padding: 24px;
`;
