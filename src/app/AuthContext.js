"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";

let AppContext = createContext();

export let ProvideContext = ({ children }) => {
  let route = useRouter();
  let pathName = usePathname();
  let [userData, setUserData] = useState(null);
  let [blogData, setBlogData] = useState([]);
  let [inputSearchData, setInputSearchData] = useState("");

  let fetchUserData = async () => {
    try {
      let res = await axios.get("/api/user/get");
      if (res.data.success) {
        setUserData(res.data.msg);
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err.message);
    }
  };

  let fetchBlogData = async () => {
    try {
      let res = await axios.get("/api/blog/get");
      if (res.data.success) {
        setBlogData(res.data.msg);
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchUserData();
    fetchBlogData();
  }, []);
  return (
    <AppContext.Provider
      value={{
        toast,
        axios,
        route,
        pathName,
        userData,
        setUserData,
        fetchUserData,
        fetchBlogData,
        blogData,
        inputSearchData,
        setInputSearchData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export let UseAppContext = () => {
  return useContext(AppContext);
};
