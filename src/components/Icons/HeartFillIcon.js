import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function HeartFillIcon({size = 25, color = 'black'}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 391.837 391.837"
      xmlSpace="preserve"
      enableBackground="new 0 0 391.837 391.837"
      height={size}
      width={size}>
      <Path
        d="M285.257 35.528c58.743.286 106.294 47.836 106.58 106.58 0 107.624-195.918 214.204-195.918 214.204S0 248.165 0 142.108c0-58.862 47.717-106.58 106.58-106.58a105.534 105.534 0 0189.339 48.065 106.578 106.578 0 0189.338-48.065z"
        fill="#d7443e"
      />
    </Svg>
  );
}

export default HeartFillIcon;
