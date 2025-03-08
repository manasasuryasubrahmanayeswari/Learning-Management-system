import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import React, { FC, useEffect, useState, useCallback } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import Header from "../Header";
import Footer from "../Route/Footer";
import CourseDetails from "./CourseDetails";
import { useCreateRazorpayOrderMutation, useGetRazorpayKeyQuery } from "../../../redux/orders/ordersApi";
import { loadRazorpay } from "../../utils/loadRazorpay"; // Adjust the path accordingly

type Props = {
  id: string;
};

const CourseDetailsPage: FC<Props> = ({ id }) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetCourseDetailsQuery(id);
  const { data: config } = useGetRazorpayKeyQuery({});
  const [razorpayKey, setRazorpayKey] = useState<string | null>(null);
  const [createRazorpayOrder, { data: razorpayOrderData }] = useCreateRazorpayOrderMutation();

  useEffect(() => {
    if (config) {
      setRazorpayKey(config.key);
    }
  }, [config]);

  const createOrder = useCallback(async () => {
    if (data) {
      const amount = Math.round(data.course.price * 100);
      await createRazorpayOrder(amount);
    }
  }, [data, createRazorpayOrder]);

  useEffect(() => {
    if (data) {
      createOrder();
    }
  }, [data, createOrder]);

  useEffect(() => {
    if (razorpayOrderData) {
      const handlePayment = async () => {
        const razorpayLoaded = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js");
        if (razorpayLoaded && razorpayKey) {
          const { id, amount, currency } = razorpayOrderData;
          const options = {
            key: razorpayKey,
            amount: amount,
            currency: currency,
            name: "Your Company Name",
            description: "Test Transaction",
            order_id: id,
            handler: function (response: any) {
              if (response.razorpay_payment_id) {
                // Handle payment success
                console.log("Payment successful", response);
              }
            },
            prefill: {
              name: "Your Customer Name",
              email: "customer@example.com",
              contact: "1234567890",
            },
            notes: {
              address: "Your Company Address",
            },
            theme: {
              color: "#3399cc",
            },
          };
          const rzp = new window.Razorpay(options);
          rzp.open();
        }
      };
      handlePayment();
    }
  }, [razorpayOrderData, razorpayKey]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading title={data?.course.name + " -StarFetch"} description="hello" keywords={data?.course?.tags} />
          <Header open={open} setOpen={setOpen} activeItem={1} setRoute={setRoute} route={route} />
          <CourseDetails data={data.course} setOpen={setOpen} setRoute={setRoute} />
          <Footer />
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;
