import * as React from "react"
import Svg, { Path } from "react-native-svg"

function HomeIcon({size = 20, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={24}
      viewBox="0 0 25 24"
      fill="none"
    >
      <Path
        d="M9.657 20.771v-3.066c0-.78.636-1.414 1.424-1.42h2.886c.792 0 1.433.636 1.433 1.42v3.076c0 .662.534 1.204 1.203 1.219h1.924C20.445 22 22 20.46 22 18.562v0-8.724a2.44 2.44 0 00-.962-1.905l-6.58-5.248a3.18 3.18 0 00-3.945 0L3.962 7.943A2.42 2.42 0 003 9.847v8.715C3 20.46 4.555 22 6.473 22h1.924c.685 0 1.241-.55 1.241-1.229v0"
        stroke= {color ?? "#64748B"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default HomeIcon
