"use client"

import { MagnifyingGlassIcon, MapIcon, MoonIcon, Squares2X2Icon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <div className="border-b-2 border-gray-200 px-2 py-1">
      <nav className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {isOpen ? (
            <Image src="/assets/freeRoomsLogo.png" alt="logo" width={50} height={50} onClick={() => setIsOpen(!isOpen)} />
          ) : (
            <Image src="/assets/freeroomsDoorClosed.png" alt="logo" width={50} height={50} onClick={() => setIsOpen(!isOpen)} />
          )}
          <h1 className="text-3xl font-extrabold text-primary xs:hidden">Freerooms</h1>
        </div>

        <ul className="flex gap-2 items-center mr-2">
          <li className="border border-primary rounded-lg p-2"><MagnifyingGlassIcon width={23} height={23} className="text-primary" /></li>
          <li className="border bg-primary rounded-lg p-2"><Squares2X2Icon width={23} height={23} className="text-white" /></li>
          <li className="border border-primary rounded-lg p-2"><MapIcon width={23} height={23} className="text-primary" /></li>
          <li className="border border-primary rounded-lg p-2"><MoonIcon width={23} height={23} className="text-primary" /></li>
        </ul>
      </nav>
    </div>
  )
};