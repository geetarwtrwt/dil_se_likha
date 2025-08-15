import Link from "next/link";
import React from "react";

function AdminSideBar({ setOpen }) {
  return (
    <>
      <div className="flex flex-col gap-10 items-center justify-center text-center capitalize font-semibold h-full text-foreground ">
        <Link
          onClick={() => setOpen(false)}
          href="/admin/add-blog"
          className="border-2 border-primary rounded-md w-[80%] py-2"
        >
          Add blog
        </Link>
        <Link
          onClick={() => setOpen(false)}
          href="/admin/blog-list"
          className="border-2 border-primary rounded-md w-[80%] py-2"
        >
          blog list
        </Link>
        <Link
          onClick={() => setOpen(false)}
          href="/admin/contact-list"
          className="border-2 border-primary rounded-md w-[80%] py-2"
        >
          Message
        </Link>
      </div>
    </>
  );
}

export default AdminSideBar;
