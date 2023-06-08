import React, {PropsWithChildren} from 'react';
import {PressableProps} from 'react-native';
import styled from 'styled-components/native';
import Text, {TextProps} from './Text';
import {LayoutProps} from '../../types';

interface ButtonProps extends PressableProps, LayoutProps {
  text?: TextProps;
  bgColor?: string;
}

const StyledButton = styled.Pressable<ButtonProps>`
  opacity: ${({disabled}) => (disabled ? 0.5 : 1)};
  width: ${({width}) => width || 'auto'};
  padding: ${({padding}) => padding || '0'};
  margin: ${({margin}) => margin?.toString() || '0'};
  border-radius: ${({radius}) => radius || '0'};
  border: ${({border}) => border || '0'};
  background-color: ${({bgColor}) => bgColor || 'transparent'};
`;

const Button = ({children, text, ...rest}: PropsWithChildren<ButtonProps>) => {
  return (
    <StyledButton {...rest}>
      <Text {...text}>{children}</Text>
    </StyledButton>
  );
};

export default Button;
