import React, { FC, useState, useEffect } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { signOut, useSession } from "next-auth/react";
import { useLogOutMutation, useSocialAuthMutation } from "../../redux/features/auth/authApi";
import toast from "react-hot-toast";
import NavItems from "../utils/NavItems";
import CustomModal from "../utils/CustomModal";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import Verification from "../components/Auth/Verification";
import avatar from "../../public/assets/avatar.png";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ open, setOpen, activeItem, route, setRoute }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const { data } = useSession();
  const [socialAuthMutation, { isSuccess }] = useSocialAuthMutation();
  const [logOut] = useLogOutMutation();

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!user && data) {
      const avatarUrl = data.user?.image || "";
      const public_id = avatarUrl.split("/").pop()?.split(".")[0] || "";
      socialAuthMutation({
        email: data.user?.email || "",
        name: data.user?.name || "",
        avatar: {
          public_id,
          url: avatarUrl,
        },
      });
    }
  }, [data, user, socialAuthMutation]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login Successful");
    }
  }, [isSuccess]);

  const logOutHandler = async () => {
    await signOut();
    await logOut().unwrap();
    toast.success("Logout Successful");
    window.location.href = "/";
  };

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  };

  return (
    <header className={`w-full relative ${active ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-dark-primary dark:to-dark-secondary fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-dark-text shadow-xl transition duration-500" : "w-full border-b dark:border-dark-text h-[80px] z-[80] dark:shadow"}`}>
      <div className="container mx-auto flex items-center justify-between h-full px-4 bg-light-background dark:bg-dark-background">
        <Link href="/" className="text-[25px] font-josefin font-medium text-light-text dark:text-dark-text">
          StarFetch
        </Link>
        <div className="flex items-center space-x-6">
          <NavItems activeItem={activeItem} isMobile={false} />
          <ThemeSwitcher />
          {user ? (
            <Link href="/profile" className="md:hidden">
              <Image
                src={user.avatar && user.avatar.url ? user.avatar.url : avatar.src}
                alt="User Avatar"
                width={25}
                height={25}
                className="rounded-full cursor-pointer"
                style={{
                  border: activeItem === 5 ? "2px solid #e6e64d" : "none",
                }}
              />
            </Link>
          ) : (
            <button
              className="md:hidden px-4 py-2 bg-light-primary text-dark-background dark:bg-dark-primary dark:text-dark-background rounded cursor-pointer"
              onClick={() => setOpen(true)}
            >
              Login
            </button>
          )}
          <HiOutlineMenuAlt3
            size={25}
            className="cursor-pointer dark:text-dark-text text-light-text md:hidden"
            onClick={() => setOpenSidebar(true)}
          />
          {user ? (
            <Link href="/profile" className="hidden md:block">
              <Image
                src={user.avatar && user.avatar.url ? user.avatar.url : avatar.src}
                alt="User Avatar"
                width={25}
                height={25}
                className="rounded-full cursor-pointer"
                style={{
                  border: activeItem === 5 ? "2px solid #e6e64d" : "none",
                }}
              />
            </Link>
          ) : (
            <button
              className="hidden md:block px-4 py-2 bg-light-primary text-dark-background dark:bg-dark-primary dark:text-dark-background rounded cursor-pointer"
              onClick={() => setOpen(true)}
            >
              Login
            </button>
          )}
        </div>
      </div>
      {openSidebar && (
        <div
          className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 z-[90] transition duration-500"
          onClick={handleClose}
          id="screen"
        >
          <div className="fixed top-0 right-0 w-[70%] sm:w-[50%] h-full bg-light-background dark:bg-dark-background dark:bg-opacity-90 p-6 shadow-lg flex flex-col z-[100]">
            <div className="flex justify-between items-center mb-6">
              <Link
                href="/"
                className="text-[25px] font-josefin font-medium text-light-text dark:text-dark-text"
                onClick={() => setOpenSidebar(false)}
              >
                StarFetch
              </Link>
              <HiOutlineMenuAlt3
                size={25}
                className="cursor-pointer dark:text-dark-text text-light-text"
                onClick={() => setOpenSidebar(false)}
              />
            </div>
            <NavItems activeItem={activeItem} isMobile={true} />
            <div className="mt-6 flex flex-col space-y-4">
              {user ? (
                <Link href="/profile" className="flex items-center space-x-2">
                  <Image
                    src={user.avatar && user.avatar.url ? user.avatar.url : avatar.src}
                    alt="User Avatar"
                    width={25}
                    height={25}
                    className="rounded-full cursor-pointer"
                  />
                  <span className="text-light-primary dark:text-dark-primary">Profile</span>
                </Link>
              ) : (
                <button
                  className="px-4 py-2 bg-light-primary dark:bg-dark-primary text-dark-background dark:text-dark-background rounded cursor-pointer"
                  onClick={() => {
                    setOpen(true);
                    setOpenSidebar(false);
                  }}
                >
                  Login
                </button>
              )}
            </div>
            <div className="mt-auto pt-4">
              <p className="text-[16px] text-light-text dark:text-dark-text text-center">
                Copyright © 2023 StarFetch
              </p>
            </div>
          </div>
        </div>
      )}
      {open && (
        <CustomModal
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={
            route === "Sign-up"
              ? SignUp
              : route === "Login"
              ? Login
              : Verification
          }
        />
      )}
    </header>
  );
};

export default Header;