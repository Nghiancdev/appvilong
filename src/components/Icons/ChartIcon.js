import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function ChartIcon({size = 25, color = 'grey'}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none">
      <Path
        d="M20 13.75a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75v6.75H14V4.25c0-.728-.002-1.2-.048-1.546-.044-.325-.115-.427-.172-.484-.057-.057-.159-.128-.484-.172C12.949 2.002 12.478 2 11.75 2c-.728 0-1.2.002-1.546.048-.325.044-.427.115-.484.172-.057.057-.128.159-.172.484-.046.347-.048.818-.048 1.546V20.5H8V8.75A.75.75 0 007.25 8h-3a.75.75 0 00-.75.75V20.5H1.75a.75.75 0 000 1.5h20a.75.75 0 000-1.5H20v-6.75z"
        fill={color}
      />
    </Svg>
  );
}

export default ChartIcon;
