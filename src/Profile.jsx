import { HiOutlineUser, HiPencil } from "react-icons/hi";
import { useUser } from "./hooks/useUser";
import Logout from "./Logout";

import { useRef, useState } from "react";
import { useAddPhoto } from "./hooks/useAddPhoto";

function Profile() {
  const user = useUser();
  const fileInputRef = useRef(null);
  const { mutateAsync: uploadImage } = useAddPhoto();

  // 👉 Initialize preview:
  // if the user already has an image in DB, prepend server URL
  const [preview, setPreview] = useState(
    user?.profileImageUrl
      ? `http://localhost:5182${user.profileImageUrl}`
      : null
  );

  console.log("preview :", preview);

  // Trigger file input click
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Step 1: Local preview (instant feedback before uploading)
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result); // base64 string
    reader.readAsDataURL(file);

    try {
      // Step 2: Upload to server
      const data = await uploadImage({ userId: user.id, file });
      console.log("Server response:", data);

      // Step 3: Update preview with final server URL
      if (data?.imageUrl) {
        console.log("data :", data);
        setPreview(`http://localhost:5182${data.imageUrl}`);
      }
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="w-[20rem] h-[20rem] bg-gray-50 border-2 border-amber-500 flex flex-col items-center relative p-6 rounded-2xl justify-evenly z-10">
      {/* Profile Circle */}
      <button
        className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center relative group overflow-hidden"
        onClick={handleUploadClick}
      >
        {preview ? (
          <img
            src={preview}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <HiOutlineUser size={35} className="text-gray-500" />
        )}

        {/* Pencil Icon */}
        {/* Pencil Icon */}
        <div className="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <HiPencil size={14} className="text-gray-800" />
        </div>
      </button>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleFileChange}
      />

      {/* User Info */}
      <div className="grid grid-cols-[7rem_1fr] gap-x-4 gap-y-2 w-full">
        <p className="font-semibold text-gray-700">Username:</p>
        <p className="text-gray-600">{user?.userName || "Username"}</p>

        <p className="font-semibold text-gray-700">Email:</p>
        <p className="text-gray-600">{user?.email || "email@example.com"}</p>
      </div>

      <Logout />
    </div>
  );
}

export default Profile;
