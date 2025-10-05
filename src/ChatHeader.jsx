import { HiOutlineUser } from "react-icons/hi";

function ChatHeader({ chatUser: user }) {
  if (!user) return null;

  const preview = user?.profileImageUrl
    ? `http://localhost:5182${user.profileImageUrl}`
    : null;

  return (
    <div className="bg-gray-200 w-full h-[4rem] flex items-center px-3 shadow-sm">
      <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center overflow-hidden">
        {preview ? (
          <img
            src={preview}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <HiOutlineUser size={20} className="text-white" />
        )}
      </div>

      <p className="ml-3 font-medium text-gray-800">{user.userName}</p>
    </div>
  );
}

export default ChatHeader;
