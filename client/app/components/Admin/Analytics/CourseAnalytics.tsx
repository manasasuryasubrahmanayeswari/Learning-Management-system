import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  LabelList,
  Tooltip,
  Label,
} from "recharts";
import Loader from "../../Loader/Loader";
import { useGetCoursesAnalyticsQuery } from "@/redux/analytics/analyticsApi";

type Props = {};

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

const CourseAnalytics = (props: Props) => {
  const { data, isLoading } = useGetCoursesAnalyticsQuery({});
  {/*const analyticsData = [
    { name: "June 2023", uv: 2 },
    { name: "July 2023", uv: 3 },
    { name: "August 2023", uv: 3 },
    { name: "September 2023", uv: 8 },
    { name: "October 2023", uv: 1 },
    { name: "November 2023", uv: 6 },
    { name: "December 2023", uv: 4 },
];*/}

  const analyticsData: any[] = [];
  data &&
    data.courses.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.month, uv: item.count });
    });

  const minValue = 0;
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-screen">
          <div className="mt-[50px]">
            <h1 className="text-2xl font-bold px-5 text-start">
              Courses Analytics
            </h1>
            <p className="text-lg px-5">Last 12 months analytics data</p>
          </div>
          <div className="w-full h-[80%] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                <XAxis dataKey="name" tick={<CustomTick />}>
                  <Label offset={0} position="insideBottom" />
                </XAxis>
                <YAxis domain={[minValue, "auto"]} />
                <Tooltip />
                <Bar dataKey="uv" fill="#3faf82">
                  <LabelList dataKey="uv" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseAnalytics;
