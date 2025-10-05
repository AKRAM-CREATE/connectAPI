import { useSend } from "./useSend";
import { useUser } from "./hooks/useUser";
import ContactList from "./ContactList";
import { useReadUrl } from "./hooks/useReadUrl";
import Chatform from "./Chatform";
import ChatHeader from "./ChatHeader";

import { useChat } from "./hooks/useChat";
import SearchBar from "./SearchBar";

function Dashboard() {
  const { sendMessage } = useSend();
  const user = useUser();
  const { userName: recieverUsername } = useReadUrl();

  const { chatUser: otherChatUser } = useChat();

  function handleSubmit(messageText) {
    sendMessage({
      userName: user.userName,
      message: messageText,
      senderId: user.id,
      receiverId: otherChatUser.id,
      recieverUsername: otherChatUser.userName,
    });
  }

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {otherChatUser && (
        <>
          <ChatHeader chatUser={otherChatUser} />

          <Chatform
            key={otherChatUser.id}
            handleSubmit={handleSubmit}
            user={user}
            recieverUsername={recieverUsername}
          />
        </>
      )}
    </div>
  );
}

export default Dashboard;
