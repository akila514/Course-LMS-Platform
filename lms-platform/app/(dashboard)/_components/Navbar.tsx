"use-client";

import NavbarRoutes from "@/components/NavbarRoutes";
import MobileSidebar from "./MobileSidebar";

const Navbar = () => {
  return (
    <div className="relative">
      <div className="p-4 border-b flex items-center bg-white shadow-sm absolute left-0 right-0 h-min top-0 z-10">
        <MobileSidebar />
        <NavbarRoutes />
      </div>
    </div>
  );
};

export default Navbar;
