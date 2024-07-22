import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function NewIcon({size = 25, color = 'black'}) {
  return (
    <Svg
      height={size}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 512.001 512.001"
      xmlSpace="preserve"
      enableBackground="new 0 0 512.001 512.001">
      <Path
        fill={color}
        d="M497.052 301.696l-19.097-39.063a15.004 15.004 0 010-13.263l19.096-39.065c10.632-21.751 2.208-47.676-19.178-59.024l-38.409-20.378a15.004 15.004 0 01-7.796-10.729l-7.512-42.828c-4.183-23.847-26.243-39.865-50.208-36.479l-43.053 6.09c-4.644.661-9.241-.837-12.613-4.099l-31.251-30.231c-17.401-16.836-44.661-16.835-62.06-.001l-31.252 30.232a15.004 15.004 0 01-12.613 4.099l-43.053-6.09C114.089 37.484 92.028 53.5 87.845 77.346l-7.512 42.828a15.002 15.002 0 01-7.795 10.729l-38.41 20.38c-21.387 11.346-29.811 37.272-19.178 59.024l19.096 39.063a15.004 15.004 0 010 13.263L14.95 301.698c-10.632 21.751-2.208 47.676 19.178 59.024L72.537 381.1a15.004 15.004 0 017.796 10.729l7.512 42.829c4.183 23.847 26.242 39.861 50.208 36.479l43.053-6.09a14.998 14.998 0 0112.613 4.099l31.251 30.231c8.702 8.419 19.864 12.627 31.03 12.626 11.164-.001 22.332-4.209 31.03-12.625l31.252-30.232a15.002 15.002 0 0112.613-4.099l43.053 6.09c2.152.304 4.285.452 6.395.452 21.389-.002 40.006-15.226 43.814-36.93l7.512-42.828a15.002 15.002 0 017.795-10.729l38.41-20.38c21.387-11.348 29.811-37.274 19.178-59.026zM201.86 315.06a14.765 14.765 0 01-27.972 6.603L142.8 259.486v55.575c0 8.154-6.611 14.765-14.765 14.765s-14.765-6.611-14.765-14.765V196.94a14.765 14.765 0 0127.972-6.603l31.088 62.178V196.94c0-8.154 6.611-14.765 14.765-14.765s14.765 6.611 14.765 14.765v118.12zm73.825-73.825c8.154 0 14.765 6.611 14.765 14.765s-6.611 14.765-14.765 14.765h-34.452v29.53h44.295c8.154 0 14.765 6.611 14.765 14.765s-6.611 14.765-14.765 14.765h-59.06c-8.154 0-14.765-6.611-14.765-14.765V196.94c0-8.154 6.611-14.765 14.765-14.765h59.06c8.154 0 14.765 6.611 14.765 14.765s-6.611 14.765-14.765 14.765h-44.295v29.53h34.452zm123.042 73.825a14.765 14.765 0 01-27.972 6.603l-16.323-32.647-16.323 32.647a14.76 14.76 0 01-16.599 7.767 14.765 14.765 0 01-11.373-14.37V196.94c0-8.154 6.611-14.765 14.765-14.765s14.765 6.611 14.765 14.765v55.575l1.558-3.117a14.766 14.766 0 0126.414 0l1.558 3.117V196.94c0-8.154 6.611-14.765 14.765-14.765s14.765 6.611 14.765 14.765v118.12z"
      />
    </Svg>
  );
}

export default NewIcon;
