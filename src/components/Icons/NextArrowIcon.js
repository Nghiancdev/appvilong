import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function NextArrowIcon({size = 14, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      >
      <Path
        d="M4.631 12.569a.875.875 0 010-1.238L8.963 7 4.63 2.669A.875.875 0 015.87 1.432l4.95 4.95a.875.875 0 010 1.237l-4.95 4.95a.875.875 0 01-1.238 0z"
        fill={color ?? '#939CAB'}
      />
    </Svg>
  );
}

export default NextArrowIcon;
