import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

function Footer() {
  return (
    <>
      <footer className="">
        <div className="containerBox flex flex-col gap-4 items-center justify-around w-full py-5  text-muted border-t border-gray-300">
          <div className="flex items-center justify-between gap-4  md:gap-8 font-medium flex-wrap">
            <Link href="/" className="hover:text-foreground transition-all">
              Home
            </Link>
            <Link
              href="/about"
              className="hover:text-foreground transition-all"
            >
              About
            </Link>
            <Link href="/blog" className="hover:text-foreground transition-all">
              Blog
            </Link>
            <Link
              href="/contact"
              className="hover:text-foreground transition-all"
            >
              Contact
            </Link>
          </div>
          <div className="flex items-center gap-4 text-primary flex-wrap text-2xl">
            <a
              href="#"
              className="hover:-translate-y-0.5 transition-all duration-300"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="hover:-translate-y-0.5 transition-all duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="hover:-translate-y-0.5 transition-all duration-300"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="#"
              className="hover:-translate-y-0.5 transition-all duration-300"
            >
              <FaTwitter />
            </a>
          </div>
          <p className="text-center">
            Copyright © 2025. All rights reservered.
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
