import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function TimeWorkIcon({size = 24, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none">
      <Path
        d="M12 18.2a4 4 0 100-8 4 4 0 000 8z"
        stroke={color ?? '#000'}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.25 12.95v.93c0 .35-.18.68-.49.86l-.76.46"
        stroke={color ?? '#000'}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 22h8c4.02 0 4.74-1.61 4.95-3.57l.75-8C21.97 7.99 21.27 6 17 6H7c-4.27 0-4.97 1.99-4.7 4.43l.75 8C3.26 20.39 3.98 22 8 22zM8 6v-.8C8 3.43 8 2 11.2 2h1.6C16 2 16 3.43 16 5.2V6M21.65 11a16.335 16.335 0 01-5.64 2.64M2.62 11.27c1.67 1.14 3.49 1.95 5.38 2.41"
        stroke={color ?? '#000'}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default TimeWorkIcon;
