"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { io as ClinetIO } from "socket.io-client";
type SocketContextType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  socket: any | null;
  isConnected: boolean;
  onlineUsers: string[];
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  onlineUsers: [],
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const socketInstance = new (ClinetIO as any)(
      process.env.NEXT_PUPLIC_SITE_URL!,
      {
        path: "/api/socket/io",
        addTrailingSlash: false,
      }
    );
    socketInstance.on("connect", () => {
      setIsConnected(true);
    });

    socketInstance.on("online-users", (users: string[]) => {
      setOnlineUsers(users);
    });
    socketInstance.on("disconnect", () => {
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
