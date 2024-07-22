import * as React from "react"
import Svg, { Path } from "react-native-svg"

function BillIcon({size = 20, color = '#FF7643'}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
     
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.215 12.283a.676.676 0 01-.68.672h-9.07c-.376 0-.679-.3-.679-.672 0-.371.303-.671.68-.671h9.069c.375 0 .68.3.68.671zm0-5.036a.676.676 0 01-.68.671h-9.07c-.376 0-.679-.3-.679-.671 0-.372.303-.672.68-.672h9.069c.375 0 .68.3.68.672zM20.64 17.78l-2.764 2.616-2.975-2.814a.686.686 0 00-.942 0l-2.967 2.814-2.968-2.813a.685.685 0 00-.943 0l-2.967 2.813-2.754-2.615V4.029c0-1.48 1.222-2.686 2.721-2.686H17.92c1.5 0 2.72 1.205 2.72 2.686v13.752zM17.919 0H4.08C1.831 0 0 1.808 0 4.03v13.968c0 .013.007.025.008.039a.66.66 0 00.2.515l3.434 3.26c.265.25.68.25.944 0l2.967-2.814 2.968 2.814c.262.25.677.25.941 0l2.969-2.814 2.974 2.815a.683.683 0 00.941 0l3.444-3.26a.66.66 0 00.202-.516c.001-.015.008-.026.008-.04V4.03C22 1.808 20.17 0 17.919 0z"
        fill={color}
      />
    </Svg>
  )
}

export default BillIcon