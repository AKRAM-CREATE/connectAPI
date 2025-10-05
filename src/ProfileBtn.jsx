import { useRef, useState } from "react";
import { HiOutlineUser } from "react-icons/hi";
import Profile from "./Profile";
// import { useClickoutside } from "./hooks/useClickoutside";

function ProfileBtn() {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  // useClickoutside(ref, () => setOpen(!open));
  function handleBtnClick() {
    // console.log("e", e.target);
    setOpen(!open);
  }

  return (
    <>
      {open && (
        <div ref={ref} className="absolute left-3.5 bottom-[4.5rem]">
          <Profile />
        </div>
      )}
      <button className="cursor-pointer mb-3" onClick={handleBtnClick}>
        <HiOutlineUser size={24} className="text-gray-600" />
      </button>
    </>
  );
}

export default ProfileBtn;
