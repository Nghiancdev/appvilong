import { io } from 'socket.io-client';

const URL = `https://main.doapp.vn:6441`;

export const socket = io(URL, {
    autoConnect: false,
    reconnectionDelay: 2000,
    reconnectionDelayMax: 5000,
  });
