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
  let [contactData, setContactData] = useState([]);
  let [inputSearchData, setInputSearchData] = useState("");
  let [loading, setLoading] = useState(false);
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
      setLoading(true);
      let res = await axios.get("/api/blog/get");
      if (res.data.success) {
        setBlogData(res.data.msg);
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  let fetchContactData = async () => {
    try {
      let res = await axios.get("/api/contact/get");
      if (res.data.success) {
        setContactData(res.data.data);
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err.message);
    }
  };
  let [blogInputData, setBlogInputData] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
  });

  let [blogImage, setBlogImage] = useState(null);
  let [blogImagePreview, setBlogImagePreview] = useState(null);
  let handleBlogImage = (e) => {
    let file = e.target.files[0];
    if (!file) return;

    let exits = file.name.split(".").pop().toLowerCase();
    if (!["jpg", "jpeg", "png", "webp"].includes(exits)) {
      toast.error("Invalid file type");
      return;
    }

    setBlogImage(file);
    setBlogImagePreview(URL.createObjectURL(file));
  };
  let handleBlogChange = (e) => {
    let { name, value } = e.target;
    setBlogInputData({ ...blogInputData, [name]: value });
  };

  useEffect(() => {
    fetchUserData();
    fetchBlogData();
    fetchContactData();
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
        loading,
        inputSearchData,
        setInputSearchData,

        blogInputData,
        setBlogInputData,
        blogImage,
        setBlogImage,
        blogImagePreview,
        setBlogImagePreview,
        handleBlogImage,
        handleBlogChange,

        contactData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export let UseAppContext = () => {
  return useContext(AppContext);
};
