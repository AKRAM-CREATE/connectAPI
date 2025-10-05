import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login", { replace: true });
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 text-blue-600 hover:text-blue-900 cursor-pointer"
    >
      <HiArrowRightOnRectangle size={18} />
      <span>Logout</span>
    </button>
  );
}

export default Logout;
