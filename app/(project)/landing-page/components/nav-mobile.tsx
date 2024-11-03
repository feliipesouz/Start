"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function NavMobile() {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <div className="block md:hidden">
      <button onClick={handleOpen}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex">
          <div
            className="w-[70%] bg-black bg-opacity-50"
            onClick={handleClose}
          />
          <div className="relative w-full bg-[#8251FF] bg-opacity-95">
            <nav>
              <ul className="flex flex-col items-center gap-6 p-4 mt-12">
                <div className="absolute top-2 right-2 flex justify-end">
                  <button onClick={handleClose}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <li onClick={handleClose}>
                  <a href="#vantagens">Vantagens</a>
                </li>
                <li onClick={handleClose}>
                  <a href="#recursos">Recursos</a>
                </li>
                <li onClick={handleClose}>
                  <a href="#faq">FAQ</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
