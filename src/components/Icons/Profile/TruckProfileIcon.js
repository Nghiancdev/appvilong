import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

function TruckProfileIcon({size = 25, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 23 22"
      fill="none">
      <G
        clipPath="url(#clip0_1254_8097)"
        stroke={color ?? '#BC4053'}
        strokeWidth={1.3}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round">
        <Path d="M3.3 16.441H1.145V3.537h12.487V16.44h-6.42M15.78 16.441h-2.148M13.632 6.435h4.773a3.45 3.45 0 013.45 3.45v6.556h-2.164" />
        <Path d="M21.855 12.013h-5.183V6.435M5.256 18.463a1.956 1.956 0 100-3.911 1.956 1.956 0 000 3.911zM17.735 18.463a1.956 1.956 0 100-3.911 1.956 1.956 0 000 3.911zM21.855 14.146h-.82M1.145 12.013h12.487" />
      </G>
      <Defs>
        <ClipPath id="clip0_1254_8097">
          <Path fill="#fff" transform="translate(.5)" d="M0 0H22V22H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default TruckProfileIcon;
