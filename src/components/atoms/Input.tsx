import React from 'react';
import {TextInput, TextInputProps, useColorScheme} from 'react-native';
import styled from 'styled-components/native';
import {DarkProps} from '../../types';
import {colors} from '../../theme';

interface InputProps extends DarkProps, TextInputProps {}

const StyledInput = styled(TextInput)<InputProps>`
  flex: 1;
  border: 1px solid #ccc;
  color: ${({isDark}) => (isDark ? colors.white : colors.black)};
  border-radius: 8px;
  padding: 12px 8px;
`;

const Input = ({value, onChangeText, ...rest}: InputProps) => {
  const isDark = useColorScheme() === 'dark';
  return (
    <StyledInput
      value={value}
      onChangeText={onChangeText}
      placeholderTextColor={isDark ? colors.white : colors.drakGray}
      isDark={isDark}
      {...rest}
    />
  );
};

export default Input;
