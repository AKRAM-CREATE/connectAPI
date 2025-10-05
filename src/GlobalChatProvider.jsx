import ChatContext from "./hooks/useChat";
import { useState } from "react";

export function GlobalChatProvider({ children }) {
  const [chatUser, setChatUser] = useState(null);
  const [messages, setMessagesByChat] = useState({});

  return (
    <ChatContext.Provider
      value={{ chatUser, setChatUser, messages, setMessagesByChat }}
    >
      {children}
    </ChatContext.Provider>
  );
}
