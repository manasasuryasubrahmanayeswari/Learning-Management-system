import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signIn } from "next-auth/react";
import { useLoginMutation } from "@/redux/features/auth/authApi";

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email!"),
  password: Yup.string()
    .required("Please enter your password")
    .min(6, "Password must be at least 6 characters"),
});

const Login: FC<Props> = ({ setRoute, setOpen }) => {
  const [show, setShow] = useState(false);
  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      try {
        await login({ email, password }).unwrap();
      } catch (err) {
        console.log(err);
      }
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login Successfully!");
      setOpen(false);
    }
    if (isError && error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, isError, error, setOpen]);

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent dark:bg-transparent">
      <ToastContainer />
      <div className="w-full max-w-md p-8 space-y-6 bg-light-background dark:bg-dark-background rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-light-text dark:text-dark-text">
          Login with StarFetch
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium text-light-text dark:text-dark-text"
              htmlFor="email"
            >
              Enter your Email
            </label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              id="email"
              placeholder="loginmail@gmail.com"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary ${
                errors.email && touched.email
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-700"
              } bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text`}
            />
            {errors.email && touched.email && (
              <span className="text-red-500 pt-2 block">{errors.email}</span>
            )}
          </div>
          <div className="relative">
            <label
              className="block text-sm font-medium text-light-text dark:text-dark-text"
              htmlFor="password"
            >
              Enter your Password
            </label>
            <input
              type={!show ? "password" : "text"}
              name="password"
              value={values.password}
              onChange={handleChange}
              id="password"
              placeholder="password!@%"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary ${
                errors.password && touched.password
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-700"
              } bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text`}
            />
            {!show ? (
              <AiOutlineEyeInvisible
                className="absolute bottom-3 right-2 z-10 cursor-pointer text-gray-500 dark:text-gray-300"
                size={20}
                onClick={() => setShow(true)}
              />
            ) : (
              <AiOutlineEye
                className="absolute bottom-3 right-2 z-10 cursor-pointer text-gray-500 dark:text-gray-300"
                size={20}
                onClick={() => setShow(false)}
              />
            )}
          </div>
          <div className="w-full mt-5">
            <button
              type="submit"
              className="w-full py-2 bg-light-primary dark:bg-dark-primary text-dark-background dark:text-dark-background rounded-lg font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>
          <div className="text-center pt-4 text-light-text dark:text-dark-text">
            Or join with
          </div>
          <div className="flex items-center justify-center space-x-4">
            <FcGoogle
              size={30}
              className="cursor-pointer"
              onClick={() => signIn("google")}
            />
            <AiFillGithub
              size={30}
              className="cursor-pointer text-light-text dark:text-dark-text"
              onClick={() => signIn("github")}
            />
          </div>
          <div className="text-center pt-4 text-light-text dark:text-dark-text">
            Don&apos;t have an account?
            <span
              className="text-dark-primary hover:text-dark-secondary dark:hover:text-dark-secondary dark:text-dark-primary pl-1 cursor-pointer"
              onClick={() => setRoute("Sign-up")}
            >
              Sign up
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
