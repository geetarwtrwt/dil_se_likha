"use client";
import { useState } from "react";
import Link from "next/link";
import { FaBars } from "react-icons/fa6";
import AdminSideBar from "@/app/component/AdminSideBar";
import { UseAppContext } from "@/app/AuthContext";

export default function AdminLayout({ children }) {
  let { setUserData, axios, route, toast } = UseAppContext();

  const [open, setOpen] = useState(false);

  let handleLogout = async () => {
    try {
      let res = await axios.post("/api/user/logout");
      if (res.data.success) {
        route.push("/my-account");
        setUserData(null);
      } else {
        toast.error("Logout failed");
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err.message);
    }
  };

  return (
    <div className="min-h-[500px] flex flex-col relative">
      <div className="fixed top-0 w-full z-50 py-4 border-b border-gray-300 bg-background">
        <div className="containerBox flex justify-between">
          <div className="flex items-center gap-4">
            <FaBars
              onClick={() => setOpen(!open)}
              className="block md:hidden"
            />
            <Link href="/" className="font-bold text-2xl text-primary">
              DilSeLikha
            </Link>
          </div>

          <button
            onClick={() => {
              handleLogout();
            }}
            className="cursor-pointer px-8 py-1.5 bg-primary hover:bg-secondary transition text-white rounded-full"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="containerBox flex items-center justify-center w-full">
        {open && (
          <div className="block md:hidden z-30 absolute top-[70px] left-0 w-[150px] bg-background h-screen border-r border-gray-300">
            <AdminSideBar  setOpen={setOpen}/>
          </div>
        )}

        <div className="hidden md:block md:w-[20%] h-full border-r border-primary">
          <AdminSideBar setOpen={setOpen}/>
        </div>
        <div className="w-full md:w-[80%] ps-10 h-full">{children}</div>
      </div>
    </div>
  );
}
