import React from 'react';
import Svg, {Path} from 'react-native-svg';

const Back = ({fill}: {fill?: string}) => (
  <Svg fill="none" strokeWidth="1.5" stroke={fill}>
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 19.5L8.25 12l7.5-7.5"
    />
  </Svg>
);

export default Back;
