"use client";

import Image from "next/image";
import TimeDate from "./TimeDate";

/* const clickMobileMenu = () => {
  const mobileMenu = document.getElementById("mobile-menu");
  mobileMenu?.classList.toggle("hidden");
}; */

const Navbar = () => {
  return (
    <nav className="grid grid-flow-col grid-cols-12 w-full h-24 bg-gray-100 items-center border-b border-gray-200 px-4">
      <a href="/" className="col-span-3">
        <Image
          src="/01-Logotype_Positivo_RGB.png"
          width={200}
          height={50}
          alt="Logo of the Vechain Blockchain"
        />
      </a>
      <div className="col-span-6 text-center">
        {/*         <div onClick={clickMobileMenu} className="relative">
          MENU
          <div
            id="mobile-menu"
            className="absolute w-full p-6 rounded-lg bg-white border border-gray-200 shadow-lg hidden"
          >
            <ul className="flex flex-col text-left gap-6">
              <li>
                <a href="/">Link 1</a>
              </li>
              <li>
                <a href="/">Link 2</a>
              </li>
              <li>
                <a href="/">Link 3</a>
              </li>
              <li>
                <a href="/">Link 4</a>
              </li>
            </ul>
          </div>
        </div> */}
      </div>
{/*       <TimeDate /> */}
    </nav>
  );
};

export default Navbar;
