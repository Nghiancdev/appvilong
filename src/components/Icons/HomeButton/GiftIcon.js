import * as React from "react"
import Svg, { Path } from "react-native-svg"

function GiftIcon({size = 25, color = "black"}) {
  return (
    <Svg
      height={size}
      viewBox="0 0 32 32"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M13 4c-2.197 0-4 1.803-4 4 0 .73.214 1.408.56 2H5a1 1 0 00-1 1v4a1 1 0 001 1h22a1 1 0 001-1v-4a1 1 0 00-1-1h-4.56A3.94 3.94 0 0023 8c0-2.197-1.803-4-4-4-1.197 0-2.265.546-3 1.389C15.265 4.546 14.197 4 13 4zm0 2c1.117 0 2 .884 2 2v2h-2c-1.117 0-2-.884-2-2s.883-2 2-2zm6 0c1.117 0 2 .884 2 2s-.884 2-2 2h-2V8c0-1.116.883-2 2-2zM6 18v9a1 1 0 001 1h8V18h-1.22zm11 0v10h8a1 1 0 001-1v-9h-7.702z"
        vectorEffect="none"
        paintOrder="normal"
        fill={color}
      />
    </Svg>
  )
}

export default GiftIcon
