import { useEffect, useState } from "react";
import ContactList from "./ContactList";
import SearchBar from "./SearchBar";
import Slide from "./Slide";
import { useGetAllUsers } from "./hooks/useGetAllUsers";
import { useGetUsersConvertedWith } from "./hooks/useGetUsersConvertedWith";

function Sidebar() {
  const [searchvalue, setSearchValue] = useState("");
  const { usersServer, data } = useGetAllUsers();
  const { data: usersData, refetch } = useGetUsersConvertedWith();
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    refetch();
    if (!searchvalue) {
      setFilteredUsers(usersData || []);
    }
  }, [usersData, searchvalue, refetch]);

  async function handleEnterSearch(e) {
    const value = e.target.value;
    setSearchValue(value);
    await usersServer();
    setFilteredUsers(
      (data || []).filter((user) => {
        if (value.trim() === "") return true;
        return user.userName?.toLowerCase().startsWith(value.toLowerCase());
      })
    );
  }

  function handleChangeInput(e) {
    const value = e.target.value;
    setSearchValue(value);

    setFilteredUsers(
      (usersData || []).filter((user) => {
        if (value.trim() === "") return true;
        return user.userName?.toLowerCase().startsWith(value.toLowerCase());
      })
    );
  }

  return (
    <aside className="w-full h-full flex ">
      <Slide />

      <div className="flex-1">
        <SearchBar
          handleChangeInput={handleChangeInput}
          handleEnterSearch={handleEnterSearch}
          searchvalue={searchvalue}
        />
        <ContactList filteredUsers={filteredUsers} />
      </div>
    </aside>
  );
}

export default Sidebar;
