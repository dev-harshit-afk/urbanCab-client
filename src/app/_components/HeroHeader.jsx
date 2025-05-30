import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeroHeader = () => {
  return (
    <div>
      <header className="bg-black  border-b-1 border-gray-200">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
          <Image
            src={"/uber-white-logo.webp"}
            alt="uber"
            height={60}
            width={60}
          />

          <div className="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <a
                    className="text-white transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    About{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-white transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    Careers{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-white transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    History{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-white transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    Services{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-white transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    Projects{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-white transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    Blog{" "}
                  </a>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                <Link
                  className="block rounded-md bg-white px-3 py-2 text-sm font-medium text-black transition "
                  href="/user/login"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default HeroHeader;
