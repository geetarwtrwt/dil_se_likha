"use client";
import NavBar from "@/app/component/NavBar";
import Footer from "@/app/component/Footer";
import { UseAppContext } from "@/app/AuthContext";
export default function UserLayout({ children }) {
  let { pathName } = UseAppContext();
  return (
    <>
      {!pathName.startsWith("/admin") && <NavBar />}
      {children}
      <Footer />
    </>
  );
}
