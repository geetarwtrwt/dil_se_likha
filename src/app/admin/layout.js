import Link from "next/link";
import AdminSideBar from "../component/AdminSideBar";

export default function AdminLayout({ children }) {
  return (
    <div>
      <div className="containerBox flex py-16 pt-28">
        <div className="hidden md:block md:w-[20%]">
          <AdminSideBar />
        </div>

        <div className="block md:hidden md:w-[20%]">
          <AdminSideBar />
        </div>

        <div className="w-full md:w-[80%] ps-10 border-s-2 border-primary">
          {children}
        </div>
      </div>
    </div>
  );
}
