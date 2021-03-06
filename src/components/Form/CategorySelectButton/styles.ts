import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
import {Feather} from '@expo/vector-icons';
import {RFValue} from 'react-native-responsive-fontsize';

export const Container = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7,
})`
  padding: 18px 16px;
  background-color: ${({theme}) => theme.colors.shape};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
`;

export const Category = styled.Text`
  color: ${({theme}) => theme.colors.text_dark};
  font-size: ${RFValue(14)}px;
`;

export const Icon = styled(Feather)`
  color: ${({theme}) => theme.colors.text};
  font-size: ${RFValue(20)}px;
`;
