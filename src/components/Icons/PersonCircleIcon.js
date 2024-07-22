import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function PersonCircleIcon({size = 25, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.25 8a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM11 5.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
        fill={color ?? '#111C30'}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.25 11C.25 5.063 5.063.25 11 .25S21.75 5.063 21.75 11 16.937 21.75 11 21.75.25 16.937.25 11zM11 1.75a9.25 9.25 0 00-6.558 15.773c.18-.973.535-1.89 1.246-2.628C6.753 13.791 8.454 13.25 11 13.25c2.546 0 4.247.541 5.311 1.645.712.738 1.066 1.655 1.247 2.629A9.25 9.25 0 0011 1.75zm5.194 16.905c-.102-1.212-.365-2.1-.962-2.719-.65-.673-1.853-1.186-4.232-1.186-2.379 0-3.582.513-4.232 1.186-.597.62-.86 1.507-.962 2.72A9.207 9.207 0 0011 20.25a9.208 9.208 0 005.194-1.595z"
        fill={color ?? '#111C30'}
      />
    </Svg>
  );
}

export default PersonCircleIcon;
