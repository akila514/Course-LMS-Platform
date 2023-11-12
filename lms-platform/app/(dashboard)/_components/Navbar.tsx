"use-client";

import NavbarRoutes from "@/components/NavbarRoutes";
import MobileSidebar from "./MobileSidebar";

const Navbar = () => {
  return (
    <div className="p-4 border-b flex items-center bg-white shadow-sm fixed left-0 right-5 h-min top-0 z-10">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};

export default Navbar;
