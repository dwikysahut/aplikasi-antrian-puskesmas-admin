import { io } from 'socket.io-client';
import { URL_BASE } from './CONSTANT';

let socket = null;
const instance = () => {
  if (socket == null) {
    socket = io(URL_BASE);
  }
  return socket;
};

export default instance;
