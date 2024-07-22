import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function BoxProfileIcon({size = 25, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 23 22"
      fill="none">
      <Path
        d="M21.91 4.682c0-.28-.169-.53-.427-.637L11.761.052a.688.688 0 00-.523 0L1.517 4.045a.688.688 0 00-.427.637v12.636c0 .28.169.53.427.637l9.721 3.993c.166.069.353.07.523 0 .008-.002-.36.148 9.722-3.993a.688.688 0 00.427-.637V4.682zM11.5 7.989L7.918 6.518l7.741-3.377 3.822 1.57L11.5 7.989zM2.467 5.767l3.09 1.27v3.581a.688.688 0 001.377 0V7.602l3.878 1.593v11.09l-8.345-3.428V5.767zM11.5 1.432l2.386.98L6.145 5.79 3.519 4.71l7.98-3.278zm.688 7.763l8.345-3.428v11.09l-8.345 3.428V9.195z"
        fill={color ?? '#BC4053'}
      />
    </Svg>
  );
}

export default BoxProfileIcon;
