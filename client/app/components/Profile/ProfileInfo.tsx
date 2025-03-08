import React, { FC, useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { styles } from "../../../app/styles/style";
import { useEditProfileMutation, useUpdateAvatarMutation } from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import toast from "react-hot-toast";
import avatarIcon from "../../../public/assets/avatar.png"
import Image from 'next/image'; // Import Image component

type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState<string | null>(null);
  const [updateAvatar, { isLoading: avatarLoading, isSuccess: avatarSuccess, error: avatarError }] = useUpdateAvatarMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery(undefined, { skip: !loadUser });
  const [editProfile, { isSuccess: profileSuccess, error: profileError }] = useEditProfileMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const imageHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const base64Avatar = reader.result as string;
          await updateAvatar(base64Avatar).unwrap(); // Send the base64 string directly
          console.log("Avatar updated successfully");
        } catch (error) {
          console.error("Error updating avatar:", error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (avatarSuccess || profileSuccess) {
      setLoadUser(true);
      toast.success("Profile updated successfully");
    }
    if (avatarError || profileError) {
      console.error(avatarError || profileError);
    }
  }, [avatarSuccess, avatarError, profileSuccess, profileError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (name !== "") {
      try {
        await editProfile({
          name: name,
        });
        setIsSubmitting(false);
      } catch (error) {
        console.error("Error updating profile:", error);
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full pt-3 pb-3 md:pt-8 md:pb-8 border border-gray-200 rounded-lg bg-yellow-200 dark:bg-[#666600]">
      <label htmlFor="avatar" className="relative cursor-pointer">
        <Image
          src={user.avatar?.url || avatarIcon}
          alt="Avatar"
          width={120}
          height={120}
          className="rounded-full border-[3px] border-yellow-400 cursor-pointer"
        />
        <input
          type="file"
          name="avatar"
          id="avatar"
          className="hidden"
          onChange={imageHandler}
          accept="image/png, image/jpg, image/jpeg, image/webp"
        />
        <div className="absolute bottom-2 right-2">
          <AiOutlineCamera
            size={30}
            className="text-yellow-800 bg-yellow-200 rounded-full p-1 cursor-pointer"
          />
        </div>
      </label>
      {avatarLoading && <p>Updating avatar...</p>}
      {avatarError && <p className="text-red-500">Error updating avatar</p>}
      <form onSubmit={handleSubmit} className="w-full max-w-md mt-4">
        <div className="w-full">
          <label className="block pb-2 text-yellow-800 dark:text-yellow-200 font-semibold">
            Full Name
          </label>
          <input
            type="text"
            className={`${styles.input} w-full mb-4 rounded-md border-yellow-400 dark:border-yellow-800 dark:bg-yellow-600 dark:text-white`}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="w-full">
          <label className="block pb-2 text-yellow-800 dark:text-yellow-200 font-semibold">
            Email Address
          </label>
          <input
            type="text"
            readOnly
            className={`${styles.input} w-full mb-1 rounded-md border-yellow-400 dark:border-yellow-800 dark:bg-yellow-600 dark:text-white`}
            required
            value={user?.email || ""}
          />
        </div>
        <button
          className="w-full h-[40px] bg-yellow-400 text-white font-semibold rounded-md border border-yellow-400 hover:bg-yellow-600 transition duration-300 ease-in-out mt-4 cursor-pointer dark:bg-yellow-600 dark:text-white"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Updating...' : 'Update'}
        </button>
      </form>
    </div>
  );
};

export default ProfileInfo;
