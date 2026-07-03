import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;
console.log("SOCKET_URL:", process.env.NEXT_PUBLIC_API_URL);
export const getSocket = (): Socket => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      autoConnect: false,
    });
  }
  return socket;
};

export const connectSocket = (): Socket => {
  const s = getSocket();
  if (!s.connected) {
    const token = localStorage.getItem("accessToken");
    s.auth = { token };
    s.connect();
  }
  return s;
};

export const disconnectSocket = () => {
  if (socket?.connected) {
    socket.disconnect();
  }
};
