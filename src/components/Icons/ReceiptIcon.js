import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function ReceiptIcon({size = 25, color}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.18 19.85a.47.47 0 00.35.15h.29a.47.47 0 00.35-.15L5 18a.51.51 0 01.71 0l1.81 1.81a.47.47 0 00.35.15h.29a.47.47 0 00.35-.15L10.32 18a.51.51 0 01.68 0l1.81 1.81a.47.47 0 00.35.15h.29a.47.47 0 00.35-.15L15.71 18a1 1 0 00.29-.7V1a1 1 0 00-1-1H1a1 1 0 00-1 1v16.26c.004.265.107.518.29.71l1.89 1.88zM9 11.5a.5.5 0 01-.5.5h-4a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5h4a.5.5 0 01.5.5v1zM11.5 8a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-7a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h7z"
        fill={color ?? '#BC4053'}
      />
    </Svg>
  );
}

export default ReceiptIcon;
