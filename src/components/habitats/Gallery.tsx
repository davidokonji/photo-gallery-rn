import React from 'react';
import {useWindowDimensions, ActivityIndicator} from 'react-native';
import {MasonryFlashList} from '@shopify/flash-list';
import styled from 'styled-components/native';

import Image from '../atoms/Image';
import {ImageContext} from '../molecules/ImageContext';
import {useRootContext} from '../../context/root.context';

const StyledImageContainer = styled.Pressable`
  margin: 4px;
`;

const Gallery = () => {
  const width = useWindowDimensions().width;
  const {state, setActiveIndex} = useRootContext();

  const numColumns = Math.ceil(width / 350);

  if (!state.data) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <MasonryFlashList
        data={state.data}
        numColumns={numColumns}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <StyledImageContainer
            key={item.id}
            onPress={() => setActiveIndex(index)}>
            <Image uri={item.src} resize />
          </StyledImageContainer>
        )}
        estimatedItemSize={200}
      />
      <ImageContext />
    </>
  );
};

export default Gallery;
