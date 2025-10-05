import EmojiPicker from "emoji-picker-react";
import { useState, useRef, useEffect } from "react";
import { useClickoutside } from "./hooks/useClickoutside";
// import { formatTime } from "./utils/helpers";
import ChatList from "./ChatList";
import ChatListHistory from "./ChatListHistory";
import { formatDate } from "./utils/helpers";
import { useChat } from "./hooks/useChat";

function Chatform({ user, handleSubmit }) {
  const { messages } = useChat();
  const [showPicker, setShowPicker] = useState(false);
  const [send, setSend] = useState("");
  const { chatUser: otherChatUser } = useChat();
  console.log("otherChatUser", otherChatUser);
  const ref = useRef();
  const inputFocusRef = useRef(null);

  const scrollRef = useRef(null);

  const handleEmojiClick = (emojiData) => {
    setSend((prev) => prev + emojiData.emoji);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // prevent newline
      handleSubmit(send);
      setSend("");
    }
  };

  useClickoutside(ref, () => setShowPicker(false));

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }

    inputFocusRef.current?.focus();
  }, [messages]);

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <ul
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-3 flex flex-col custom-scrollbar
           
           "
        role="log"
      >
        {(() => {
          let lastDate = null;

          return (messages[otherChatUser.id] || []).map((ms, i) => {
            const currentDate = formatDate(ms.sentAt);
            const showHistory = lastDate !== currentDate;

            const historyElement = showHistory ? (
              <ChatListHistory
                key={`history-${i}`}
                currentDate={lastDate}
                sentAt={ms.sentAt}
              />
            ) : null;

            if (showHistory) {
              lastDate = currentDate;
            }

            return (
              <div key={i} className="mb-2 last:mb-0">
                {historyElement}
                <ChatList message={ms} user={user} />
              </div>
            );
          });
        })()}
      </ul>

      <div className="flex items-center gap-2 p-2 border-t relative">
        <button
          type="button"
          onClick={() => setShowPicker((prev) => !prev)}
          className="text-2xl"
        >
          😀
        </button>

        <input
          value={send}
          onChange={(e) => setSend(e.target.value)}
          onKeyDown={handleKeyDown}
          className="border-orange-500 border-2 p-2 flex-1 rounded"
          placeholder="Type your message"
          ref={inputFocusRef}
        />

        {showPicker && (
          <div ref={ref} className="absolute bottom-12 left-0 z-10">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Chatform;
