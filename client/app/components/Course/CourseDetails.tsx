import React, { FC, useEffect, useState } from "react";
import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5";
import Ratings from "@/app/utils/Ratings";
import { format } from "timeago.js";
import CoursePlayer from "@/app/utils/CoursePlayer";
import CourseContentList from "../Course/CourseContentList";
import Link from "next/link";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { loadRazorpay } from "../../utils/loadRazorpay"; // Ensure this function is implemented correctly
import { useGetRazorpayKeyQuery, useCreateRazorpayOrderMutation, useVerifyPaymentMutation } from '../../../redux/orders/ordersApi';
import toast from "react-hot-toast";


type Props = {
  data: any;
  razorpayKey?: string;
  setRoute?: any;
  setOpen?: any;
};

const CourseDetails: FC<Props> = ({ data, setRoute, setOpen: openAuthModel }) => {
  const { data: userData, refetch: refetchUser } = useLoadUserQuery(undefined, {refetchOnMountOrArgChange: true});
  const [createRazorpayOrder] = useCreateRazorpayOrderMutation();
  const [verifyPayment] = useVerifyPaymentMutation();
  const { data: razorpayKeyData } = useGetRazorpayKeyQuery({});
  const [user, setUser] = useState<any>();
  const [open,setOpen] = useState(false);
  //const [isPurchased, setIsPurchased] = useState(false);

  useEffect(() => {
    if (userData && userData.user) {
      setUser(userData.user);
      //setIsPurchased(userData.user.courses.some((course: any) => course._id === data._id));
    }
  }, [userData, data._id]);

  /*useEffect(() => {
    if (isSuccess) {
      refetchUser(); // Refetch user data after successful order creation
    }
  }, [isSuccess, refetchUser]);*/

  const discountPercentage =
    ((data?.estimatedPrice - data.price) / data?.estimatedPrice) * 100;
  const discountPercentagePrice = discountPercentage.toFixed(0);
  const isPurchased =
    user && user?.courses?.find((item: any) => item._id === data._id);

    // CourseDetails.tsx (client-side)

const handleOrder = async () => {
  if (user) {
    const amount = Math.round(data.price * 1);

    try {
      const razorpayOrderData = await createRazorpayOrder(amount).unwrap();
      const options = {
        key: razorpayKeyData?.razorpayApiKey,
        amount: razorpayOrderData.order.amount,
        currency: "INR",
        name: "Your Company Name",
        description: "Course Purchase",
        order_id: razorpayOrderData.order.id,
        handler: async function (response: any) {
          try {
            const paymentData = {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              courseId: data._id,
            };

            console.log("Sending payment data to server:", paymentData);
            const result = await verifyPayment(paymentData).unwrap();
            console.log("Server verification result:", result);

            if (result.success) {
              await refetchUser();
              //setIsPurchased(true);
              toast.success(result.message || "Payment successful! Course purchased.");
            } else {
              throw new Error(result.message || "Payment verification failed");
            }
          } catch (error: any) {
            console.error("Payment verification error:", error);
            if (error.data && error.data.message) {
              toast.error(error.data.message);
            } else {
              toast.error(error.message || "There was an issue verifying your payment. Please contact support if the course is not added to your account.");
            }
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js");
      if (rzp) {
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      }
    } catch (err) {
      console.error('Error creating Razorpay order:', err);
      toast.error("Failed to create order. Please try again.");
    }
  } else {
    setRoute("Login");
    openAuthModel(true);
    
  }
};
    
  return (
    <div>
      <div className="bg-gradient-to-r from-gradientLight-start via-gradientLight-medium to-gradientLight-end dark:from-gradientDark-start dark:via-gradientDark-medium dark:to-gradientDark-end ">
        <div className="w-[90%] m-auto py-5 text-light-text dark:text-dark-text ">
          <div className="w-full flex flex-col-reverse md:flex-row">
            <div className="w-full md:w-[65%] md:pr-5">
              <h1 className="text-2xl font-Poppins font-semibold">{data.name}</h1>
              <div className="flex items-center justify-between pt-3">
                <div className="flex items-center">
                  <Ratings rating={data.ratings} />
                  <h5 className="ml-2">{data.reviews?.length} Reviews</h5>
                </div>
                <h5>{data.purchased} Students</h5>
              </div>
              <br />
              <h1 className="text-2xl font-Poppins font-semibold">
                What you will learn from this course?
              </h1>
              <div>
                {data.benefits?.map((item: any, index: number) => (
                  <div className="flex items-center py-2" key={index}>
                    <IoCheckmarkDoneOutline
                      size={20}
                      className="text-light-text dark:text-dark-text mr-2"
                    />
                    <p>{item.title}</p>
                  </div>
                ))}
              </div>
              <br />
              <h1 className="text-2xl font-Poppins font-semibold">
                What are the prerequisites for starting this course?
              </h1>
              <div>
                {data.prerequisites?.map((item: any, index: number) => (
                  <div className="flex items-center py-2" key={index}>
                    <IoCheckmarkDoneOutline
                      size={20}
                      className="text-light-text dark:text-dark-text mr-2"
                    />
                    <p>{item.title}</p>
                  </div>
                ))}
              </div>
              <br />
              <h1 className="text-2xl font-Poppins font-semibold">
                Course Overview
              </h1>
              <CourseContentList data={data?.courseData} isDemo={true} />
              <br />
              <h1 className="text-2xl font-Poppins font-semibold">
                Course Details
              </h1>
              <p className="text-lg mt-5 whitespace-pre-line w-full overflow-hidden">
                {data.description}
              </p>
              <br />
              <div className="w-full">
                <div className="flex items-center">
                  <Ratings rating={data?.ratings} />
                  <h5 className="ml-2 text-2xl font-Poppins">
                    {data?.ratings.toFixed(2)} Course Rating •{" "}
                    {data?.reviews?.length} Reviews
                  </h5>
                </div>
              </div>
              <br />
              {data?.reviews &&
                [...data.reviews].reverse().map((item: any, index: number) => (
                  <div className="w-full pb-4" key={index}>
                    <div className="flex items-center">
                      <div className="w-[50px] h-[50px] bg-light-accent-grey dark:bg-dark-accent-grey rounded-full flex items-center justify-center cursor-pointer">
                        <h1 className="uppercase text-lg text-light-text dark:text-dark-text">
                          {item.user.name.slice(0, 2)}
                        </h1>
                      </div>
                      <div className="ml-2">
                        <div className="flex items-center">
                          <h5 className="text-lg pr-2">{item.user.name}</h5>
                          <Ratings rating={item.rating} />
                        </div>
                        <p>{item.comment}</p>
                        <small className="text-light-accent-darkGrey dark:text-dark-accent-lightGrey">
                          {format(new Date(item.createdAt), "MMM dd, yyyy")}
                        </small>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="w-full md:w-[35%] relative">
              <div className="sticky top-[100px]">
                <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
                <div className="flex items-center mt-5">
                  <h1 className="text-2xl">
                  {data.price === 0 ? "Free" : `₹${data.price.toLocaleString('en-IN')}`}
                  </h1>
                  {data.estimatedPrice && (
                    <>
                      <h5 className="ml-3 text-xl line-through opacity-80">
                        ${data.estimatedPrice}
                      </h5>
                      <h4 className="ml-5 text-xl">
                        {discountPercentagePrice}% off
                      </h4>
                    </>
                  )}
                </div>
                <div className="flex items-center mt-5">
                  {isPurchased ? (
                    <Link href={`/course-access/${data._id}`} passHref>
                      <div className="dark:bg-light-primary bg-dark-background text-light-background dark:text-dark-background py-2 px-4 rounded-[30px] w-44 text-center font-Poppins cursor-pointer">
                        Enter to Course
                      </div>
                    </Link>
                  ) : (
                    <div
                      className="dark:bg-light-primary bg-dark-background text-light-background dark:text-dark-background py-2 px-4 rounded-[30px] w-44 text-center font-Poppins cursor-pointer"
                      onClick={handleOrder}
                    >
                      Buy Now ₹{data.price}
                    </div>
                  )}
                </div>
                <br />
                <div className="space-y-1">
                  <p>• Source code included</p>
                  <p>• Full lifetime access</p>
                  <p>• Certificate of completion</p>
                  <p>• Premium Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <>
        {open && (
          <div className="w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center">
            <div className="w-[90%] max-w-[600px] min-h-[300px] bg-light-background dark:bg-dark-background rounded-xl shadow p-5">
              <div className="w-full flex justify-end">
                <IoCloseOutline
                  size={40}
                  className="text-black dark:text-white cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="w-full">
                {/* Razorpay checkout UI is handled in `handleOrder` */}
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default CourseDetails;
