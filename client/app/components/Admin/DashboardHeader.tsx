"use client";
import { ThemeSwitcher } from "@/app/utils/ThemeSwitcher";
import {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from "@/redux/features/notifications/notificatioApi";
import React, { FC, useEffect, useState, useCallback } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import socketIO from "socket.io-client";
import { format } from "timeago.js";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  open?: boolean;
  setOpen?: any;
};

const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
  const { data, refetch } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateNotificationStatus, { isSuccess }] =
    useUpdateNotificationStatusMutation();
  const [notifications, setNotifications] = useState<any>([]);
  const [audio, setAudio] = useState<any>(null);

  const playerNotificationSound = useCallback(() => {
    if (audio) {
      audio.play();
    }
  }, [audio]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const newAudio = new Audio(
        "https://asset.cloudinary.com/dlfgy3dfq/d26b95322ad0637545fe86bf54e8fd15"
      );
      setAudio(newAudio);
    }
  }, []);

  useEffect(() => {
    if (data) {
      setNotifications(
        data.notifications.filter((item: any) => item.status === "unread")
      );
    }
    if (isSuccess) {
      refetch();
    }
    if (audio) {
      audio.load();
    }
  }, [data, isSuccess, refetch, audio]);

  useEffect(() => {
    socket.on("newNotification", (data: any) => {
      refetch();
      playerNotificationSound();
    });

    return () => {
      socket.off("newNotification");
    };
  }, [refetch, playerNotificationSound]);

  const handleNotificationStatusChange = async (id: string) => {
    await updateNotificationStatus(id);
  };

  return (
    <div className="w-full flex items-center justify-end p-6 fixed top-5 right-0 z-50">
      <ThemeSwitcher />
      <div
        className="relative cursor-pointer m-2"
        onClick={() => setOpen(!open)}
      >
        <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-#666600 text-#ffffcc dark:fill-[#ffffcc] fill-[#666600]" />
        <span className="absolute -top-2 -right-2 bg-#ffffcc rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-black">
          {notifications && notifications.length}
        </span>
      </div>
      {open && (
        <div className="w-[350px] h-[50vh] dark:bg-[#ffffcc] bg-[#666600] shadow-xl absolute top-16 right-0 z-50 rounded">
          <h5 className="text-center text-[20px] font-Poppins text-black dark:text-black p-3 border-b dark:border-b-[#666600] border-b-[#ffcc00]">
            Notifications
          </h5>
          {notifications &&
            notifications.map((item: any, index: number) => (
              <div key={index} className="dark:bg-[#ffffcc] bg-[#666600] font-Poppins border-b dark:border-b-[#666600] border-b-[#ffcc00]">
                <div className="w-full flex items-center justify-between p-2">
                  <p className="text-black dark:text-black">
                    {item.title}
                  </p>
                  <p className="text-black dark:text-black cursor-pointer"
                    onClick={() => handleNotificationStatusChange(item._id)}>
                    Mark as read
                  </p>
                </div>
                <p className="px-2 text-black dark:text-black">
                  {item.message}
                </p>
                <p className="p-2 text-black dark:text-black text-[14px]">
                  {format(item.createdAt)}
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
