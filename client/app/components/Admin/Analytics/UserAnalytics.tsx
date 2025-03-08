import React, { FC } from "react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";
import Loader from "../../Loader/Loader";
import { useGetUsersAnalyticsQuery } from "@/redux/analytics/analyticsApi";
import { styles } from "@/app/styles/style";

type Props = {
  isDashboard?: boolean;
};

// Custom Tick component
const CustomTick = (props: any) => {
  const { x, y, payload } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-45)"
      >
        {payload.value}
      </text>
    </g>
  );
};

const UserAnalytics: FC<Props> = ({ isDashboard }) => {
  const { data, isLoading } = useGetUsersAnalyticsQuery({});
  /*const analyticsData = [
    { name: "June 2023", uv: 240 },
    { name: "July 2023", uv: 3000 },
    { name: "August 2023", uv: 354 },
    { name: "September 2023", uv: 845 },
    { name: "October 2023", uv: 1756 },
    { name: "November 2023", uv: 6000 },
    { name: "December 2023", uv: 411 },
  ];*/

  // Uncomment and use the below code if you are fetching real data
   const analyticsData: any[] = [];
   data &&
     data.users.last12Months.forEach((item: any) => {
       analyticsData.push({ name: item.month, uv: item.count });
     });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={`${!isDashboard ? "mt-[50px]" : "mt-[50px] dark:bg-[#111C43] shadow-sm pb-5 rounded-sm"}`}>
          <div className={`${isDashboard ? "ml-8 mb-5" : ""}`}>
            <h1 className={`${styles.title} ${isDashboard && '!text-[20px]'} px-5 !text-start`}>
              Users Analytics
            </h1>
            {
              isDashboard && (
                <p className={`${styles.label} px-5`}>
                  Last 12 months analytics data
                </p>
              )
            }
          </div>
          <div className={`w-full ${isDashboard ? 'h-[40vh]' : 'h-[70vh]'} flex items-center justify-center`}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={analyticsData}
                margin={{ top: 20, right: 30, left: 40, bottom: 65 }}
              >
                <XAxis dataKey="name" tick={<CustomTick />} />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#ffcc00"
                  fill="#ffff7a"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default UserAnalytics;
