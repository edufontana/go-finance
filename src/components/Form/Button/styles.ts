import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

export const Container = styled(TouchableOpacity)`
  background-color: ${({theme}) => theme.colors.secondary};
  width: 100%;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  padding: 18px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${({theme}) => theme.colors.shape};
`;
