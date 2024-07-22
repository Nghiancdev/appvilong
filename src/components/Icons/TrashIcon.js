import * as React from "react"
import Svg, { Path } from "react-native-svg"

function TrashIcon({size = 22, color = 'grey'}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M20.5 6h-17M18.833 8.5l-.46 6.9c-.177 2.654-.266 3.981-1.13 4.79-.866.81-2.196.81-4.857.81h-.773c-2.661 0-3.992 0-4.857-.81-.865-.809-.953-2.136-1.13-4.79l-.46-6.9"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Path
        d="M6.5 6h.11a2 2 0 001.83-1.32l.034-.103.097-.291c.083-.249.125-.373.18-.479a1.5 1.5 0 011.094-.788C9.962 3 10.093 3 10.355 3h3.29c.262 0 .393 0 .51.019a1.5 1.5 0 011.094.788c.055.106.097.23.18.479l.097.291A2 2 0 0017.5 6"
        stroke={color}
        strokeWidth={1.5}
      />
    </Svg>
  )
}

export default TrashIcon
