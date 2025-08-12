import Link from "next/link";
import AdminSideBar from "../component/AdminSideBar";

export default function AdminLayout({ children }) {
  return (
    <div>
      <div
        className="fixed top-0 w-full z-50 flex items-center justify-between py-4
      border-b border-gray-300 bg-background "
      >
        <div className="containerBox">
          <Link href="/" className="font-bold text-2xl text-primary">
            DilSeLikha
          </Link>
        </div>
      </div>
      <div className="containerBox flex pt-16">
        <div className="hidden md:block md:w-[20%]">
          <AdminSideBar />
        </div>

        <div className="block md:hidden md:w-[20%]">
          <AdminSideBar />
        </div>

        <div className="w-full md:w-[80%] ps-10 border-s-2 pb-10 border-primary">
          {children}
        </div>
      </div>
    </div>
  );
}
