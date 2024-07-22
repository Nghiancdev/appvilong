import * as React from "react"
import Svg, { Path } from "react-native-svg"

function NotiIcon({size = 20}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M14.354 10.146L13 8.793V7a5.007 5.007 0 00-4.5-4.975V1h-1v1.025A5.007 5.007 0 003 7v1.793l-1.353 1.354a.5.5 0 00-.147.353V12a.5.5 0 00.5.5h3.5v.389a2.576 2.576 0 002.25 2.599A2.503 2.503 0 0010.5 13v-.5H14a.5.5 0 00.5-.5v-1.5a.5.5 0 00-.146-.354zM9.5 13a1.5 1.5 0 01-3 0v-.5h3v.5zm4-1.5h-11v-.793l1.353-1.354A.5.5 0 004 9V7a4 4 0 018 0v2a.5.5 0 00.146.354l1.354 1.353v.793z"
        fill="#BC4053"
      />
    </Svg>
  )
}

export default NotiIcon
