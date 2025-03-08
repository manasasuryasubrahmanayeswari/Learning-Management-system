"use client";
import React, { FC, useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Modal, Box, Button } from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import { FiEdit2 } from "react-icons/fi";
import Loader from "../Loader/Loader";
import { format } from "timeago.js";
import {
  useDeleteUserMutation,
  useGetAllUserQuery,
  useUpdateUserRoleMutation,
} from "@/redux/features/user/userApi";
import { styles } from "@/app/styles/style";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  isTeam: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme } = useTheme();
  const { isLoading, data, error, refetch } = useGetAllUserQuery({});
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [updateUserRole, { error: updateError, isSuccess }] =
    useUpdateUserRoleMutation();
  const [role, setRole] = useState("admin");
  const [userId, setUserId] = useState("");
  const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteUserMutation();

  useEffect(() => {
    if (isSuccess) {
      setActive(false);
      setEmail("");
      setRole("admin");
      refetch(); // Refetch user data after successful role update
      toast.success("User role updated successfully!");
    }

    if (deleteSuccess) {
      setOpen(false);
      refetch(); // Refetch user data after successful deletion
      toast.success("User deleted successfully!");
    }

    if (updateError) {
      if ("data" in updateError) {
        const errorMsg = (updateError as any).data.message || "Failed to update user role";
        toast.error(errorMsg);
      }
    }

    if (deleteError) {
      if ("data" in deleteError) {
        const errorMsg = (deleteError as any).data.message || "Failed to delete user";
        toast.error(errorMsg);
      }
    }
  }, [isSuccess, updateError, deleteSuccess, deleteError, refetch]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.5 },
    { field: "courses", headerName: "Purchased Courses", flex: 0.5 },
    { field: "created_at", headerName: "Joined At", flex: 0.5 },
    {
      field: "",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <Button
            onClick={() => {
              setOpen(!open);
              setUserId(params.row.id);
            }}
          >
            <AiOutlineDelete className="dark:text-white text-black" size={20} />
          </Button>
        );
      },
    },
    {
      field: " ",
      headerName: "Email",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <a href={`mailto:${params.row.email}`}>
            <AiOutlineMail className="dark:text-white text-black" size={20} />
          </a>
        );
      },
    },
  ];

  const rows: any = [];
  if (isTeam) {
    const newData =
      data && data.users.filter((item: any) => item.role === "admin");
    newData &&
      newData.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
  } else {
    data &&
      data.users.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
  }

  const handleSubmit = async () => {
    await updateUserRole({ email, role });
  };

  const handleDelete = async () => {
    const id = userId;
    await deleteUser(id);
  };

  return (
    <div className="mt-[120px]">
      <ToastContainer />
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          {isTeam && (
            <div className="w-full flex justify-end">
              <div
                className={`${styles.button} !w-[250px] items-center text-center cursor-pointer`}
                onClick={() => setActive(!active)}
              >
                Add New Member
              </div>
            </div>
          )}
          <Box
            m="40px 0 0 0"
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30!important"
                    : "1px solid #ccc!important",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                color: theme === "dark" ? "#fff" : "#000",
                borderTop: "none",
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark" ? `#b7ebde !important` : `#000 !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `#fff !important`,
              },
            }}
          >
            <DataGrid checkboxSelection rows={rows} columns={columns} />
          </Box>
          {active && (
            <Modal
              open={active}
              onClose={() => setActive(!active)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                <h1 className={`${styles.title}`}>Add New Member</h1>
                <div className="mt-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className={`${styles.input}`}
                  />
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className={`${styles.input} !mt-8`}
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                  <br />
                  <br />
                  <div
                    className={`${styles.button} my-6 h-[45px] items-center text-center cursor-pointer`}
                    onClick={handleSubmit}
                  >
                    Submit
                  </div>
                </div>
              </Box>
            </Modal>
          )}
          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(!open)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                <h1 className={`${styles.title}`}>
                  Are you sure you want to delete this user?
                </h1>
                <div className="flex w-full item-center justify-between mb-6 mt-4">
                  <div
                    className={`${styles.button} !w-[120px] h-[45px] bg-[#57c7a3]`}
                    onClick={() => setOpen(!open)}
                  >
                    Cancel
                  </div>
                  <div
                    className={`${styles.button} !w-[120px] h-[45px] bg-[#d63f3f]`}
                    onClick={handleDelete}
                  >
                    Delete
                  </div>
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};

export default AllUsers;
   