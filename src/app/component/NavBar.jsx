"use client";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaHeart, FaBars } from "react-icons/fa6";
import Link from "next/link";
import { UseAppContext } from "../AuthContext";

function NavBar() {
  let {
    userData,
    setUserData,
    axios,
    route,
    toast,
    inputSearchData,
    setInputSearchData,
    pathName,
  } = UseAppContext();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

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

  let handleInput = (e) => {
    setInputSearchData(e.target.value);
    if (e.target.value.trim().length > 0) {
      route.push("/blog");
    }
  };
  useEffect(() => {
    if (pathName === "/") {
      setInputSearchData("");
    }
  }, [pathName]);

  return (
    <>
      <header className="fixed top-0 w-full z-50  py-4 border-b border-gray-300 bg-background">
        <nav className="containerBox flex items-center justify-between">
          <Link href="/" className="font-bold text-2xl text-primary">
            DilSeLikha
          </Link>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center gap-8 font-medium text-foreground">
            <Link
              href="/"
              onClick={() => setSearchOpen(false)}
              className="hover:text-muted transition-all"
            >
              Home
            </Link>
            <Link
              onClick={() => setSearchOpen(false)}
              href="/about"
              className="hover:text-muted transition-all"
            >
              About
            </Link>
            <Link
              onClick={() => setSearchOpen(false)}
              href="/blog"
              className="hover:text-muted transition-all"
            >
              Blog
            </Link>
            <Link
              onClick={() => setSearchOpen(false)}
              href="/contact"
              className="hover:text-muted transition-all"
            >
              Contact
            </Link>

            <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
              <input
                onChange={handleInput}
                name="inputSearch"
                value={inputSearchData}
                className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
                type="text"
                placeholder="Search products"
              />
              <IoSearch />
            </div>

            <div className="flex items-center gap-4 lg:hidden">
              <button
                onClick={() => {
                  setSearchOpen(!searchOpen);
                  setInputSearchData("");
                }}
                className="text-xl"
              >
                <IoSearch />
              </button>
            </div>

            {searchOpen && (
              <div className="absolute top-[60px] left-0 w-full bg-background shadow-md p-3 lg:hidden">
                <input
                  onChange={handleInput}
                  name="inputSearch"
                  value={inputSearchData}
                  autoFocus
                  className="w-full py-2 px-3 border border-gray-300 rounded-full outline-none"
                  type="text"
                  placeholder="Search products"
                />
              </div>
            )}

            <div className="relative cursor-pointer">
              <FaHeart
                onClick={() => setSearchOpen(false)}
                className="text-primary text-xl"
              />
            </div>
            {userData ? (
              <button
                onClick={() => {
                  handleLogout();
                  setSearchOpen(false);
                }}
                className="cursor-pointer px-8 py-1.5 bg-primary hover:bg-secondary transition text-white rounded-full"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  route.push("/my-account");
                  setSearchOpen(false);
                }}
                className="cursor-pointer px-8 py-1.5 bg-primary hover:bg-secondary transition text-white rounded-full"
              >
                Login
              </button>
            )}

            {userData?.isAdmin && (
              <button
                onClick={() => {
                  route.push("/admin/add-blog");
                  setSearchOpen(false);
                }}
                className="cursor-pointer px-8 py-1.5 bg-primary hover:bg-secondary transition text-white rounded-full"
              >
                Admin
              </button>
            )}
          </div>

          <button
            onClick={() => {
              setOpen(!open);
              setSearchOpen(false);
            }}
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
              onClick={() => {
                setOpen(false);
                setSearchOpen(false);
              }}
              className="block hover:text-muted transition-all"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => {
                setOpen(false);
                setSearchOpen(false);
              }}
              className="block hover:text-muted transition-all"
            >
              About
            </Link>
            <Link
              href="/blog"
              onClick={() => {
                setOpen(false);
                setSearchOpen(false);
              }}
              className="block hover:text-muted transition-all"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              onClick={() => {
                setOpen(false);
                setSearchOpen(false);
              }}
              className="block hover:text-muted transition-all"
            >
              Contact
            </Link>

            {userData ? (
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                  setSearchOpen(false);
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
                  setSearchOpen(false);
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
