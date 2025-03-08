'use client'
import React, { FC, useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useTheme } from "next-themes";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetAllOrdersQuery } from "../../../../redux/orders/ordersApi";
import { useGetAllUserQuery } from "@/redux/features/user/userApi";
import { AiOutlineMail } from "react-icons/ai";
import { format } from "timeago.js";
import Loader from "../../Loader/Loader"; // Assuming Loader is correctly imported

type Props = {
  isDashboard?: boolean;
};

const AllInvoices: FC<Props> = ({ isDashboard = false }) => {
  const { theme } = useTheme();
  const { isLoading, data } = useGetAllOrdersQuery({});
  const { data: usersData } = useGetAllUserQuery({});
  const { data: coursesData } = useGetAllCoursesQuery(1);
  const [orderData, setOrderData] = useState<any>([]);

  useEffect(() => {
    if (data) {
      const temp = data.orders.map((item: any) => {
        const user = usersData?.users.find(
          (user: any) => user._id === item.userId
        );
        const course = coursesData?.courses.find(
          (course: any) => course._id === item.courseId
        );
        return {
          ...item,
          userName: user?.name,
          userEmail: user?.email,
          title: course?.name,
          price: "$" + course?.price,
        };
      });
      setOrderData(temp);
    }
  }, [data, usersData, coursesData]);

  const columns: any = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "userName", headerName: "Name", flex: isDashboard ? 0.6 : 0.5 },
    ...(isDashboard
      ? []
      : [
          { field: "userEmail", headerName: "Email", flex: 1 },
          { field: "title", headerName: "Course Title", flex: 1 },
        ]),
    { field: "price", headerName: "Price", flex: 0.5 },
    ...(isDashboard
      ? [
          {
            field: "created_at",
            headerName: "Created At",
            flex: 0.5,
          },
        ]
      : [
          {
            field: "",
            headerName: "Email",
            flex: 0.2,
            renderCell: (params: any) => {
              return (
                <a href={`mailto:${params.row.userEmail}`}>
                  <AiOutlineMail
                    className={`dark:text-white text-black`}
                    size={20}
                  />
                </a>
              );
            },
          },
        ]),
  ];

  const rows: any[] = [
    /* mock data for testing
    {
      id: "66548bf2b38665b46cf737e4",
      userName: "Hanish",
      userEmail: "hanish@gmail.com",
      title: "React JS",
      price: "$500",
      created_at: "2 weeks ago",
    },
    {
        id: "66548bf2b38665b46cf737e4",
        userName: "Hanish",
        userEmail: "hanish@gmail.com",
        title: "React JS",
        price: "$500",
        created_at: "2 weeks ago",
      },
      {
        id: "66548bf2b38665b46cf737e4",
        userName: "Hanish",
        userEmail: "hanish@gmail.com",
        title: "React JS",
        price: "$500",
        created_at: "2 weeks ago",
      },
      {
        id: "66548bf2b38665b46cf737e4",
        userName: "Hanish",
        userEmail: "hanish@gmail.com",
        title: "React JS",
        price: "$500",
        created_at: "2 weeks ago",
      },
      {
        id: "66548bf2b38665b46cf737e4",
        userName: "Hanish",
        userEmail: "hanish@gmail.com",
        title: "React JS",
        price: "$500",
        created_at: "2 weeks ago",
      },
      {
        id: "66548bf2b38665b46cf737e4",
        userName: "Hanish",
        userEmail: "hanish@gmail.com",
        title: "React JS",
        price: "$500",
        created_at: "2 weeks ago",
      },*/
  ];

  orderData &&
    orderData.forEach((item: any) => {
      rows.push({
        id: item._id,
        userName: item.userName,
        userEmail: item.userEmail,
        title: item.title,
        price: item.price,
        created_at: format(item.createdAt),
      });
    });

  return (
    <div className={!isDashboard ? "mt-24" : "mt-0"}>
      {isLoading ? (
        <Loader />
      ) : (
        <Box
          m={!isDashboard ? "40px 0 0 0" : "0"}
          height={!isDashboard ? "90vh" : "35vh"}
          overflow="hidden"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              outline: "none",
            },
            "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon":{
                color: theme === "dark" ? "#fff" : "#000",
            },
            "& .MuiDataGrid-sortIcon": {
              color: theme === "dark" ? "#fff" : "#000",
            },
            "& .MuiDataGrid-row": {
              color: theme === "dark" ? "#fff" : "#000",
              borderBottom:
                theme === "dark"
                  ? "1px solid #ffffff30 !important"
                  : "1px solid #ccc !important",
            },
            "& .MuiTablePagination-root": {
              color: theme === "dark" ? "#fff" : "#000",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none !important",
            },
            "& .name-column--cell": {
              color: theme === "dark" ? "#fff" : "#000",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
              borderBottom: "none",
              color: theme === "dark" ? "#fff" : "#000",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
            },
            "& .MuiDataGrid-footerContainer": {
              color: theme === "dark" ? "#fff" : "#000",
              borderTop: "none",
              backgroundColor: theme === "dark" ? "#34396" : "#A4A9FC",
            },
            "& .MuiCheckbox-root": {
              color:
                theme === "dark" ? "#bebde !important" : "#000 !important",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: theme === "dark" ? "#fff !important" : "#000 !important",
            },
          }}
        >
          <DataGrid
            checkboxSelection={!isDashboard}
            rows={rows}
            columns={columns}            
          />
        </Box>
      )}
    </div>
  );
};

export default AllInvoices;
