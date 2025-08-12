"use client";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaHeart, FaBars } from "react-icons/fa6";
import Link from "next/link";
import { UseAppContext } from "../AuthContext";

function NavBar() {
  let { userData, setUserData, axios, route, toast } = UseAppContext();
  const [open, setOpen] = useState(false);

  let handleLogout = async () => {
    try {
      let res = await axios.post("/api/user/logout");
      console.log(res);
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
    <>
      <header className="fixed top-0 w-full z-50  py-4 border-b border-gray-300 bg-background">
        <nav className="containerBox flex items-center justify-between">
          <Link href="/" className="font-bold text-2xl text-primary">
            DilSeLikha
          </Link>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center gap-8 font-medium text-foreground">
            <Link href="/" className="hover:text-muted transition-all">
              Home
            </Link>
            <Link href="/" className="hover:text-muted transition-all">
              About
            </Link>
            <Link href="/" className="hover:text-muted transition-all">
              Blog
            </Link>
            <Link href="/" className="hover:text-muted transition-all">
              Contact
            </Link>

            <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
              <input
                className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
                type="text"
                placeholder="Search products"
              />
              <IoSearch />
            </div>

            <div className="relative cursor-pointer">
              <FaHeart className="text-primary text-xl" />
            </div>
            {userData ? (
              <button
                onClick={() => handleLogout()}
                className="cursor-pointer px-8 py-1.5 bg-primary hover:bg-secondary transition text-white rounded-full"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => route.push("/my-account")}
                className="cursor-pointer px-8 py-1.5 bg-primary hover:bg-secondary transition text-white rounded-full"
              >
                Login
              </button>
            )}
          </div>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="sm:hidden"
          >
            <FaBars />
          </button>

          {/* Mobile Menu */}
          <div
            className={`${
              open ? "flex" : "hidden"
            } z-50 absolute top-[60px] left-0 w-full bg-background shadow-md py-2 flex-col items-start gap-2 px-5 text-sm md:hidden font-medium text-foreground`}
          >
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="block hover:text-muted transition-all"
            >
              Home
            </Link>
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="block hover:text-muted transition-all"
            >
              About
            </Link>
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="block hover:text-muted transition-all"
            >
              Blog
            </Link>
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="block hover:text-muted transition-all"
            >
              Contact
            </Link>

            {userData ? (
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="cursor-pointer px-8 py-1.5 bg-primary hover:bg-secondary transition text-white rounded-full"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  route.push("/my-account");
                  setOpen(false);
                }}
                className="cursor-pointer px-8 py-1.5 bg-primary hover:bg-secondary transition text-white rounded-full"
              >
                Login
              </button>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}

export default NavBar;
