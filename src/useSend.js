import { useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";
import { useUser } from "./hooks/useUser";
import { useChat } from "./hooks/useChat";

const token = localStorage.getItem("token");
export function useSend() {
  const { setMessagesByChat } = useChat();
  const connectionRef = useRef(null);

  const user = useUser();
  let isMounted = useRef(true);

  const startConnection = async (connection) => {
    try {
      await connection.start();
      console.log("Connected to SignalR hub ");
      await connection.invoke("LoadConversation", user.id);
    } catch (err) {
      console.error("Connection failed:", err);
    }
  };

  useEffect(() => {
    if (connectionRef.current) return;

    const initConnection = async () => {
      if (connectionRef.current) {
        try {
          await connectionRef.current.stop();
        } catch (err) {
          console.warn("Error stopping old connection:", err);
        }
      }

      const connection = new signalR.HubConnectionBuilder()
        .withUrl(`http://localhost:5182/myHub?userId=${user.id}`, {
          accessTokenFactory: () => token,
        })
        .withAutomaticReconnect()
        .build();

      connection.on("ReceiveMessagesBatch", (messages) => {
        const group = messages.reduce((acc, msg) => {
          const chatId =
            msg.senderId === user.id ? msg.receiverId : msg.senderId;
          (acc[chatId] ||= []).push(msg);
          return acc;
        }, {});

        setMessagesByChat((prev) => ({
          ...prev,
          ...group,
        }));
      });

      connection.on("ReceiveMessage", (msg) => {
        // if (!isMounted.current) return;
        const chatId = msg.senderId === user.id ? msg.receiverId : msg.senderId;
        setMessagesByChat((prev) => ({
          ...prev,
          [chatId]: [...(prev[chatId] || []), msg],
        }));
      });

      connectionRef.current = connection;

      await startConnection(connection);
    };

    initConnection();

    // cleanup
    return () => {
      isMounted.current = false;

      if (
        connectionRef.current &&
        connectionRef.current.state === signalR.HubConnectionState.Connected
      ) {
        connectionRef.current.off("ReceiveMessage");
        connectionRef.current.stop();
      }
    };
  }, []);

  // Function to send message anytime
  const sendMessage = async (msg) => {
    if (connectionRef.current && connectionRef.current.state === "Connected") {
      try {
        await connectionRef.current.invoke("SendMessage", msg);
      } catch (err) {
        console.error("Send failed: ", err);
      }
    }
  };

  return { sendMessage };
}
