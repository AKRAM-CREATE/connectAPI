import { formatTime } from "./utils/helpers";

function ChatList({ message: ms, user }) {
  const isMine = user.userName === ms.userName;

  return (
    <li
      className={`flex items-center gap-2 ${
        isMine ? "justify-end" : "justify-start"
      }`}
    >
      <p
        className={`
          px-3 py-1 rounded-full text-black
          bg-amber-400
          shadow-sm
          max-w-[70%] break-words
        `}
      >
        {ms.message}{" "}
        <span className="text-[10px] opacity-70 pl-3.5" dir="ltr">
          {formatTime(ms.sentAt)}
        </span>
      </p>
    </li>
  );
}

export default ChatList;
