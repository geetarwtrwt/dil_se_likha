"use client";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaHeart, FaBars } from "react-icons/fa6";
import Link from "next/link";

function NavBar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-background">
        <Link href="/" className="font-bold text-foreground text-xl">
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

          <button className="cursor-pointer px-8 py-1.5 bg-primary hover:bg-secondary transition text-white rounded-full">
            Login
          </button>
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
          <Link href="/" className="block hover:text-muted transition-all">
            Home
          </Link>
          <Link href="/" className="block hover:text-muted transition-all">
            About
          </Link>
          <Link href="/" className="block hover:text-muted transition-all">
            Blog
          </Link>
          <Link href="/" className="block hover:text-muted transition-all">
            Contact
          </Link>
          <button className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-secondary transition text-white rounded-full text-sm">
            Login
          </button>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
