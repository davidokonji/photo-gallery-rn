import React, {PropsWithChildren} from 'react';
import styled from 'styled-components/native';
import {DarkProps} from '../../types';

const TextSize = {
  extraSmall: '12px',
  small: '14px',
  medium: '16px',
  large: '18px',
};

export interface TextProps extends DarkProps {
  size?: keyof typeof TextSize;
  color?: string;
  align?: 'center' | 'left' | 'right';
  decoration?: 'none' | 'underline';
  width?: string;
}

const StyledText = styled.Text<TextProps>`
  font-size: ${({size}) => TextSize[size || 'small']};
  color: ${({color, isDark}) => (color ? color : isDark ? 'white' : 'black')};
  font-weight: 500;
  text-align: ${({align}) => align || 'left'};
  text-decoration: ${({decoration}) => decoration || 'none'};
  width: ${({width}) => width || 'auto'};
`;

const Text = ({children, ...rest}: PropsWithChildren<TextProps>) => {
  return <StyledText {...rest}>{children}</StyledText>;
};

export default Text;
