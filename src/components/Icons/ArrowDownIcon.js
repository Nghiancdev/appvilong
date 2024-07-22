import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ArrowDownIcon({size = 20, color = 'grey'}) {
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
        d="M12 3.25a.75.75 0 01.75.75v14.19l4.72-4.72a.75.75 0 111.06 1.06l-6 6a.75.75 0 01-1.06 0l-6-6a.75.75 0 111.06-1.06l4.72 4.72V4a.75.75 0 01.75-.75z"
        fill={color}
      />
    </Svg>
  )
}

export default ArrowDownIcon
