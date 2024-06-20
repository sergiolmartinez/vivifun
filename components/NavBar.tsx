"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import GirlIcon from "@/assets/icons/girl_icon.webp"; // This is the image that will be used in the navbar

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const links = [
    {
      id: 1,
      name: "Home",
      link: "/",
    },
    {
      id: 2,
      name: "Memory Game",
      link: "memory-game",
    },
    // {
    //   id: 3,
    //   name: "Contact",
    //   link: "contact",
    // },
  ];

  return (
    <div className="flex justify-between items-center flex-wrap w-full h-20 p-4 text-white bg-black fixed nav">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <a
          href="/"
          // target="_blank"
          // rel="noreferrer"
        >
          <Image
            className="rounded-full fill-current mr-2 bg-gray-200"
            src={GirlIcon}
            alt="Vivi Fun Logo"
            width={75}
            height={75}
          />
        </a>
        <a
          className="link-underline link-underline-black"
          href="/"
          // target="_blank"
          // rel="noreferrer"
        >
          <span className="font-semibold text-2xl tracking-tight">
            Vivi Fun
          </span>
        </a>
      </div>

      <ul className="hidden md:flex">
        {links.map(({ id, name, link }) => (
          <li
            key={id}
            className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline"
          >
            <Link href={link}>{name}</Link>
          </li>
        ))}
      </ul>

      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
          {links.map(({ id, name, link }) => (
            <li
              key={id}
              className="px-4 cursor-pointer capitalize py-6 text-4xl"
            >
              <Link onClick={() => setNav(!nav)} href={link}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Navbar;
