import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"

function SuccessIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={71}
      height={70}
      viewBox="0 0 71 70"
      fill="none"
      {...props}
    >
      <Circle cx={35.5} cy={35} r={35} fill="#09B825" />
      <Path
        d="M47.894 19.55L31.856 40.695l-9.481-9.474L18 35.595l14.581 14.58L53 23.926l-5.106-4.374z"
        fill="#fff"
      />
    </Svg>
  )
}

export default SuccessIcon
