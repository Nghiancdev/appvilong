import * as React from "react"
import Svg, { Path } from "react-native-svg"

function RibbonIcon({size = 25, color = '#fdd100'}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={size}
      height={size}
      viewBox="0 0 467.095 467.096"
      xmlSpace="preserve"
      enableBackground="new 0 0 467.095 467.096"
    >
      <Path fill={color} d="M23.551 148.443S0 153.053 0 176.322v142.33s2.615-28.673 23.551-28.673h443.544l-45.231-73.29 45.231-68.246H23.551z" />
    </Svg>
  )
}

export default RibbonIcon
