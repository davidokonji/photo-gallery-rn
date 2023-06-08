import React from 'react';
// @ts-ignore
import SvgIcon from 'react-native-svg-icon';
import svgs from '../../assets/svgs';

interface Props {
  name: string;
  width?: number;
  height?: number;
  fill?: string;
}

const Icon = (props: Props) => <SvgIcon {...props} svgs={svgs} />;

export default Icon;
