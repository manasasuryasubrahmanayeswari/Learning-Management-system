import React from "react";
import Link from "next/link";

export const navItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "About Us",
    url: "/about",
  },
  {
    name: "Store",
    url: "/store",
  },
  {
    name: "Contact Us",
    url: "/contact-us",
  },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <nav>
      {!isMobile ? (
        <div className="hidden md:flex space-x-6">
          {navItemsData.map((item, index) => (
            <Link href={item.url} key={index} passHref>
              <span
                className={`${
                  activeItem === index
                    ? "text-dark-primary dark:text-dark-primary border-b-2 border-yellow-500 dark:border-yellow-400"
                    : "text-light-text dark:text-dark-text hover:text-dark-primary dark:hover:text-dark-primary"
                } text-[18px] font-Poppins font-normal cursor-pointer py-2 transition duration-300`}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col space-y-4 pt-4">
          {navItemsData.map((item, index) => (
            <Link href={item.url} key={index} passHref>
              <span
                className={`${
                  activeItem === index
                    ? "text-dark-primary dark:text-dark-primary border-b-2 border-yellow-500 dark:border-yellow-400"
                    : "text-light-text dark:text-dark-text hover:text-dark-primary dark:hover:text-dark-primary"
                } text-[18px] font-Poppins font-normal cursor-pointer py-2 transition duration-300`}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavItems;
