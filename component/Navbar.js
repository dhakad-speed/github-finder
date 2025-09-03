"use client";
import React, { useState } from "react";
import Link from "next/link";
import GitHubIcon from "@mui/icons-material/GitHub";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-[#191d24] relative z-50">
      <div className="flex py-4 sm:py-5 justify-between items-center mx-auto container px-4 sm:px-6 lg:px-0 relative">
        <div className="logo flex items-center gap-2 sm:gap-3 absolute left-1/2 -translate-x-1/2 sm:static sm:transform-none">
          <GitHubIcon
            className="inline pr-2 sm:pr-3"
            sx={{ fontSize: { xs: 28, sm: 34, md: 40 } }}
          />
          <Link
            href={"/about"}
            className="hidden sm:block text-base sm:text-lg font-bold"
          >
            Github Finder
          </Link>
        </div>

        <div className="hidden sm:flex gap-4 sm:gap-10 text-base sm:text-xl">
          <Link
            className="hover:bg-[hsl(222.86 17.073% 8.0392%)/20]"
            href={"/"}
          >
            Home
          </Link>
          <Link
            className="hover:bg-[hsl(222.86 17.073% 8.0392%)/20]"
            href={"/about"}
          >
            About
          </Link>
        </div>

        <button
          aria-label="Toggle navigation"
          className="sm:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-[hsl(222.86_17.073%_8.0392%)/20]"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? (
            <CloseIcon sx={{ fontSize: 28 }} />
          ) : (
            <MenuIcon sx={{ fontSize: 28 }} />
          )}
        </button>
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-[1px] sm:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="sm:hidden fixed top-[56px] left-0 right-0 border-t border-[#2a303c] bg-[#191d24]">
            <div className="container mx-auto px-4 py-3 flex flex-col gap-3 text-base">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="py-2 hover:bg-[hsl(222.86_17.073%_8.0392%)/20] rounded-md px-2"
              >
                Home
              </Link>
              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className="py-2 hover:bg-[hsl(222.86_17.073%_8.0392%)/20] rounded-md px-2"
              >
                About
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Navbar;
