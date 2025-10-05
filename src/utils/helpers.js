export function formatTime(dateString) {
  // Ensure UTC is correctly parsed
  const date = new Date(
    dateString.endsWith("Z") ? dateString : dateString + "Z"
  );

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function playNotificationSound() {
  const audio = new Audio("/sounds/notificationSound.wav");
  audio.play().catch((err) => {
    console.error("Sound playback failed:", err);
  });
}

export function isYesterday(date) {
  const given = new Date(date);
  const today = new Date();

  // Move today back by one day
  const yesterday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 1
  );

  return (
    given.getDate() === yesterday.getDate() &&
    given.getMonth() === yesterday.getMonth() &&
    given.getFullYear() === yesterday.getFullYear()
  );
}

export function formatDate(sentAt) {
  const date = new Date(sentAt);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function isWithinPastSixDays(sentAt) {
  const givenDate = new Date(sentAt);
  const now = new Date();

  const diffInMs = now - givenDate; // difference in milliseconds
  const sixDaysInMs = 6 * 24 * 60 * 60 * 1000; // 6 days in milliseconds

  return diffInMs <= sixDaysInMs;
}

export function getDayOfWeek(sentAt) {
  const date = new Date(sentAt);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[date.getDay()];
}

export function isToday(date) {
  const given = new Date(date);
  const today = new Date();

  return (
    given.getDate() === today.getDate() &&
    given.getMonth() === today.getMonth() &&
    given.getFullYear() === today.getFullYear()
  );
}

export function ContactDateChat(date) {
  if (isToday(date)) return formatTime(date);

  if (isWithinPastSixDays(date)) return getDayOfWeek(date);
  else return formatDate(date);
}

export function truncateMessage(message, maxLength = 30) {
  if (!message) return "";
  return message.length > maxLength
    ? message.substring(0, maxLength) + "…"
    : message;
}
