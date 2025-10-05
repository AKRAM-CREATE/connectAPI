import Logo from "./Logo";
import Logout from "./Logout";

function Header() {
  return (
    <header className="flex items-center justify-between bg-gray-100 h-full px-4">
      <Logo />
    
      <Logout />
    </header>
  );
}

export default Header;
