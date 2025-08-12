"use client";
import NavBar from "./component/NavBar";
import Footer from "./component/Footer";
import { UseAppContext } from "./AuthContext";

export default function UserLayout({ children }) {
  let { pathName } = UseAppContext();
  return (
    <>
      {!pathName.startsWith("/admin") && <NavBar />}
      {children}
      {!pathName.startsWith("/admin") && <Footer />}
    </>
  );
}
