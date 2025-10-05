import { useSearchParams } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi";
import { useChat } from "./hooks/useChat";
import {
  ContactDateChat,
  playNotificationSound,
  truncateMessage,
} from "./utils/helpers";
import { useEffect, useRef, useState } from "react";
import { useUser } from "./hooks/useUser";

function ContactItem({ Item }) {
  const { setChatUser, messages, chatUser } = useChat();
  const [SearchParams, setSearchParams] = useSearchParams();
  const { userName } = useUser();

  const lastMessage = Item?.id
    ? messages[Item.id]?.[messages[Item.id]?.length - 1]
    : null;

  const [notificationCount, setNotificationCount] = useState(0);
  const lastSeenMessageId = useRef(null);

  const preview = Item?.profileImageUrl
    ? `http://localhost:5182${Item.profileImageUrl}`
    : null;

  useEffect(() => {
    if (!lastMessage) return;

    if (lastSeenMessageId.current === null) {
      lastSeenMessageId.current = lastMessage.id;
      return;
    }

    // console.log("lastmessage", lastMessage);
    // console.log("chatUser.userName", chatUser?.userName);
    if (lastSeenMessageId.current === lastMessage.id) {
      // console.log("equal ");
      // console.log("lastSeenMessageId.current ", lastSeenMessageId.current);
      // console.log("lastMessage.id ", lastMessage.id);
      return;
    }

    if (
      lastSeenMessageId.current !== lastMessage.id &&
      lastMessage.userName !== userName &&
      lastMessage.senderId !== chatUser?.id
    ) {
      // console.log("not equal");
      // console.log("lastSeenMessageId.current ", lastSeenMessageId.current);
      // console.log("lastMessage.id ", lastMessage.id);
      // console.log("lastmessage", lastMessage);
      // console.log("chatUser.userName", chatUser?.userName);
      setNotificationCount((prev) => prev + 1);
      playNotificationSound();
      return;
    }

    // If chat is not open for this user, increment notification
    // if (!chatUser || chatUser.id !== Item.id) {
    //   setNotificationCount((prev) => prev + 1);
    // } else {
    //   setNotificationCount(0); // Reset if chat is open
    // }

    lastSeenMessageId.current = lastMessage.id;

    return () => {
      setNotificationCount(0);
    };
  }, [lastMessage, chatUser, Item.id, userName]);

  const handleClick = () => {
    setChatUser(Item);
    setSearchParams({ userName: Item.userName });

    setNotificationCount(0); // Reset notifications on click
  };

  return (
    <li
      onClick={handleClick}
      style={{ cursor: "pointer" }}
      className="w-full px-3 py-3 hover:bg-gray-100 rounded flex items-center"
    >
      <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
        {preview ? (
          <img
            src={preview}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <HiOutlineUser size={20} className="text-white" />
        )}
      </div>

      <div className="flex-1 ml-3 p-1 flex flex-col justify-between gap-y-1">
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-700">{Item.userName}</span>
          {lastMessage?.sentAt && (
            <span className="text-gray-500 text-xs">
              {ContactDateChat(lastMessage?.sentAt)}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-gray-500 text-sm gap-x-2">
          {truncateMessage(lastMessage?.message)}
          {notificationCount > 0 && (
            <div className="bg-green-500 px-1.5 rounded-full text-white text-xs font-semibold">
              {notificationCount}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default ContactItem;
