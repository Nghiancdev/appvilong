import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ArrowBackIcon({size = 25, color = 'black'}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 16 12"
      fill="none"
    >
      <Path
        d="M.275 5.315l4.9-5.033A.917.917 0 016.5.285a.99.99 0 01-.003 1.369L3.208 5.032h11.854c.518 0 .938.434.938.968s-.42.968-.938.968H3.209l3.29 3.378a.99.99 0 01.002 1.369.917.917 0 01-1.326.003L.276 6.686l-.001-.001a.99.99 0 010-1.37z"
        fill="#fff"
      />
    </Svg>
  )
}

export default ArrowBackIcon
