import React, { FC, useEffect, useRef, useState } from "react";
import { useActivationMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { useSelector } from "react-redux";

type Props = {
  setRoute: (route: string) => void;
};

type VerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

const Verification: FC<Props> = ({ setRoute }) => {
  const { token } = useSelector((state: any) => state.auth);
  const [activation, { isSuccess, error }] = useActivationMutation();
  const [invalidError, setInvalidError] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Account activated successfully");
      setRoute("Login");
    }
    if (error) {
      let errorMessage: string = "An error occurred";

      if (error && "data" in error) {
        const errorData = error as { data?: { message?: string } };
        errorMessage = errorData.data?.message || errorMessage;
      } else if (error && "message" in error) {
        const errorObj = error as { message?: string };
        errorMessage = errorObj.message || errorMessage;
      }

      toast.error(errorMessage);
    }
  }, [isSuccess, error, setRoute]);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    "0": "",
    "1": "",
    "2": "",
    "3": "",
  });

  const verificationHandler = async () => {
    const verificationNumber = Object.values(verifyNumber).join("");
    if (verificationNumber.length !== 4) {
      setInvalidError(true);
      return;
    }
    await activation({
      activation_token: token,
      activation_code: verificationNumber,
    });
  };

  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false);
    if (!isNaN(Number(value)) && value.length <= 1) {
      const newVerifyNumber = { ...verifyNumber, [index.toString()]: value };
      setVerifyNumber(newVerifyNumber);

      if (value === "" && index > 0) {
        inputRefs[index - 1].current?.focus();
      } else if (value.length === 1 && index < 3) {
        inputRefs[index + 1].current?.focus();
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === "Enter") {
      event.preventDefault();
      verificationHandler();
    }
  };

  const shakeClass = invalidError ? "shake" : ""; // Apply shake class conditionally

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent dark:bg-transparent">
      <div className="p-8 bg-white dark:bg-dark-background rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-light-text dark:text-dark-text">
          Verify your Account
        </h1>
        <div className="w-full flex items-center justify-center mt-2">
          <div className="w-20 h-20 bg-light-primary dark:bg-dark-primary rounded-full flex items-center justify-center">
            <VscWorkspaceTrusted
              size={40}
              className="text-dark-primary dark:text-light-primary"
            />
          </div>
        </div>
        <div className="m-auto flex items-center justify-around mt-5">
          {Object.keys(verifyNumber).map((key, index) => (
            <input
              key={key}
              ref={inputRefs[index]}
              type="number"
              className={`w-16 h-16 bg-transparent border-2 rounded-lg flex items-center text-light-text dark:text-dark-text justify-center text-2xl font-Poppins outline-none text-center ${
                shakeClass ? "border-red-500 " + shakeClass : "border-gray-300"
              }`}
              placeholder=""
              maxLength={1}
              value={verifyNumber[key as keyof VerifyNumber]}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>
        <div className="w-full flex justify-center">
          <button
            className="py-2 px-4 bg-light-primary dark:bg-dark-primary text-dark-background dark:text-dark-background rounded-lg font-semibold mt-4"
            onClick={verificationHandler}
          >
            Verify OTP
          </button>
        </div>
        <h5 className="text-center pt-4 text-light-text dark:text-dark-text">
          Go back to Sign In?{" "}
          <span
            className="text-dark-primary  dark:hover:text-dark-secondary hover:text-dark-secondary dark:text-dark-primary pt-1 cursor-pointer"
            onClick={() => setRoute("Login")}
          >
            Sign In
          </span>
        </h5>
      </div>
    </div>
  );
};

export default Verification;
