import Link from "next/link";
import React from "react";

function AdminSideBar() {
  return (
    <>
      <div className="border-r-2 border-primary flex flex-col gap-10 items-center justify-center text-center capitalize font-semibold h-full text-foreground ">
        <Link
          href="/"
          className="border-2 border-primary rounded-md w-[80%] py-2"
        >
          Add blog
        </Link>
        <Link
          href="/"
          className="border-2 border-primary rounded-md w-[80%] py-2"
        >
          blog list
        </Link>
        <Link
          href="/"
          className="border-2 border-primary rounded-md w-[80%] py-2"
        >
          Comments
        </Link>
      </div>
    </>
  );
}

export default AdminSideBar;
