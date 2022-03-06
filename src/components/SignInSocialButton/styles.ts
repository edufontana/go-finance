import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';

export const Button = styled(RectButton)`
  height: ${RFValue(56)}px;
  background-color: ${({theme}) => theme.colors.shape};
  border-radius: 5px;
  flex-direction: row;
  margin-bottom: 16px;
  align-items: center;
`;

export const ImageContainer = styled.View`
  padding: 16px;
  height: 100%;
  border-color: ${({theme}) => theme.colors.background};
  border-right-width: 1px;
`;

export const Text = styled.Text`
  flex: 1;
  text-align: center;
  font-size: ${RFValue(14)}px;
`;
