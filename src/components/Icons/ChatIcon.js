import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ChatIcon({size = 20, color = '#BC4053'}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M6 8.5a.667.667 0 11-1.333 0A.667.667 0 016 8.5zM8.667 8.5a.667.667 0 11-1.334 0 .667.667 0 011.334 0zM11.333 8.5A.667.667 0 1110 8.5a.667.667 0 011.333 0z"
        fill={color}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.167 8.5A7.167 7.167 0 101.58 11.691a.59.59 0 01.054.413l-.397 1.485a1.367 1.367 0 001.673 1.673l1.484-.397a.59.59 0 01.414.054A7.167 7.167 0 0015.167 8.5zM8 2.333a6.167 6.167 0 11-2.745 11.69 1.589 1.589 0 00-1.118-.124l-1.484.397a.367.367 0 01-.449-.449l.397-1.484c.104-.39.04-.786-.124-1.118A6.167 6.167 0 018 2.333z"
        fill={color}
      />
    </Svg>
  )
}

export default ChatIcon
