import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

function CameraIcon({size = 20, color = 'grey'}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Circle cx={12} cy={13} r={3} stroke={color} strokeWidth={1.5} />
      <Path
        d="M2 13.364c0-3.065 0-4.597.749-5.697.324-.477.74-.886 1.226-1.204.72-.473 1.622-.642 3.003-.702.659 0 1.226-.49 1.355-1.125A2.064 2.064 0 0110.366 3h3.268c.988 0 1.839.685 2.033 1.636.129.635.696 1.125 1.355 1.125 1.38.06 2.282.23 3.003.702.485.318.902.727 1.226 1.204.749 1.1.749 2.632.749 5.697 0 3.064 0 4.596-.749 5.697a4.408 4.408 0 01-1.226 1.204C18.904 21 17.343 21 14.222 21H9.778c-3.121 0-4.682 0-5.803-.735A4.406 4.406 0 012.75 19.06 3.43 3.43 0 012.277 18M19 10h-1"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default CameraIcon;
