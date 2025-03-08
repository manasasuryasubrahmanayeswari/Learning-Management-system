import Image from "next/image";
import React, { FC } from "react";
import defaultAvatar from "../../../public/assets/avatar.png";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Link from "next/link";
import { useTheme } from "next-themes";

type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logOutHandler: any;
};

const SideBarProfile: FC<Props> = ({
  user,
  active,
  setActive,
  avatar,
  logOutHandler,
}) => {
  const { theme } = useTheme();
  return (
    <div className="bg-[#FFFFE0] dark:bg-[#333300] h-full rounded-[5px] shadow-sm">
      <div className="w-full">
        <div
          className={`w-full flex items-center px-3 py-4 cursor-pointer ${
            active === 1 ? "bg-[#FFD700]" : "bg-transparent"
          }`}
          onClick={() => setActive(1)}
        >
          <Image
            src={
              user.avatar && user.avatar.url
                ? user.avatar.url
                : avatar
                ? avatar
                : defaultAvatar.src
            }
            alt="User Avatar"
            width={25}
            height={25}
            className="rounded-full cursor-pointer"
          />
          <span className="ml-4 text-black dark:text-white">
            {user.name || "User"}
          </span>
        </div>
        <div
          className={`w-full flex items-center px-3 py-4 cursor-pointer ${
            active === 2 ? "bg-[#FFD700]" : "bg-transparent"
          }`}
          onClick={() => setActive(2)}
        >
          <RiLockPasswordLine size={20}  color={theme === "dark" ? "#fff" : "#333"} />
          <span className="ml-4 text-black dark:text-white">
            Change Password
          </span>
        </div>
        <div
          className={`w-full flex items-center px-3 py-4 cursor-pointer ${
            active === 3 ? "bg-[#FFD700]" : "bg-transparent"
          }`}
          onClick={() => setActive(3)}
        >
          <SiCoursera size={20}  color={theme === "dark" ? "#fff" : "#333"} />
          <span className="ml-4 text-black dark:text-white">
            Enrolled Courses
          </span>
        </div>
        {user.role === "admin" && (
          <Link
            className={`w-full flex items-center px-3 py-4 cursor-pointer ${
              active === 6 ? "bg-[#FFD700]" : "bg-transparent"
            }`}
            href={"/admin"}
          >
            <MdOutlineAdminPanelSettings size={20}  color={theme === "dark" ? "#fff" : "#333"} />
            <span className="ml-4 text-black dark:text-white">
              Admin Dashboard
            </span>
          </Link>
        )}
        <div
          className={`w-full flex items-center px-3 py-4 cursor-pointer ${
            active === 4 ? "bg-[#FFD700]" : "bg-transparent"
          }`}
          onClick={() => logOutHandler()}
        >
          <AiOutlineLogout size={20} color={theme === "dark" ? "#fff" : "#333"} />
          <span className="ml-4 text-black dark:text-white">Log Out</span>
        </div>  
      </div>
    </div>
  );
};

export default SideBarProfile;
