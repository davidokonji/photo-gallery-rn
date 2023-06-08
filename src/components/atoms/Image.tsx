import React, {useEffect, useState} from 'react';
import {Image as DefaultImage} from 'react-native';
import styled from 'styled-components/native';
import {verticalScale, horizontalScale} from '../../utils/metrics';

interface ImageProps {
  uri: string;
  resize?: boolean;
}

const StyledImage = styled.Image`
  border-radius: 8px;
  object-fit: cover;
`;

const Image = ({uri, resize}: ImageProps) => {
  const [aspectRatio, setAspectRatio] = useState(1);
  const [dimensions, setDimensions] = useState({
    height: 0,
    width: '100%',
  });

  useEffect(() => {
    DefaultImage.getSize(uri, (width, height) => {
      setDimensions({
        width: '100%',
        height: verticalScale(height),
      });
      setAspectRatio(horizontalScale(width) / verticalScale(height));
    });
  }, [uri, resize]);

  const style = resize ? {aspectRatio} : dimensions;

  return <StyledImage source={{uri}} style={[style]} />;
};

export default React.memo(Image, (prev, next) => prev.uri === next.uri);
