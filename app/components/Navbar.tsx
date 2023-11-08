"use client";

import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="flex w-full h-fit bg-gray-100 items-center shadow-lg px-4">
      <div className="flex flex-col">
        <a href="/" className="">
          <h1 className="font-semibold font-mono text-4xl py-4">Blockcheck</h1>
        </a>
        <p className="font-mono">
          powered by{" "}
          <a
            className="font-bold"
            href="https://www.vechain.org/"
            target="_blank"
          >
            Vechain
          </a>
        </p>
      </div>
    </nav>
  );
};

export default Navbar;
