import { Outlet } from "react-router-dom";
import Dashboard from "./Dashboard";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Slide from "./Slide";

function AppLayout() {
  return (
    <div className="grid grid-cols-[23rem_1fr] grid-rows-[3.5rem_1fr] w-full h-screen gap-x-[3px]">
      <div className="col-span-2 ">
        <Header />
      </div>

      <Sidebar />

      <main className="flex flex-col flex-1 min-h-0">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
