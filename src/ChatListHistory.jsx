import {
  formatDate,
  getDayOfWeek,
  isToday,
  isWithinPastSixDays,
  isYesterday,
} from "./utils/helpers";
function ChatListHistory({ currentDate, sentAt }) {
  const safeCurrent = currentDate ?? "01/01/1900";

  if (isToday(sentAt)) {
    return (
      <li className="mx-auto text-[13px] bg-gray-200 py-1 px-1.5 w-fit rounded text-black-800/70 tracking-wider">
        Today
      </li>
    );
  }

  if (isYesterday(sentAt)) {
    return (
      <li className="mx-auto text-[13px] bg-gray-200 py-1 px-1.5 w-fit rounded text-black-800/70 tracking-wider">
        Yesterday
      </li>
    );
  }

  if (safeCurrent !== formatDate(sentAt) && isWithinPastSixDays(sentAt)) {
    return (
      <li className="mx-auto text-[13px] bg-gray-200 py-1 px-1.5 w-fit rounded text-black-800/70 tracking-wider">
        {getDayOfWeek(sentAt)}
      </li>
    );
  }

  if (safeCurrent !== formatDate(sentAt)) {
    return (
      <li className="mx-auto text-[13px] bg-gray-200 py-1 px-1.5 w-fit rounded text-black-800/70 tracking-wider">
        {formatDate(sentAt)}
      </li>
    );
  }

  return null;
}

export default ChatListHistory;
