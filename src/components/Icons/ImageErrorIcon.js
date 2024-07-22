import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ImageErrorIcon({size = 25, color = 'black'}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      viewBox="0 0 64 64"
      width={size}
    >
      <Path
        d="M58 54H6a2 2 0 01-2-2V12a2 2 0 012-2h52a2 2 0 012 2v40a2 2 0 01-2 2z"
        fill="#fafafa"
      />
      <Path
        d="M50 20a4 4 0 11-4-4 4 4 0 014 4zM5.109 52.425l17.064-24.25a1 1 0 011.642.01L34 43l8.194-10.925a1 1 0 011.604.005l15.023 20.326A1.006 1.006 0 0158 54H5.926a1 1 0 01-.817-1.575z"
        fill="#e0e0e0"
      />
      <Path
        d="M58 9H6a3.003 3.003 0 00-3 3v40a3.003 3.003 0 003 3h52a3.003 3.003 0 003-3V12a3.003 3.003 0 00-3-3zM6.216 53l16.768-24.22L39.131 53zm35.32 0l-6.488-9.731 7.94-10.586L57.764 53zM59 51.3L44.605 31.507a1.978 1.978 0 00-1.602-.823l-.016-.001a1.98 1.98 0 00-1.6.8l-7.515 10.022-9.224-13.835a1.996 1.996 0 00-1.645-.89 2.06 2.06 0 00-1.663.86L5 51.244V12a1.001 1.001 0 011-1h52a1.001 1.001 0 011 1zM46 15a5 5 0 105 5 5.006 5.006 0 00-5-5zm0 8a3 3 0 113-3 3.003 3.003 0 01-3 3z"
        fill="#9e9e9e"
      />
    </Svg>
  )
}

export default ImageErrorIcon