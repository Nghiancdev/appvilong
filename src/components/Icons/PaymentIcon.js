import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function PaymentIcon({size = 24, color = 'grey'}) {
  return (
    <Svg
      height={size}
      viewBox="0 0 512 512"
      width={size}
      xmlns="http://www.w3.org/2000/svg">
      <Path
        fill={color}
        d="M456.749 314.252l-56.737 74.195A60.003 60.003 0 01352.35 412H247c-8.284 0-15-6.716-15-15s6.716-15 15-15h91.309c19.625 0 36.06-16.061 35.685-35.683C373.63 327.302 358.102 312 339 312H234c-30.147-28.987-76.669-32.379-110.702-8.07L112 312v170H372.864a90 90 0 0075.706-41.332l58.539-91.061a30.79 30.79 0 004.89-16.651c.001-29.446-37.364-42.095-55.25-18.704zM67 282H15c-8.284 0-15 6.716-15 15v200c0 8.284 6.716 15 15 15h52c8.284 0 15-6.716 15-15V297c0-8.284-6.716-15-15-15zM286.31 82.905c-3.052 2.34-4.734 5.883-5.312 8.956-.799 4.239.212 8.177 2.577 10.031a35.545 35.545 0 002.735 1.926z"
      />
      <Path
        fill={color}
        d="M297 250c68.925 0 125-56.075 125-125S365.925 0 297 0 172 56.075 172 125s56.075 125 125 125zm-37.839-84.131c3.022-4.62 9.221-5.92 13.843-2.894 5.401 3.533 8.786 5.065 13.306 5.7v-42.231c-6.387-2.927-11.161-5.744-15.078-8.817-8.299-6.509-12.088-17.801-9.889-29.472 2.396-12.718 11.249-22.837 23.102-26.407a57.464 57.464 0 011.865-.525V55c0-5.522 4.478-10 10-10s10 4.478 10 10v5.127c9.709 1.681 16.571 6.461 19.895 10.276 3.628 4.164 3.192 10.481-.972 14.108-4.142 3.608-10.413 3.198-14.051-.905-.228-.231-1.817-1.761-4.872-2.888v32.312c1.775.659 3.549 1.298 5.29 1.914 17.578 6.214 27.355 22.486 24.329 40.491-2.353 13.995-13.003 28.188-29.619 32.403V195c0 5.522-4.478 10-10 10s-10-4.478-10-10v-6.202c-8.074-.698-14.767-2.879-24.255-9.086-4.622-3.024-5.917-9.221-2.894-13.843z"
      />
      <Path
        fill={color}
        d="M316.205 152.12c.657-3.909.926-13.224-9.896-17.781v32.121c5.625-3.222 8.985-8.92 9.896-14.34z"
      />
    </Svg>
  );
}

export default PaymentIcon;
