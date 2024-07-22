import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const ListFillerIcon = ({size = 20, color}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none">
    <Path
      fill={color ?? '#BC4053'}
      d="M2.5 14.667h10a.833.833 0 0 1 .098 1.66l-.098.006h-10a.834.834 0 0 1-.098-1.66l.098-.006Zm0-5h15a.833.833 0 0 1 .098 1.66l-.098.006h-15a.834.834 0 0 1-.098-1.66l.098-.006Zm0-5H15a.833.833 0 0 1 .098 1.66L15 6.334H2.5a.833.833 0 0 1-.098-1.66l.098-.006Z"
    />
  </Svg>
);
export default ListFillerIcon;
