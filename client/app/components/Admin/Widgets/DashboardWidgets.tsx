import React, { FC, useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { BiBorderLeft } from "react-icons/bi";
import { PiUsersFourLight } from "react-icons/pi";
import UserAnalytics from "../Analytics/UserAnalytics";
import OrdersAnalytics from "../Analytics/OrdersAnalytics";
import AllInvoices from "../Order/AllInvoices";
import {
  useGetOrdersAnalyticsQuery,
  useGetUsersAnalyticsQuery,
} from "@/redux/analytics/analyticsApi";

type CircularProgressWithLabelProps = {
  open?: boolean;
  value?: number;
};

const CircularProgressWithLabel: FC<CircularProgressWithLabelProps> = ({
  open = true,
  value = 0,
}) => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        zIndex: open ? 1 : -1,
      }}
    >
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        color={value && value > 99 ? "info" : "error"}
        thickness={4}
        sx={{ color: value && value > 99 ? "#fff" : "#000" }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    </Box>
  );
};

const DashboardWidgets: FC = () => {
  const [orderComparePercentage, setOrderComparePercentage] = useState<any>();
  const [userComparePercentage, setUserComparePercentage] = useState<any>();
  const { data, isLoading } = useGetUsersAnalyticsQuery({});
  const { data: orderData, isLoading: orderLoading } =
    useGetOrdersAnalyticsQuery({});
  useEffect(() => {
    if (isLoading && orderLoading) {
      return;
    } else {
      if (data && orderData) {
        const UsersLastTwoMonths = data.users.last12Months.slice(-2);
        const OrdersLastTwoMonths = orderData.orders.last12Months.slice(-2);

        if (
          UsersLastTwoMonths.length === 2 &&
          OrdersLastTwoMonths.length === 2
        ) {
          const usersCurrentMonth = UsersLastTwoMonths[1].count;
          const usersPreviousMonth = UsersLastTwoMonths[0].count;
          const ordersCurrentMonth = OrdersLastTwoMonths[1].count;
          const ordersPreviousMonth = OrdersLastTwoMonths[0].count;

          const usersPercentChange = usersPreviousMonth !==0 ?
            ((usersCurrentMonth - usersPreviousMonth) / usersPreviousMonth) *
            100:100;
          const ordersPercentChange = ordersPreviousMonth !==0 ?
            ((ordersCurrentMonth - ordersPreviousMonth) / ordersPreviousMonth) *
            100 : 100;

          setUserComparePercentage({
            currentMonth: usersCurrentMonth,
            previousMonth: usersPreviousMonth,
            percentChange: usersPercentChange,
          });
          setOrderComparePercentage({
            currentMonth: ordersCurrentMonth,
            previousMonth: ordersPreviousMonth,
            percentChange: ordersPercentChange,
          });
        }
      }
    }
  }, [isLoading, orderLoading, data, orderData]);

  return (
    <div className="mt-8 min-h-screen px-4 sm:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-5">
        <div className="col-span-1 sm:col-span-2 p-4">
          <UserAnalytics isDashboard={true} />
        </div>
        <div className="col-span-1 space-y-4">
          <div className="w-full bg-yellow-200 rounded-sm shadow p-4 mt-8 sm:mt-20">
            <div className="flex items-center justify-between">
              <div>
                <BiBorderLeft className="text-yellow-400 text-4xl dark:text-yellow-800" />
                <h5 className="pt-2 font-Poppins text-black text-lg dark:text-yellow-800">
                  {orderComparePercentage?.currentMonth}
                </h5>
                <h5 className="py-2 font-Poppins text-black text-lg dark:text-yellow-800 font-400">
                  Sales Obtained
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel value={
                    orderComparePercentage?.percentChange > 0 ? 100:0
                } open={true} />
                <h5 className="text-center pt-2">
                  {orderComparePercentage?.percentChange > 0
                    ? "+" + orderComparePercentage?.percentChange.toFixed(2)
                    : "-" + orderComparePercentage?.percentChange.toFixed(2)}
                  %
                </h5>
              </div>
            </div>
          </div>
          <div className="w-full bg-yellow-200 rounded-sm shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <PiUsersFourLight className="text-4xl dark:text-yellow-800" />
                <h5 className="pt-2 font-Poppins text-black text-lg dark:text-yellow-800">
                  {userComparePercentage?.currentMonth}
                </h5>
                <h5 className="py-2 font-Poppins text-black text-lg dark:text-yellow-800 font-400">
                  New Users
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel value={
                    userComparePercentage?.percentChange >0 ? 100 :0
                } open={true} />
                <h5 className="text-center pt-2">
                  {userComparePercentage?.percentChange > 0
                    ? "+" + userComparePercentage?.percentChange.toFixed(2)
                    : "-" + userComparePercentage?.percentChange.toFixed(2)}
                  %
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[65%,35%] mt-5 sm:mt-[-20px] gap-8">
        <div className="dark:bg-[#111c43] w-full mt-5 sm:mt-[30px] h-[40vh] shadow-sm m-auto p-4">
          <OrdersAnalytics isDashboard={true} />
        </div>
        <div className="p-5">
          <h5 className="dark:text-white text-black text-[20px] font-[400] font-Poppins pb-3">
            Recent Transactions
          </h5>
          <AllInvoices isDashboard={true} />
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;
