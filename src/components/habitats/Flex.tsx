import React, {PropsWithChildren} from 'react';
import {useColorScheme, View} from 'react-native';
import styled from 'styled-components/native';
import {colors} from '../../theme';
import {DarkProps, LayoutProps} from '../../types';

interface FlexProps extends DarkProps, LayoutProps {
  flexDirection?: 'row' | 'column';
  justify?: 'center' | 'flex-start' | 'flex-end' | 'space-between';
  align?: 'center' | 'flex-start' | 'flex-end' | 'baseline';
}

const StyledContainer = styled(View)<FlexProps>`
  display: flex;
  position: relative;
  background-color: ${({isDark, bgColor}) =>
    bgColor || (isDark ? colors.black : colors.white)};
  color: ${({isDark}) => (isDark ? colors.white : colors.black)};
  flex-direction: ${({flexDirection}) => flexDirection || 'column'};
  justify-content: ${({justify}) => justify || 'flex-start'};
  align-items: ${({align}) => align || 'flex-start'};
  width: ${({width}) => width || 'auto'};
  padding: ${({padding}) => padding?.toString() || '0'};
`;

const Flex = ({
  children,
  flexDirection,
  justify,
  align,
  width,
  padding,
  bgColor,
}: PropsWithChildren<FlexProps>) => {
  const isDark = useColorScheme() === 'dark';

  return (
    <StyledContainer
      isDark={isDark}
      flexDirection={flexDirection}
      justify={justify}
      width={width}
      bgColor={bgColor}
      padding={padding}
      align={align}>
      {children}
    </StyledContainer>
  );
};

export default Flex;
