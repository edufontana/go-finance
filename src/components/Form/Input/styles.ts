import styled from 'styled-components/native';
import {TextInput} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

export const Container = styled(TextInput)`
  background-color: ${({theme}) => theme.colors.shape};
  padding: 16px 18px;
  border-radius: 5px;
  font-size: ${RFValue(14)}px;
  width: 100%;
  margin-bottom: 8px;
  color: ${({theme}) => theme.colors.text_dark};
`;
