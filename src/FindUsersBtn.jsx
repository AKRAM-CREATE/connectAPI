function FindUsersBtn({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-green-500 border-2 border-black w-12 h-12 rounded-full flex items-center justify-center hover:bg-green-600 active:scale-95 transition transform"
      title="Find Users"
    >
      <div className="relative w-6 h-6">
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-black -translate-y-1/2"></div>

        <div className="absolute left-1/2 top-0 w-[2px] h-full bg-black -translate-x-1/2"></div>
      </div>
    </button>
  );
}

export default FindUsersBtn;
