import * as React from "react"
import Svg, { Path } from "react-native-svg"

function QRCodeIcon({size = 25, color = 'grey'}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
     
    >
      <Path
        d="M14.312 14.313h.375m-.375.374h.375m-.375 5.626h.375m-.375.375h.375m2.625-3.375h.375m-.375.375h.375m2.625-3.375h.375m-.375.374h.375m-.375 5.626h.375m-.375.375h.375M5 10h3a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v3a2 2 0 002 2zm0 11h3a2 2 0 002-2v-3a2 2 0 00-2-2H5a2 2 0 00-2 2v3a2 2 0 002 2zm11-11h3a2 2 0 002-2V5a2 2 0 00-2-2h-3a2 2 0 00-2 2v3a2 2 0 002 2zm-1 4.5a.5.5 0 11-1 0 .5.5 0 011 0zm0 6a.5.5 0 11-1 0 .5.5 0 011 0zm3-3a.5.5 0 11-1 0 .5.5 0 011 0zm3-3a.5.5 0 11-1 0 .5.5 0 011 0zm0 6a.5.5 0 11-1 0 .5.5 0 011 0z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default QRCodeIcon
