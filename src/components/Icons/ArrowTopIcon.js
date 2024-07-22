import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ArrowTopIcon({size = 20, color = 'grey'}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.47 3.47a.75.75 0 011.06 0l6 6a.75.75 0 11-1.06 1.06l-4.72-4.72V20a.75.75 0 01-1.5 0V5.81l-4.72 4.72a.75.75 0 11-1.06-1.06l6-6z"
        fill={color}
      />
    </Svg>
  )
}

export default ArrowTopIcon
