import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ComboIcon({size = 24}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M13.154 7.997v7.534a.464.464 0 01-.469.469H3.307a.464.464 0 01-.47-.469V8.73c0-.17.094-.32.235-.404l1.266-.731a.445.445 0 01.235-.066h2.016l1.407 1.2 1.407-1.2h3.282c.263 0 .469.206.469.47z"
        fill="#E63950"
      />
      <Path
        d="M13.154 7.997v7.534a.464.464 0 01-.469.469h-4.69V8.729l1.408-1.2h3.282c.263 0 .469.205.469.468z"
        fill="#D0004F"
      />
      <Path
        d="M8.315.938a1.471 1.471 0 00-.32-.394 1.846 1.846 0 00-2.241-.29c-.6.347-.956.994-.938 1.688.01.093.057 1.488.057 1.488C4.77 3.373 3.7 2.708 3.7 2.708c-.122-.057-.966-.694-2.007-.085a1.89 1.89 0 00-.872 1.135c-.131.488-.065.994.188 1.426.516.9 1.67 1.2 2.56.684l1.207-.697-1.681-.112a.933.933 0 01-1.273-.342.91.91 0 01-.095-.715.955.955 0 01.441-.57.869.869 0 01.445-.133c.242 0 .443.119.551.182l.06.034c.147.092 1.1.683 1.199.737l.035.02-.008.004h.013l1.126.657.218-1.438.006-.017-.003-.08s-.05-1.454-.06-1.552c-.006-.281.174-.607.474-.78a.899.899 0 01.713-.094c.15.04.28.116.382.222l.07.067c.027.022.07.07.108.136a.978.978 0 01-.154 1.18c-.05.047-.118.097-.178.132l-.047.027-.125 1.155.637-.368c.131-.075.253-.168.366-.271.6-.582.769-1.554.319-2.314zM6.589 7.528v5.19c0 .187.113.356.29.43a.448.448 0 00.507-.102l.61-.6.61.6c.13.14.337.178.506.103a.468.468 0 00.29-.431v-5.19H6.59z"
        fill="#FED843"
      />
      <Path
        d="M15.53 5.652h-.47v-.468a.469.469 0 10-.937 0v.468h-.469a.469.469 0 100 .938h.47v.47a.469.469 0 10.937 0v-.47h.469a.469.469 0 100-.938zM13.623 3.777a.469.469 0 100-.938.469.469 0 000 .938zM11.747 6.59a.469.469 0 100-.938.469.469 0 000 .938zM7.996 7.528h1.407v5.19a.468.468 0 01-.291.43.448.448 0 01-.507-.102l-.61-.6V7.527zM7.996 3.252V.544c.122.103.234.244.319.394.45.76.281 1.732-.32 2.314z"
        fill="#FFB64C"
      />
      <Path
        d="M12.057 3.683L10.65 1.245a.474.474 0 00-.647-.17L7.996 2.24l-.269.155L2.395 5.47.259 6.703c-.226.122-.332.412-.2.638l1.438 2.438c.13.225.412.3.637.169l5.862-3.386 3.883-2.241a.474.474 0 00.178-.638z"
        fill="#FF641A"
      />
      <Path
        d="M11.879 4.32L7.996 6.563V2.24l2.007-1.163a.474.474 0 01.647.169l1.407 2.438a.474.474 0 01-.178.638z"
        fill="#E63950"
      />
    </Svg>
  )
}

export default ComboIcon
