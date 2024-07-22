import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function ShieldIcon({size = 25, color}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M8.438 1.875C6.7 1.875 5.208.706 5.194.694a.312.312 0 00-.388 0c-.015.012-1.5 1.181-3.244 1.181a.312.312 0 00-.312.313V5c0 2.097.847 3.125 3.622 4.347a.312.312 0 00.256 0C7.903 8.125 8.75 7.097 8.75 5V2.187a.312.312 0 00-.313-.312zM5 7.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"
        fill={color ?? '#BC4053'}
      />
      <Path
        d="M5.716 4.153L4.687 5.184l-.403-.406a.314.314 0 00-.443.444l.625.625a.313.313 0 00.443 0l1.25-1.25a.314.314 0 00-.443-.444z"
        fill="#BC4053"
      />
    </Svg>
  );
}

export default ShieldIcon;
