import FindUsersBtn from "./FindUsersBtn";
import Modal from "./Modal";

function SearchUser() {
  return (
    <Modal>
      <Modal.Open opens="find-users">
        <FindUsersBtn />
      </Modal.Open>
      <Modal.Window name="find-users">
        <div className="p-4">
          <h2 className="text-lg font-bold">Search Users</h2>
          <input
            type="text"
            placeholder="Enter username..."
            className="border p-2 rounded w-full mt-2"
          />
        </div>
      </Modal.Window>
    </Modal>
  );
}

export default SearchUser;
