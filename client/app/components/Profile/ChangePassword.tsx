import { useUpdatePasswordMutation } from "@/redux/features/user/userApi";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {};

const ChangePassword: FC<Props> = (props) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();
  const passwordChangeHandler = async (e: any) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords doesnt match!");
    } else {
      await updatePassword({ oldPassword, newPassword });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password Changed Successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  return (
    <div className="w-full max-w-md mx-auto px-4 py-8 border border-gray-200 rounded-lg bg-yellow-200 dark:bg-[#666600]">
      <h1 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-4">
        Change Password
      </h1>
      <form onSubmit={passwordChangeHandler} className="space-y-4">
        <div>
          <label
            htmlFor="oldPassword"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Old Password
          </label>
          <input
            type="password"
            id="oldPassword"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white"
            required
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          className="w-full py-2 px-4 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-200"
          type="submit"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
