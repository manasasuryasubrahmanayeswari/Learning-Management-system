import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { useRegisterMutation } from "@/redux/features/auth/authApi";

type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name!"),
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email!"),
  password: Yup.string()
    .required("Please enter your password")
    .min(6, "Password must be at least 6 characters"),
});

const SignUp: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);
  const [register, { isError, data, error, isSuccess }] = useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Account created successfully";
      toast.success(message);
      setRoute("Verification");
    }
    if (isError) {
      let errorMessage: string = "An error occurred";
      console.log("Error:", error);

      if (error && "data" in error) {
        const errorData = error as { data?: { message?: string } };
        errorMessage = errorData.data?.message || errorMessage;
      } else if (error && "message" in error) {
        const errorObj = error as { message?: string };
        errorMessage = errorObj.message || errorMessage;
      }

      toast.error(errorMessage);
    }
  }, [isSuccess, isError, data, error, setRoute]);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting }) => {
      await register(values);
      setSubmitting(false);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit, isSubmitting } =
    formik;

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent dark:bg-transparent">
      <div className="w-full max-w-md p-8 space-y-6 bg-light-background dark:bg-dark-background rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-light-text dark:text-dark-text">
          Join with StarFetch
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium text-light-text dark:text-dark-text"
              htmlFor="name"
            >
              Enter your Name
            </label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              id="name"
              placeholder="John Doe"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary ${
                errors.name && touched.name
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-700"
              } bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text`}
            />
            {errors.name && touched.name && (
              <span className="text-red-500 pt-2 block">{errors.name}</span>
            )}
          </div>
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
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
          <div className="text-center pt-4 text-light-text dark:text-dark-text">
            Or join with
          </div>
          <div className="flex items-center justify-center space-x-4">
            <FcGoogle size={30} className="cursor-pointer" />
            <AiFillGithub
              size={30}
              className="cursor-pointer text-light-text dark:text-dark-text"
            />
          </div>
          <div className="text-center pt-4 text-light-text dark:text-dark-text">
            Already have an account?
            <span
              className="text-dark-primary hover:text-dark-secondary dark:text-dark-primary dark:hover:text-dark-secondary pl-1 cursor-pointer"
              onClick={() => setRoute("Login")}
            >
              Sign in
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
