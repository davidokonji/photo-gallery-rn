import React from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';
import {QueryClientProvider} from '@tanstack/react-query';
import styled from 'styled-components/native';

import queryClient from './src/config/react-query.config';
import Gallery from './src/components/habitats/Gallery';
import {colors} from './src/theme';
import {DarkProps} from './src/types';
import {RootProvider, defaultState} from './src/context/root.context';
import Text from './src/components/atoms/Text';

const StyledContainer = styled(SafeAreaView)<DarkProps>`
  flex: 1;
  background-color: ${({isDark}) => (isDark ? colors.black : colors.white)};
`;

const StyledHeader = styled(Text)<DarkProps>`
  font-size: 24px;
  font-weight: bold;
  margin: 16px;
  color: ${({isDark}) => (isDark ? colors.white : colors.black)};
`;

function App(): JSX.Element {
  const isDark = useColorScheme() === 'dark';

  return (
    <QueryClientProvider client={queryClient}>
      <RootProvider initialState={defaultState}>
        <StyledContainer isDark={isDark}>
          <StyledHeader isDark={isDark}>Photo Gallery</StyledHeader>
          <Gallery />
        </StyledContainer>
      </RootProvider>
    </QueryClientProvider>
  );
}

export default App;
