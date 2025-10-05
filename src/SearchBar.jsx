// import { useState } from "react";
import { HiSearch } from "react-icons/hi";
import { MdSearch } from "react-icons/md";

function SearchBar({ handleChangeInput, searchvalue, handleEnterSearch }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // prevent newline
      handleEnterSearch(e);
    }
  };

  return (
    <div className="bg-amber-400 p-2.5 flex flex-col gap-2">
      <h3>Chats</h3>

      <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2">
        <MdSearch className="text-gray-500 w-5 h-5" />
        <input
          type="text"
          placeholder="Search or start new chat"
          className="bg-transparent outline-none w-full text-sm"
          value={searchvalue}
          onChange={(e) => handleChangeInput(e)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}

export default SearchBar;
