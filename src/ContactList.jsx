// import { useUser } from "./hooks/useUser";
import ContactItem from "./ContactItem";
import FindUsersBtn from "./FindUsersBtn";
import SearchBar from "./SearchBar";

function ContactList({ filteredUsers }) {
  if (filteredUsers?.length === 0)
    return <p className="p-4 text-gray-500">No other users available.</p>;

  return (
    <div className="bg-gray-50 rounded-tl-lg relative">
      <ul className="divide-y divide-zinc-300 py-3 px-2">
        {filteredUsers?.map((user) =>
          user ? <ContactItem key={user.id} Item={user} /> : null
        )}
      </ul>
    </div>
  );
}

export default ContactList;
