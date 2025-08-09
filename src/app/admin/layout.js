import AdminSideBar from "../component/AdminSideBar";

export default function AdminLayout({ children }) {
  return (
    <div className="w-full h-screen">
      <div className="containerBox flex">
        <div className="hidden md:block md:w-[20%]">
          <AdminSideBar />
        </div>

        <div className="block md:hidden md:w-[20%]">
          <AdminSideBar />
        </div>
        
        <div className="w-full md:w-[80%] ps-10">{children}</div>
      </div>
    </div>
  );
}
